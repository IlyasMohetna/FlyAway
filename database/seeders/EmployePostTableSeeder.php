<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class EmployePostTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('employe__post')->delete();
        
        \DB::table('employe__post')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Consultant en voyages',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            1 => 
            array (
                'id' => 2,
                'name' => 'Responsable de circuit',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            2 => 
            array (
                'id' => 3,
                'name' => 'Agent de réservation',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            3 => 
            array (
                'id' => 4,
                'name' => 'Agent de billetterie',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            4 => 
            array (
                'id' => 5,
                'name' => 'Responsable marketing',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            5 => 
            array (
                'id' => 6,
                'name' => 'Responsable des ventes',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            6 => 
            array (
                'id' => 7,
                'name' => 'Représentant du service client',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            7 => 
            array (
                'id' => 8,
                'name' => 'Responsable financier',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            8 => 
            array (
                'id' => 9,
                'name' => 'Coordinateur des opérations',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            9 => 
            array (
                'id' => 10,
                'name' => 'Conseiller en voyages',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            10 => 
            array (
                'id' => 11,
                'name' => 'Spécialiste support informatique',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            11 => 
            array (
                'id' => 12,
                'name' => 'Responsable d\'agence',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            12 => 
            array (
                'id' => 13,
                'name' => 'Consultant en visas',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            13 => 
            array (
                'id' => 14,
                'name' => 'Coordinateur d\'hôtel',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            14 => 
            array (
                'id' => 15,
                'name' => 'Responsable des voyages d\'entreprise',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            15 => 
            array (
                'id' => 16,
                'name' => 'Chargé de développement commercial',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            16 => 
            array (
                'id' => 17,
                'name' => 'Responsable RH',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            17 => 
            array (
                'id' => 18,
                'name' => 'Créateur de contenu',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            18 => 
            array (
                'id' => 19,
                'name' => 'Spécialiste des réseaux sociaux',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
            19 => 
            array (
                'id' => 20,
                'name' => 'Coordinateur logistique',
                'created_at' => '2024-11-18 08:24:09',
                'updated_at' => '2024-11-18 08:24:09',
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}