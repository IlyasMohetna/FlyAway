<?php

namespace Database\Factories\Client;

use App\Models\User;
use App\Models\CONFIG\City;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Client>
 */
class ClientFactory extends Factory
{
    public function definition()
    {
        return [
            'user_id' => User::factory(), // Create a related user
            'phone' => $this->faker->phoneNumber,
            'address_1' => $this->faker->streetAddress,
            'address_2' => $this->faker->optional()->secondaryAddress,
            'city_id' => City::inRandomOrder()->first()->id, // Use existing or create a new city
            'created_at' => now(),
            'updated_at' => now(),
        ];
    }
}
