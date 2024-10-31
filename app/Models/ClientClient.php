<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ClientClient
 * 
 * @property int $id
 * @property int $user_id
 * @property string $firstname
 * @property string $lastname
 * @property string $email
 * @property string $phone
 * @property string $address_1
 * @property string $address_2
 * @property int $city_id
 * 
 * @property ConfigCity $config_city
 * @property User $user
 * @property Collection|ClientClientPreference[] $client_client_preferences
 * @property Collection|ClientFidelity[] $client_fidelities
 * @property Collection|PackageClientPackage[] $package_client_packages
 *
 * @package App\Models
 */
class ClientClient extends Model
{
	protected $table = 'client__client';
	public $timestamps = false;

	protected $casts = [
		'user_id' => 'int',
		'city_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'firstname',
		'lastname',
		'email',
		'phone',
		'address_1',
		'address_2',
		'city_id'
	];

	public function config_city()
	{
		return $this->belongsTo(ConfigCity::class, 'city_id');
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function client_client_preferences()
	{
		return $this->hasMany(ClientClientPreference::class, 'client_id');
	}

	public function client_fidelities()
	{
		return $this->hasMany(ClientFidelity::class, 'client_id');
	}

	public function package_client_packages()
	{
		return $this->hasMany(PackageClientPackage::class, 'id_client');
	}
}
