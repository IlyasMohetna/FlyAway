<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PackagePackageTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('package__package_type')->delete();
        
        \DB::table('package__package_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Culturel',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Nature & Aventure',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Marin',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Indépendant',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Activités',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Festival & Événements',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Intérêt spécial',
                'created_at' => '2024-11-18 08:31:36',
                'updated_at' => '2024-11-18 08:31:36',
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}