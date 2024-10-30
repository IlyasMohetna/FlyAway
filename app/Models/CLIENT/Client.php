<?php

namespace App\Models\CLIENT;

use App\Models\CONFIG\City;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Client extends Model
{
    protected $table = 'client__client';

    public function city(): HasOne
    {
        return $this->hasOne(City::class, 'city_id');
    }
}
