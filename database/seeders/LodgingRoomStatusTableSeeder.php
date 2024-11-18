<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LodgingRoomStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('lodging__room_status')->delete();
        
        \DB::table('lodging__room_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Disponible',
                'created_at' => NULL,
                'updated_at' => NULL,
                'deleted_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Maintenance',
                'created_at' => NULL,
                'updated_at' => NULL,
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}