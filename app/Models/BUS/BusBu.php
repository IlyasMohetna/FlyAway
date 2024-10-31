<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Bus
 * 
 * @property int $id
 * @property string $plate
 * @property string $color
 * @property string $number_of_seats
 * @property int $number_of_doors
 * @property string $photo
 * @property int $bus_company_id
 * 
 * @property BusCompany $bus_company
 * @property Collection|BusLine[] $bus_lines
 *
 * @package App\Models
 */
class Bus extends Model
{
	protected $table = 'bus__bus';
	public $timestamps = false;

	protected $casts = [
		'number_of_doors' => 'int',
		'bus_company_id' => 'int'
	];

	protected $fillable = [
		'plate',
		'color',
		'number_of_seats',
		'number_of_doors',
		'photo',
		'bus_company_id'
	];

	public function bus_company()
	{
		return $this->belongsTo(BusCompany::class, 'bus_company_id');
	}

	public function bus_lines()
	{
		return $this->hasMany(BusLine::class, 'bus_id');
	}
}
