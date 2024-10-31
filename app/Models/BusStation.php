<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BusStation
 * 
 * @property int $id
 * @property string $name
 * @property int $city_id
 * 
 * @property ConfigCity $config_city
 * @property Collection|BusLine[] $bus_lines
 *
 * @package App\Models
 */
class BusStation extends Model
{
	protected $table = 'bus__station';
	public $timestamps = false;

	protected $casts = [
		'city_id' => 'int'
	];

	protected $fillable = [
		'name',
		'city_id'
	];

	public function config_city()
	{
		return $this->belongsTo(ConfigCity::class, 'city_id');
	}

	public function bus_lines()
	{
		return $this->hasMany(BusLine::class, 'departure_station_id');
	}
}
