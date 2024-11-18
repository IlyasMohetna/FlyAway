<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class PaymentPaymentStatusTableSeeder extends Seeder
{

    /**
     * Auto generated seed file
     *
     * @return void
     */
    public function run()
    {
        

        \DB::table('payment__payment_status')->delete();
        
        \DB::table('payment__payment_status')->insert(array (
            0 => 
            array (
                'id' => 1,
                'name' => 'Payé',
                'created_at' => NULL,
                'updated_at' => NULL,
                'deleted_at' => NULL,
            ),
        ));
        
        
    }
}