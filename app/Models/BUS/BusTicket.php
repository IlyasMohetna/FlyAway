<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class BusTicket
 * 
 * @property int $id
 * @property float $price
 * @property int $bus_line_id
 * @property int $passenger_type_id
 * 
 * @property BusLine $bus_line
 * @property BusPassengerType $bus_passenger_type
 *
 * @package App\Models
 */
class BusTicket extends Model
{
	protected $table = 'bus__ticket';
	public $timestamps = false;

	protected $casts = [
		'price' => 'float',
		'bus_line_id' => 'int',
		'passenger_type_id' => 'int'
	];

	protected $fillable = [
		'price',
		'bus_line_id',
		'passenger_type_id'
	];

	public function bus_line()
	{
		return $this->belongsTo(BusLine::class, 'bus_line_id');
	}

	public function bus_passenger_type()
	{
		return $this->belongsTo(BusPassengerType::class, 'passenger_type_id');
	}
}
