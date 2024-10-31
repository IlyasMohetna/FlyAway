<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PackagePackageTransport
 * 
 * @property int $id
 * @property int $transportation_mode_id
 * @property int $package_id
 * 
 * @property PackagePackage $package_package
 * @property PackageTransportationMode $package_transportation_mode
 *
 * @package App\Models
 */
class PackagePackageTransport extends Model
{
	protected $table = 'package__package_transport';
	public $timestamps = false;

	protected $casts = [
		'transportation_mode_id' => 'int',
		'package_id' => 'int'
	];

	protected $fillable = [
		'transportation_mode_id',
		'package_id'
	];

	public function package_package()
	{
		return $this->belongsTo(PackagePackage::class, 'package_id');
	}

	public function package_transportation_mode()
	{
		return $this->belongsTo(PackageTransportationMode::class, 'transportation_mode_id');
	}
}
