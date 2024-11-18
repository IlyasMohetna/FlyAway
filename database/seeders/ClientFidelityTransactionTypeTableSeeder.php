<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ClientFidelityTransactionTypeTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('client__fidelity_transaction_type')->delete();
        
        \DB::table('client__fidelity_transaction_type')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Gain',
                'created_at' => NULL,
                'updated_at' => NULL,
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}