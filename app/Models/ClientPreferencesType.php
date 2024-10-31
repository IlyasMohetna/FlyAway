<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ClientPreferencesType
 * 
 * @property int $id
 * @property string $nom
 * 
 * @property Collection|ClientClientPreference[] $client_client_preferences
 *
 * @package App\Models
 */
class ClientPreferencesType extends Model
{
	protected $table = 'client__preferences_type';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function client_client_preferences()
	{
		return $this->hasMany(ClientClientPreference::class, 'preference_type_id');
	}
}
