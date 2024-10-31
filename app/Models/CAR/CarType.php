<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CarType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|CarCar[] $car_cars
 *
 * @package App\Models
 */
class CarType extends Model
{
	protected $table = 'car__types';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function car_cars()
	{
		return $this->hasMany(CarCar::class, 'type_id');
	}
}
