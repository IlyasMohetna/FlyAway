<?php

namespace App\Models\CONFIG;

use App\Models\CONFIG\Region;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class City extends Model
{
    protected $table = 'config__city';

    public function region(): HasOne
    {
        return $this->hasOne(Region::class, 'region_id');   
    }
}