<?php

namespace App\Models\PAYMENT;

use Illuminate\Database\Eloquent\Model;
class BankAccount extends Model
{
	protected $table = 'payment__bank_account';
	protected $guarded = [];

    protected $casts = [
        'bic' => 'encrypted',
        'iban' => 'encrypted'
    ];
}
