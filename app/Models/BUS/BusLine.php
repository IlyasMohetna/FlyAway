<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class BusLine
 * 
 * @property int $id
 * @property int $departure_station_id
 * @property int $arrival_station_id
 * @property Carbon $departure_time
 * @property Carbon $arrival_time
 * @property int $bus_id
 * 
 * @property BusStation $bus_station
 * @property BusBu $bus_bu
 * @property Collection|BusTicket[] $bus_tickets
 *
 * @package App\Models
 */
class BusLine extends Model
{
	protected $table = 'bus__line';
	public $timestamps = false;

	protected $casts = [
		'departure_station_id' => 'int',
		'arrival_station_id' => 'int',
		'departure_time' => 'datetime',
		'arrival_time' => 'datetime',
		'bus_id' => 'int'
	];

	protected $fillable = [
		'departure_station_id',
		'arrival_station_id',
		'departure_time',
		'arrival_time',
		'bus_id'
	];

	public function bus_station()
	{
		return $this->belongsTo(BusStation::class, 'departure_station_id');
	}

	public function bus_bu()
	{
		return $this->belongsTo(BusBu::class, 'bus_id');
	}

	public function bus_tickets()
	{
		return $this->hasMany(BusTicket::class, 'bus_line_id');
	}
}
