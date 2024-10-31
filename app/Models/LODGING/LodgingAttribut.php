<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingAttribut
 * 
 * @property int $id
 * @property int $lodging_id
 * @property int $attribut_term_id
 * @property bool $actif
 * 
 * @property LodgingAttributTerm $lodging_attribut_term
 * @property LodgingLodging $lodging_lodging
 *
 * @package App\Models
 */
class LodgingAttribut extends Model
{
	protected $table = 'lodging__attribut';
	public $timestamps = false;

	protected $casts = [
		'lodging_id' => 'int',
		'attribut_term_id' => 'int',
		'actif' => 'bool'
	];

	protected $fillable = [
		'lodging_id',
		'attribut_term_id',
		'actif'
	];

	public function lodging_attribut_term()
	{
		return $this->belongsTo(LodgingAttributTerm::class, 'attribut_term_id');
	}

	public function lodging_lodging()
	{
		return $this->belongsTo(LodgingLodging::class, 'lodging_id');
	}
}
