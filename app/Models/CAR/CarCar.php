<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class CarCar
 * 
 * @property int $id
 * @property int $agency_id
 * @property int $type_id
 * @property int $max_passengers
 * @property string $gear_shift
 * @property int $baggage
 * @property int $door
 * @property float $daily_price
 * @property string $feautre_image
 * @property string $description
 * 
 * @property CarAgency $car_agency
 * @property CarType $car_type
 * @property Collection|CarCarFeature[] $car_car_features
 * @property Collection|CarGallery[] $car_galleries
 *
 * @package App\Models
 */
class CarCar extends Model
{
	protected $table = 'car__car';
	public $timestamps = false;

	protected $casts = [
		'agency_id' => 'int',
		'type_id' => 'int',
		'max_passengers' => 'int',
		'baggage' => 'int',
		'door' => 'int',
		'daily_price' => 'float'
	];

	protected $fillable = [
		'agency_id',
		'type_id',
		'max_passengers',
		'gear_shift',
		'baggage',
		'door',
		'daily_price',
		'feautre_image',
		'description'
	];

	public function car_agency()
	{
		return $this->belongsTo(CarAgency::class, 'agency_id');
	}

	public function car_type()
	{
		return $this->belongsTo(CarType::class, 'type_id');
	}

	public function car_car_features()
	{
		return $this->hasMany(CarCarFeature::class, 'id_car');
	}

	public function car_galleries()
	{
		return $this->hasMany(CarGallery::class, 'car_id');
	}
}
