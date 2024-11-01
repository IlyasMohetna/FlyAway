<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
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
            'firstname' => ['required', 'string', 'min:1', 'max:50'],
            'lastname' => ['required', 'string', 'min:1', 'max:50'],
            'email' => ['required', 'string', 'min:1', 'max:255'],
            'email_verified_at' => ['nullable', 'date', 'after_or_equal:1970-01-01 00:00:01', 'before_or_equal:2038-01-19 03:14:07'],
            'password' => ['required', 'string', 'min:1', 'max:255'],
            'remember_token' => ['nullable', 'string', 'min:1', 'max:100']
        ];
    }
}
