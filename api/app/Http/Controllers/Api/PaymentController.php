<?php

namespace App\Http\Controllers\Api;

use Stripe\Stripe;
use Illuminate\Http\Request;
use Stripe\Checkout\Session;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;

class PaymentController extends Controller
{
    public function createPaymentSession(Request $request): JsonResponse
    {

        Stripe::setApiKey('sk_test_51NicpYBuRvBMmCutrrYFVXh7pW04RyxVVJkkGxvw90vLo8weTKIFqDUFNU25chb5BYHzaw1Pcc1XpPfpYxRyOWBN00WZTFURmO');



        $featuresprice = 0;
        $lineItems = array_map(function ($product) {
            return [
                'quantity' => $product["quantity"],
                'price_data' => [
                    'currency' => 'USD',
                    'product_data' => [
                        'name' => $product["article"]["name"],
                    ],
                    'unit_amount' => $product["article"]["price"] * 100 ,
                ],
            ];
            // }, []);
        }, (array) $request->input('cart'));


        Log::info($lineItems);

        $session = Session::create([
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => 'http://localhost:5173/success',
            'cancel_url' => 'http://localhost:5173/cart',
            'shipping_address_collection' => [
                'allowed_countries' => ['FR'],
            ],
            'metadata' => [
                'cart_id' => $request->cart_id,
            ],
            'billing_address_collection' => 'required',
            // Request billing address info
            'customer_email' => 'user@example.com',
        ]);

        return response()->json($session);

    }
}


// dd($request);
// ?id=10
// $cart = $request->cart;
// $cart = $request->query;
// return response()->json($request->id);

// dd($cart->get('id'));

// dd($cart);
