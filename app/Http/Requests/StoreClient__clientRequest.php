<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClient__clientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => ['required', 'exists:users,id'],
            'phone' => ['required', 'string', 'min:1', 'max:15'],
            'address_1' => ['required', 'string', 'min:1', 'max:255'],
            'address_2' => ['required', 'string', 'min:1', 'max:255'],
            'city_id' => ['required', 'exists:config__city,id']
        ];
    }
}
