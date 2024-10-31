<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CarAgency
 * 
 * @property int $id
 * @property string $name
 * @property string $address_1
 * @property string|null $address_2
 * @property int $city_id
 * 
 * @property ConfigCity $config_city
 * @property Collection|CarCar[] $car_cars
 *
 * @package App\Models
 */
class CarAgency extends Model
{
	protected $table = 'car__agency';
	public $timestamps = false;

	protected $casts = [
		'city_id' => 'int'
	];

	protected $fillable = [
		'name',
		'address_1',
		'address_2',
		'city_id'
	];

	public function config_city()
	{
		return $this->belongsTo(ConfigCity::class, 'city_id');
	}

	public function car_cars()
	{
		return $this->hasMany(CarCar::class, 'agency_id');
	}
}
