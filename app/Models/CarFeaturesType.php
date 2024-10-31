<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CarFeaturesType
 * 
 * @property int $id
 * @property string $name
 * @property string $icon
 * 
 * @property Collection|CarCarFeature[] $car_car_features
 *
 * @package App\Models
 */
class CarFeaturesType extends Model
{
	protected $table = 'car__features_type';
	public $timestamps = false;

	protected $fillable = [
		'name',
		'icon'
	];

	public function car_car_features()
	{
		return $this->hasMany(CarCarFeature::class, 'id_car_feature_type');
	}
}
