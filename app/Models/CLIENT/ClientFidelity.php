<?php
namespace App\Models\Client;

use Illuminate\Database\Eloquent\Model;

class ClientFidelity extends Model
{
	protected $table = 'client__fidelity';
	protected $guarded = [];

    public function type()
    {
        return $this->hasOne(FidelityTransactionType::class,'id','transaction_type_id');
    }
}
