<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ConfigCountry
 * 
 * @property int $id
 * @property string $name
 * @property string $iso2
 * @property string $iso3
 * @property string $logo
 * @property float $latitude
 * @property float $longitude
 * @property string $phone_code
 * @property string $numeric_code
 * @property string $currency_code
 * @property string $currency_name
 * @property string $currency_symbol
 * 
 * @property Collection|ConfigRegion[] $config_regions
 *
 * @package App\Models
 */
class ConfigCountry extends Model
{
	protected $table = 'config__country';
	public $timestamps = false;

	protected $casts = [
		'latitude' => 'float',
		'longitude' => 'float'
	];

	protected $fillable = [
		'name',
		'iso2',
		'iso3',
		'logo',
		'latitude',
		'longitude',
		'phone_code',
		'numeric_code',
		'currency_code',
		'currency_name',
		'currency_symbol'
	];

	public function config_regions()
	{
		return $this->hasMany(ConfigRegion::class, 'country_id');
	}
}
