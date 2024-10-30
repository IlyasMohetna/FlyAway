<?php

namespace App\Models\CONFIG;

use App\Models\CONFIG\Country;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Region extends Model
{
    protected $table = 'config__region';

    public function country(): HasOne
    {
        return $this->hasOne(Country::class, 'country_id');   
    }
}