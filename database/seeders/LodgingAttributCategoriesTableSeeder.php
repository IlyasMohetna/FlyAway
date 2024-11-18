<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LodgingAttributCategoriesTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('lodging__attribut_categories')->delete();
        
        \DB::table('lodging__attribut_categories')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Installations',
                'created_at' => '2024-11-18 12:31:11',
                'updated_at' => '2024-11-18 12:31:11',
                'deleted_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Service hôtelier',
                'created_at' => '2024-11-18 12:31:25',
                'updated_at' => '2024-11-18 12:31:25',
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}