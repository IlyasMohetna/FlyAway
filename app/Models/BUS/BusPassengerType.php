<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BusPassengerType
 * 
 * @property int $id
 * @property string $nom
 * 
 * @property Collection|BusTicket[] $bus_tickets
 *
 * @package App\Models
 */
class BusPassengerType extends Model
{
	protected $table = 'bus__passenger_type';
	public $timestamps = false;

	protected $fillable = [
		'nom'
	];

	public function bus_tickets()
	{
		return $this->hasMany(BusTicket::class, 'passenger_type_id');
	}
}
