<?php

namespace App\Models\LODGING;

use Illuminate\Database\Eloquent\Model;
use App\Models\CONFIG\City;
class Lodging extends Model
{
	protected $table = 'lodging__lodging';
	protected $guarded = [];

    public function type()
    {
        return $this->belongsTo(LodgingType::class, 'lodging_type_id');
    }

    public function city()
    {
        return $this->belongsTo(City::class,'real_city_id');
    }

    public function rooms()
    {
        return $this->hasMany(LodgingRoom::class,'lodging_id', 'id');
    }
}
