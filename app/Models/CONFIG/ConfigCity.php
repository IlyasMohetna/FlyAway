<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ConfigCity
 * 
 * @property int $id
 * @property string $name
 * @property string $postal_code
 * @property float $latitude
 * @property float $longitude
 * @property int $region_id
 * @property string $wikiData
 * 
 * @property ConfigRegion $config_region
 * @property Collection|BusStation[] $bus_stations
 * @property Collection|CarAgency[] $car_agencies
 * @property Collection|ClientClient[] $client_clients
 * @property Collection|FlightAirport[] $flight_airports
 * @property Collection|LodgingLodging[] $lodging_lodgings
 * @property Collection|PackagePackage[] $package_packages
 * @property Collection|TrainStation[] $train_stations
 *
 * @package App\Models
 */
class ConfigCity extends Model
{
	protected $table = 'config__city';
	public $timestamps = false;

	protected $casts = [
		'latitude' => 'float',
		'longitude' => 'float',
		'region_id' => 'int'
	];

	protected $fillable = [
		'name',
		'postal_code',
		'latitude',
		'longitude',
		'region_id',
		'wikiData'
	];

	public function config_region()
	{
		return $this->belongsTo(ConfigRegion::class, 'region_id');
	}

	public function bus_stations()
	{
		return $this->hasMany(BusStation::class, 'city_id');
	}

	public function car_agencies()
	{
		return $this->hasMany(CarAgency::class, 'city_id');
	}

	public function client_clients()
	{
		return $this->hasMany(ClientClient::class, 'city_id');
	}

	public function flight_airports()
	{
		return $this->hasMany(FlightAirport::class, 'city_id');
	}

	public function lodging_lodgings()
	{
		return $this->hasMany(LodgingLodging::class, 'real_city_id');
	}

	public function package_packages()
	{
		return $this->hasMany(PackagePackage::class, 'destination_id');
	}

	public function train_stations()
	{
		return $this->hasMany(TrainStation::class, 'city_id');
	}
}
