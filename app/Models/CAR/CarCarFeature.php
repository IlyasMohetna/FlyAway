<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CarCarFeature
 * 
 * @property int $id
 * @property int $id_car_feature_type
 * @property int $id_car
 * 
 * @property CarFeaturesType $car_features_type
 * @property CarCar $car_car
 *
 * @package App\Models
 */
class CarCarFeature extends Model
{
	protected $table = 'car__car_feature';
	public $timestamps = false;

	protected $casts = [
		'id_car_feature_type' => 'int',
		'id_car' => 'int'
	];

	protected $fillable = [
		'id_car_feature_type',
		'id_car'
	];

	public function car_features_type()
	{
		return $this->belongsTo(CarFeaturesType::class, 'id_car_feature_type');
	}

	public function car_car()
	{
		return $this->belongsTo(CarCar::class, 'id_car');
	}
}
