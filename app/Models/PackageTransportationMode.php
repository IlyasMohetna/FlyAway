<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class PackageTransportationMode
 * 
 * @property int $id
 * @property string $nom
 * 
 * @property Collection|PackagePackageTransport[] $package_package_transports
 *
 * @package App\Models
 */
class PackageTransportationMode extends Model
{
	protected $table = 'package__transportation_modes';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function package_package_transports()
	{
		return $this->hasMany(PackagePackageTransport::class, 'transportation_mode_id');
	}
}
