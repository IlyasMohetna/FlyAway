<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingAttributTerm
 * 
 * @property int $id
 * @property string $name
 * @property int $attribut_categorie_id
 * 
 * @property LodgingAttributCategory $lodging_attribut_category
 * @property Collection|LodgingAttribut[] $lodging_attributs
 *
 * @package App\Models
 */
class LodgingAttributTerm extends Model
{
	protected $table = 'lodging__attribut_terms';
	public $timestamps = false;

	protected $casts = [
		'attribut_categorie_id' => 'int'
	];

	protected $fillable = [
		'name',
		'attribut_categorie_id'
	];

	public function lodging_attribut_category()
	{
		return $this->belongsTo(LodgingAttributCategory::class, 'attribut_categorie_id');
	}

	public function lodging_attributs()
	{
		return $this->hasMany(LodgingAttribut::class, 'attribut_term_id');
	}
}
