<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\Rule;

class CartRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'cart' => 'required|array',
            'cart.*.article.id' => [
                'required',
                'exists:articles,id',
            ],
            'cart.*.quantity' => [
                'required',
                'integer',
                'min:1',
                'max:999',
            ],
            'cart.*.features' => 'required|array',
            'cart.*.features.*.variantId' => [
                'required',
                'integer',
                'exists:variants,id',
            ],
        ];
    }

    public function response(array $errors)
    {
        return new JsonResponse(['errors' => $errors], 422);
    }
}
