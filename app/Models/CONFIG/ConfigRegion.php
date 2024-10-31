<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ConfigRegion
 * 
 * @property int $id
 * @property string $name
 * @property int $country_id
 * 
 * @property ConfigCountry $config_country
 * @property Collection|ConfigCity[] $config_cities
 *
 * @package App\Models
 */
class ConfigRegion extends Model
{
	protected $table = 'config__region';
	public $timestamps = false;

	protected $casts = [
		'country_id' => 'int'
	];

	protected $fillable = [
		'name',
		'country_id'
	];

	public function config_country()
	{
		return $this->belongsTo(ConfigCountry::class, 'country_id');
	}

	public function config_cities()
	{
		return $this->hasMany(ConfigCity::class, 'region_id');
	}
}
