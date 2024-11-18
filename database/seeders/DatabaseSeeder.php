<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call(ConfigCountryTableSeeder::class);
        $this->call(ConfigRegionTableSeeder::class);
        $this->call(ConfigCityTableSeeder::class);
        //----------------------------------------------
        $this->call(EmployePostTableSeeder::class);
        $this->call(AdminTableSeeder::class);

        //----------------------------------------------
        $this->call(ClientSeeder::class);

        $this->call(LodgingRoomStatusTableSeeder::class);
        $this->call(LodgingTypeTableSeeder::class);
        $this->call(PackagePackageTypeTableSeeder::class);
        $this->call(PackageTransportationModesTableSeeder::class);
        $this->call(PaymentPaymentStatusTableSeeder::class);
        $this->call(ClientFidelityTransactionTypeTableSeeder::class);
        $this->call(LodgingAttributCategoriesTableSeeder::class);
        $this->call(LodgingAttributTermsTableSeeder::class);
    }
}
