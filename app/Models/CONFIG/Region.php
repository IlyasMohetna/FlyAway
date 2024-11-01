<?php

namespace App\Models\CONFIG;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Region extends Model
{
	protected $table = 'config__region';
	protected $guarded = [];

	public function country()
	{
		return $this->belongsTo(Country::class, 'country_id');
	}

	public function cities()
	{
		return $this->hasMany(City::class, 'region_id');
	}
}
