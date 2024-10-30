<?php

namespace App\Models\CLIENT;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Fidelity extends Model
{
    protected $table = 'client__fidelity';

    public function client(): HasOne
    {
        return $this->hasOne(Client::class, 'client_id');
    }

    public function transactionType(): HasOne
    {
        return $this->hasOne(FidelityTransactionType::class, 'transaction_type_id');
    }
}
