<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use App\Models\Subcategory;
use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use App\Http\Requests\ArticleRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Str;

class ArticleController extends Controller
{

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $search = $request->query('search');

        $category = $request->query('category');
        $subcategory = $request->query('subcategory');

        $paginate = $request->query('paginate');

        $query = Article::orderBy('recommended', 'desc')->orderBy('counter_visits', 'desc')->orderBy('id', 'asc');

        if ($search) {
            $query->where('name', 'like', '%' . $search . '%');
        }

        if ($category) {
            $query->whereHas('subcategory.category', function ($subQuery) use ($category) {
                $subQuery->where('slug', 'like', '%' . $category . '%');
            });
        }

        if ($subcategory) {
            $query->whereHas('subcategory', function ($subQuery) use ($subcategory) {
                $subQuery->where('slug', 'like', '%' . $subcategory . '%');
            });
        }

        if ($paginate) {
            $articles = $query->with('subcategory.category')->paginate($paginate, ['*'], 'page', $request->input('page', 1));
            $articles->load('features.variants');

            $articles->each(function ($article) {
                $total_stock = $article->features->sum(function ($feature) {
                    return $feature->variants->sum('stock');
                });
                $article->total_stock = $total_stock;
            });

        }
        else {
            $query->with(['subcategory' => function ($q) {
                $q->select(['id', 'slug', 'category_id'])
                    ->with(['category' => function ($q) {
                        $q->select(['id', 'slug']);
                    }]);
            }])
                ->select(['id', 'picture', 'name', 'slug', 'price', 'subcategory_id']);

            $articles = $query->get();
        }

        return response()->json([
            "articles" => $articles
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show($identifier): JsonResponse
    {
        if (is_numeric($identifier)) {
            $article = Article::findOrFail($identifier);
        } else {
            $article = Article::findBySlugOrFail($identifier);
        }

        $article->load('subcategory.category');
        $article->load('features.variants');
        $article->load(['comments' => function ($query) {
            $query->orderBy('created_at', 'desc');
        }, 'comments.user']);



        $article->features->each(function ($feature) use ($article) {
            $feature->variants->each(function ($variant) use ($article) {
                $variant->total_price = $variant->price + $article->price;
            });
        });

        $total_stock = $article->features->sum(function ($feature) {
            return $feature->variants->sum('stock');
        });

        $article->total_stock = $total_stock;

        $this->counterVisits($article);

        return response()->json([
            "article" => $article,

        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ArticleRequest $request): JsonResponse
    {
        $article = new Article();

        if ($request->picture) {
            $imageName = time() . '.' . $request->picture->extension();
            Storage::disk('public')->putFileAs('images', $request->file('picture'), $imageName);
            $article->fill($request->validated());
            $article->picture = asset('storage/images/' . $imageName);
        } else {
            $article->picture = asset('storage/images/default.png');
            $article->fill($request->validated());
        }

        $article->subcategory()->associate(intval($request->subcategory_id));
        $article->save();

        return response()->json([
            "message" => "Article created successfully",
            "article" => $article
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ArticleRequest $request, $id): JsonResponse
    {
        $article = Article::findOrFail($id);

        if ($request->picture) {
            $file = basename($article->picture);
            if (Storage::disk('public')->exists('images/' . $file) && $file !== basename('default.png')) {
                Storage::disk('public')->delete('images/' . $file);
            }
            $imageName = time() . '.' . $request->file('picture')->extension();
            Storage::disk('public')->putFileAs('images', $request->file('picture'), $imageName);
            $article->fill($request->validated());
            $article->picture = asset('storage/images/' . $imageName);
        } else {
            $url = $article->picture;
            $article->fill($request->validated());
            $article->picture = $url;
        }
        $article->subcategory()->associate(intval($request->subcategory_id));
        $article->save();

        return response()->json([
            "message" => "Article updated successfully",
            "article" => $article
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id): JsonResponse
    {
        $article = Article::findOrFail($id);
        $file = basename($article->picture);
        if (Storage::disk('public')->exists('images/' . $file) && $file !== basename('default.png')) {
            Storage::disk('public')->delete('images/' . $file);
        }

        $article->delete();

        return response()->json([
            "message" => "Article deleted successfully"
        ], 200);
    }

    public function counterVisits($article)
    {
        $article->increment('counter_visits');
    }
}
