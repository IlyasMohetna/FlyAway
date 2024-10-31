<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class CarGallery
 * 
 * @property int $id
 * @property string $file_name
 * @property string $mime_type
 * @property int $size
 * @property string $storage_driver
 * @property int $car_id
 * 
 * @property CarCar $car_car
 *
 * @package App\Models
 */
class CarGallery extends Model
{
	protected $table = 'car__gallery';
	public $timestamps = false;

	protected $casts = [
		'size' => 'int',
		'car_id' => 'int'
	];

	protected $fillable = [
		'file_name',
		'mime_type',
		'size',
		'storage_driver',
		'car_id'
	];

	public function car_car()
	{
		return $this->belongsTo(CarCar::class, 'car_id');
	}
}
