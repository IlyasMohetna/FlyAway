<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CONFIG\City;
use App\Models\Client\Client;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class ClientSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        User::factory(1000)->create()->each(function ($user) {
            Client::factory()->create([
                'user_id' => $user->id,
                'city_id' => City::inRandomOrder()->first()->id,
            ]);
        });
    }
}
