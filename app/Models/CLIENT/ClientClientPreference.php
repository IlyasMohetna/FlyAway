<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ClientClientPreference
 * 
 * @property int $id
 * @property int $client_id
 * @property int $preference_type_id
 * 
 * @property ClientClient $client_client
 * @property ClientPreferencesType $client_preferences_type
 *
 * @package App\Models
 */
class ClientClientPreference extends Model
{
	protected $table = 'client__client_preference';
	public $timestamps = false;

	protected $casts = [
		'client_id' => 'int',
		'preference_type_id' => 'int'
	];

	protected $fillable = [
		'client_id',
		'preference_type_id'
	];

	public function client_client()
	{
		return $this->belongsTo(ClientClient::class, 'client_id');
	}

	public function client_preferences_type()
	{
		return $this->belongsTo(ClientPreferencesType::class, 'preference_type_id');
	}
}
