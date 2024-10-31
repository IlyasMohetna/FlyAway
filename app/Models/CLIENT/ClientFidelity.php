<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

/**
 * Class ClientFidelity
 * 
 * @property int $id
 * @property int $point
 * @property string $subject
 * @property int $client_id
 * @property int $transaction_type_id
 * 
 * @property ClientClient $client_client
 * @property ClientFidelityTransactionType $client_fidelity_transaction_type
 *
 * @package App\Models
 */
class ClientFidelity extends Model
{
	protected $table = 'client_fidelity';
	public $timestamps = false;

	protected $casts = [
		'point' => 'int',
		'client_id' => 'int',
		'transaction_type_id' => 'int'
	];

	protected $fillable = [
		'point',
		'subject',
		'client_id',
		'transaction_type_id'
	];

	public function client_client()
	{
		return $this->belongsTo(ClientClient::class, 'client_id');
	}

	public function client_fidelity_transaction_type()
	{
		return $this->belongsTo(ClientFidelityTransactionType::class, 'transaction_type_id');
	}
}
