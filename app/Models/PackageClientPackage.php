<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class PackageClientPackage
 * 
 * @property int $id
 * @property int $id_client
 * @property int $package_id
 * 
 * @property ClientClient $client_client
 * @property PackagePackage $package_package
 *
 * @package App\Models
 */
class PackageClientPackage extends Model
{
	protected $table = 'package__client_package';
	public $timestamps = false;

	protected $casts = [
		'id_client' => 'int',
		'package_id' => 'int'
	];

	protected $fillable = [
		'id_client',
		'package_id'
	];

	public function client_client()
	{
		return $this->belongsTo(ClientClient::class, 'id_client');
	}

	public function package_package()
	{
		return $this->belongsTo(PackagePackage::class, 'package_id');
	}
}
