<?php

namespace App\Http\Controllers\Api;

use App\Models\Cart;
use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\CartRequest;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class CartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): JsonResponse
    {
        $userId = $request->user()->id;

        $cart = Cart::with('items.article', 'items.variants')->where('user_id', $userId)->first();

        $cartData = [
        ];

        if ($cart) {
            foreach ($cart->items as $item) {
                $itemData = [
                    'article' => [
                        'id' => $item->article->id,
                        'picture' => $item->article->picture,
                        'name' => $item->article->name,
                        'slug' => $item->article->slug,
                        "description" => $item->article->description,
                        "discount" => $item->article->discount,
                        "price" => $item->article->price,
                        "features" => [
                        ],
                        "subcategory" => [
                            "id" => $item->article->subcategory->id,
                            "name" => $item->article->subcategory->name,
                            "slug" => $item->article->subcategory->slug,
                            "category_id" => $item->article->subcategory->category_id,
                            "category" => [
                                "id" => $item->article->subcategory->category->id,
                                "name" => $item->article->subcategory->category->name,
                                "slug" => $item->article->subcategory->category->slug,
                            ],
                        ],
                    ],

                    'quantity' => $item->quantity,
                    'price' => $item->article->price,
                    'features' => [],
                ];

                foreach ($item->article->features as $feature) {
                    $featureData = [
                        'id' => $feature->id,
                        'name' => $feature->name,
                        "article_id" => $feature->article_id,
                        "variants" => [],
                    ];

                    foreach ($feature->variants as $variant) {
                        $variantData = [
                            'id' => $variant->id,
                            'name' => $variant->name,
                            'feature_id' => $variant->feature_id,
                        ];

                        $featureData['variants'][] = $variantData;
                    }

                    $itemData['article']['features'][] = $featureData;
                }

                foreach ($item->variants as $variant) {
                    $featureData = [
                        'name' => $variant->feature->name,
                        'id' => $variant->feature->id,
                        'variantId' => $variant->id,
                        'variantName' => $variant->name,
                        'variantPrice' => $variant->price,

                    ];

                    $itemData['features'][] = $featureData;
                }

                $cartData[] = $itemData;
            }
        }

        return response()->json([
            "cart" =>
            $cartData
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(CartRequest $request)
    {

        //store the full cart in the database
        $userId = $request->user()->id;

        $cartRecord = Cart::where('user_id', $userId)->first();

        if ($cartRecord) {
            $cartRecord->delete();
        }

        $cartRecord = new Cart();
        $cartRecord->user_id = $userId;
        $cartRecord->save();
        $items = $request->cart;
        foreach ($items as $item) {
            $cartRecord->items()->create([
                'article_id' => $item['article']['id'],
                'quantity' => $item['quantity'],
            ]);
            $variantIds = collect($item['features'])->pluck('variantId')->toArray();

            // Get the item instance and then associate variants
            // Retrieve the item from the database
            $itemFromDatabase = Item::where('article_id', $item['article']['id'])->first();
            Log::info($itemFromDatabase);
            Log::info($item);
            // Associate variants with the retrieved item
            $itemFromDatabase->variants()->attach($variantIds);

        }



        return response()->json([
            "message" => "Cart Record created",
            "cart_record" => $cartRecord
        ], 201);


    }


    /**
     * Update the specified resource in storage.
     */
    public function update(CartRequest $request, Cart $cart)
    {
        $cart->update($request->validated());

        return response()->json([
            "message" => "Cart Record updated",
            "cart_record" => $cart
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Cart $cart)
    {
        $cart->delete();

        return response()->json([
            "message" => "Cart Record deleted"
        ], 200);
    }
}