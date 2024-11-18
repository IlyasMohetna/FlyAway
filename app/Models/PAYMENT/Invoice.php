<?php
namespace App\Models\PAYMENT;

use Illuminate\Database\Eloquent\Model;
class Invoice extends Model
{
	protected $table = 'payment__invoice';
	protected $guarded = [];
}
