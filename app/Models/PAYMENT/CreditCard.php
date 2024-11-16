<?php
namespace App\Models\PAYMENT;

use Illuminate\Database\Eloquent\Model;
class CreditCard extends Model
{
	protected $table = 'payment__credit_card';
	protected $guarded = [];

    protected $casts = [
        'card_number' => 'encrypted',
        'cardholder_name' => 'encrypted',
        'expiration_month' => 'encrypted',
        'expiration_year' => 'encrypted',
        'cvv' => 'encrypted',
    ];
}
