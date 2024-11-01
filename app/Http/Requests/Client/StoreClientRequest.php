<?php

namespace App\Http\Requests\Client;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'firstname' => ['required', 'string', 'min:1', 'max:50'],
            'lastname' => ['required', 'string', 'min:1', 'max:50'],
            'email' => ['required', 'string', 'min:1', 'max:255'],
            'password' => ['required', 'string', 'min:1', 'max:255'],
            'confirm_password' => ['required', 'string', 'min:1', 'max:255'],
            'address_1' => ['required', 'string', 'min:1', 'max:255'],
            'address_2' => ['nullable', 'string', 'min:1', 'max:255'],
            'city_id' => ['required', 'exists:config__city,id'],
            'phone' => ['required', 'string', 'min:1', 'max:20']
        ];
    }
}
