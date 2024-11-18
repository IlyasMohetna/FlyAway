<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'firstname' => $this->firstname,
            'lastname' => $this->lastname,
            'email' => $this->email,
            'phone' => $this->client->phone,
            'address_1' => $this->client->address_1,
            'address_2' => $this->client->address_2,
            'city' => $this->client->city->name,
            'postal_code' => $this->client->city->postal_code,
            'region' => $this->client->city->region->name,
            'country' => $this->client->city->region->country->name
        ];
    }
}
