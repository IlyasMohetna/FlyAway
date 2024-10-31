<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PackagePackageLodging
 * 
 * @property int $id
 * @property int $lodging_mode_id
 * @property int $package_id
 * 
 * @property LodgingLodging $lodging_lodging
 * @property PackagePackage $package_package
 *
 * @package App\Models
 */
class PackagePackageLodging extends Model
{
	protected $table = 'package__package_lodging';
	public $timestamps = false;

	protected $casts = [
		'lodging_mode_id' => 'int',
		'package_id' => 'int'
	];

	protected $fillable = [
		'lodging_mode_id',
		'package_id'
	];

	public function lodging_lodging()
	{
		return $this->belongsTo(LodgingLodging::class, 'lodging_mode_id');
	}

	public function package_package()
	{
		return $this->belongsTo(PackagePackage::class, 'package_id');
	}
}
