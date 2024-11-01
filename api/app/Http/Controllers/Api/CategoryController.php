<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $categories = Category::with("subcategories")->orderBy("created_at", 'asc')->get();

        if ($categories->isEmpty()) {
            return response()->json([
                "message" => "No categories found"
            ], 404);
        }
        return response()->json([
            "categories" => $categories
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $category = new Category();
        $category->fill($request->validated());
        $category->save();

        return response()->json([
            "message" => "Category created successfully",
            "category" => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($identifier)
    {
        if (is_numeric($identifier)) {
            $category = Category::findOrFail($identifier);
        } else {
            $category = Category::where('slug', $identifier)->firstOrFail();
        }

        $category->load("subcategories");

        return response()->json([
            "category" => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Category $category)
    {
        //update a category
        $request->validate([
            'name' => 'required|unique:categories'
        ]);

        $category->update([
            'name' => $request->name
        ]);

        return response()->json([
            "message" => "Category updated",
            "category" => $category
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Category $category)
    {
        //
        $category->delete();

        return response()->json([
            "message" => "Category deleted"
        ], 200);
    }
}
