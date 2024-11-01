<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SubcategoryRequest;
use App\Models\Subcategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $subcategory = Subcategory::all();

        if ($subcategory->isEmpty()) {
            return response()->json([
                "message" => "No subcategories found"
            ], 404);
        }

        return response()->json([
            "subcategories" => $subcategory
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubcategoryRequest $request)
    {
        $subcategory = new Subcategory();
        $subcategory->fill($request->validated());
        $subcategory->save();

        return response()->json([
            "message" => "Subcategory created successfully",
            "subcategory" => $subcategory
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($identifier)
    {
        if (is_numeric($identifier)) {
            $subcategory = Subcategory::findOrFail($identifier);
        } else {
            $subcategory = Subcategory::where('slug', $identifier)->firstOrFail();
        }

        $subcategory->load("category", "articles");

        return response()->json([
            "subcategory" => $subcategory
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Subcategory $subcategory)
    {
        //Update a subcategory

        $request->validate([
            'name' => 'required|unique:subcategories',
            'category_id' => 'required'
        ]);

        $subcategory->update([
            'name' => $request->name,
            'category_id' => $request->category_id
        ]);

        return response()->json([
            "message" => "Subcategory updated",
            "subcategory" => $subcategory
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subcategory $subcategory)
    {
        //delete a subcategory
        $subcategory->delete();

        return response()->json([
            "message" => "Subcategory deleted"
        ], 200);
    }
}
