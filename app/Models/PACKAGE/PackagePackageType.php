<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PackagePackageType
 * 
 * @property int $id
 * @property string $nom
 * 
 * @property Collection|PackagePackage[] $package_packages
 *
 * @package App\Models
 */
class PackagePackageType extends Model
{
	protected $table = 'package__package_type';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function package_packages()
	{
		return $this->hasMany(PackagePackage::class, 'package_type_id');
	}
}
