<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class AdminTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('users')->delete();
        \DB::table('employe__employe')->delete();
        
        \DB::table('users')->insert(array (
            0 => 
            array (
                'id' => 1,
                'firstname' => 'Bryan',
                'lastname' => 'CHATILLON',
                'email' => 'admin@test.com',
                'email_verified_at' => NULL,
                'password' => '$2y$12$h9dSyvYSWarC2Y.yiUkjsOdrJqGRbhQiKzoXxtQ/fE3irPc5wN5hK',
                'remember_token' => NULL,
                'active' => 1,
                'created_at' => NULL,
                'updated_at' => '2024-11-18 07:19:31',
                'deleted_at' => NULL,
            ),
        ));

        \DB::table('employe__employe')->insert(array (
            0 => 
            array (
                'user_id' => 1,
                'post_id' => 1
            ),
        ));
        
        
    }
}