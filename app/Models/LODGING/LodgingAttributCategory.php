<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class LodgingAttributCategory
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|LodgingAttributTerm[] $lodging_attribut_terms
 *
 * @package App\Models
 */
class LodgingAttributCategory extends Model
{
	protected $table = 'lodging__attribut_categories';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function lodging_attribut_terms()
	{
		return $this->hasMany(LodgingAttributTerm::class, 'attribut_categorie_id');
	}
}
