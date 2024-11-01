<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class ArticleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'picture' => 'nullable|image|max:2048',
            'description' => 'required|string|min:1',
            'price' => 'required|numeric|min:0|max:999999.99',
            'name' => 'required|string|min:1|max:60',
            'width' => 'required|numeric|min:0|max:999.99',
            'height' => 'required|numeric|min:0|max:999.99',
            'length' => 'required|numeric|min:0|max:999.99',
            'weight' => 'required|numeric|min:0|max:999.99',
            'discount' => 'required|integer|min:0|max:100',
            'recommended' => 'required|boolean',
            'stock_state' => 'required|string|in:In Stock,Out of Stock,Pre-Order',
            'subcategory_id' => 'required|exists:subcategories,id',
        ];
    }

    public function failedValidation(Validator $validator): JsonResponse
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }

    public function messages(): array
    {
        return [
            'stock_state.in' => 'Stock state must be In Stock, Out of Stock or Pre-Order',
        ];
    }

}
