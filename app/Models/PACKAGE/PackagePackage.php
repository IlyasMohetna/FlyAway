<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PackagePackage
 * 
 * @property int $id
 * @property string $titre
 * @property float $amount_ht
 * @property float $amount_ttc
 * @property int $duree
 * @property string $description
 * @property int $package_type_id
 * @property int $destination_id
 * 
 * @property ConfigCity $config_city
 * @property PackagePackageType $package_package_type
 * @property Collection|PackageClientPackage[] $package_client_packages
 * @property Collection|PackageItinerary[] $package_itineraries
 * @property Collection|PackagePackageLodging[] $package_package_lodgings
 * @property Collection|PackagePackageTransport[] $package_package_transports
 *
 * @package App\Models
 */
class PackagePackage extends Model
{
	protected $table = 'package__package';
	public $timestamps = false;

	protected $casts = [
		'amount_ht' => 'float',
		'amount_ttc' => 'float',
		'duree' => 'int',
		'package_type_id' => 'int',
		'destination_id' => 'int'
	];

	protected $fillable = [
		'titre',
		'amount_ht',
		'amount_ttc',
		'duree',
		'description',
		'package_type_id',
		'destination_id'
	];

	public function config_city()
	{
		return $this->belongsTo(ConfigCity::class, 'destination_id');
	}

	public function package_package_type()
	{
		return $this->belongsTo(PackagePackageType::class, 'package_type_id');
	}

	public function package_client_packages()
	{
		return $this->hasMany(PackageClientPackage::class, 'package_id');
	}

	public function package_itineraries()
	{
		return $this->hasMany(PackageItinerary::class, 'package_id');
	}

	public function package_package_lodgings()
	{
		return $this->hasMany(PackagePackageLodging::class, 'package_id');
	}

	public function package_package_transports()
	{
		return $this->hasMany(PackagePackageTransport::class, 'package_id');
	}
}
