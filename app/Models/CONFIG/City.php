<?php

namespace App\Models\CONFIG;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class City extends Model
{
	protected $table = 'config__city';

	protected $guarded = [];

	public function region()
	{
		return $this->belongsTo(Region::class, 'region_id');
	}
}
