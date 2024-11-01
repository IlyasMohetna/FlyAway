<?php
namespace App\Models\Client;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
	protected $table = 'client__client';
	protected $guarded = [];

	// public function config_city()
	// {
	// 	return $this->belongsTo(ConfigCity::class, 'city_id');
	// }

	// public function user()
	// {
	// 	return $this->belongsTo(User::class);
	// }

	// public function client_client_preferences()
	// {
	// 	return $this->hasMany(ClientClientPreference::class, 'client_id');
	// }

	// public function client_fidelities()
	// {
	// 	return $this->hasMany(ClientFidelity::class, 'client_id');
	// }

	// public function package_client_packages()
	// {
	// 	return $this->hasMany(PackageClientPackage::class, 'id_client');
	// }
}
