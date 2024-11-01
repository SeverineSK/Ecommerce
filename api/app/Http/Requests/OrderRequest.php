<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;

class OrderRequest extends FormRequest
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
        // what i need to send to easypost API :
        // "address": {
        //     "name": "George Costanza",
        //     "company": "Vandelay Industries",
        //     "street1": "1 E 161st St.",
        //     "city": "Bronx",
        //     "state": "NY",
        //     "zip": "10451"
        //   }

        return [
            "address" => "required|array",

            "address.street1" => "required|string",
            "address.street2" => "nullable|string",
            "address.city" => "required|string",
            "address.state" => "required|string",
            "address.zip" => "required|string",
            "address.country" => "required|string",
            "address.company" => "nullable|string",
            "address.phone" => "nullable|string",
            "address.email" => "nullable|string",
            "cart" => "required|array",

            // "remember_me" => "nullable|boolean",

        ];
    }

    public function failedValidation(Validator $validator): JsonResponse
    {
        throw new HttpResponseException(response()->json([
            'errors' => $validator->errors()
        ], 422));
    }
}
