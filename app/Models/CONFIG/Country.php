<?php

namespace App\Models\CONFIG;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
	protected $table = 'config__country';

	protected $guarded = [];

	public function regions()
	{
		return $this->hasMany(Region::class, 'country_id');
	}
}
