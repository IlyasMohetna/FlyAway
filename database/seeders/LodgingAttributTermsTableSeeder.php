<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class LodgingAttributTermsTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('lodging__attribut_terms')->delete();
        
        \DB::table('lodging__attribut_terms')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Service de réveil',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:31:50',
                'updated_at' => '2024-11-18 12:31:50',
                'deleted_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Location de voiture',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:31:58',
                'updated_at' => '2024-11-18 12:31:58',
                'deleted_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Location de vélos',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:32:06',
                'updated_at' => '2024-11-18 12:32:06',
                'deleted_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Télévision à écran plat',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:32:14',
                'updated_at' => '2024-11-18 12:32:14',
                'deleted_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Blanchisserie et nettoyage à sec',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:32:21',
                'updated_at' => '2024-11-18 12:32:21',
                'deleted_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Internet',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:32:30',
                'updated_at' => '2024-11-18 12:32:30',
                'deleted_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Café et thé',
                'attribut_categorie_id' => 1,
                'created_at' => '2024-11-18 12:32:36',
                'updated_at' => '2024-11-18 12:32:36',
                'deleted_at' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'Bar du hall de l\'hôtel Havana',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:33:28',
                'updated_at' => '2024-11-18 12:33:28',
                'deleted_at' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'Restaurant Fiesta',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:33:41',
                'updated_at' => '2024-11-18 12:33:41',
                'deleted_at' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'Services de transport de l\'hôtel',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:33:51',
                'updated_at' => '2024-11-18 12:33:51',
                'deleted_at' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'Consigne à bagages gratuite',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:34:00',
                'updated_at' => '2024-11-18 12:34:00',
                'deleted_at' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'Services de blanchisserie',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:34:06',
                'updated_at' => '2024-11-18 12:34:06',
                'deleted_at' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'Animaux acceptés',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:34:18',
                'updated_at' => '2024-11-18 12:34:18',
                'deleted_at' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'Billets',
                'attribut_categorie_id' => 2,
                'created_at' => '2024-11-18 12:34:45',
                'updated_at' => '2024-11-18 12:34:45',
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}