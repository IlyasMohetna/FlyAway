<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ClientFidelityTransactionType
 * 
 * @property int $id
 * @property string $name
 * 
 * @property Collection|ClientFidelity[] $client_fidelities
 *
 * @package App\Models
 */
class ClientFidelityTransactionType extends Model
{
	protected $table = 'client__fidelity_transaction_type';
	public $timestamps = false;

	protected $fillable = [
		'name'
	];

	public function client_fidelities()
	{
		return $this->hasMany(ClientFidelity::class, 'transaction_type_id');
	}
}
