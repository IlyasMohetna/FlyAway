<?php
namespace App\Models\PACKAGE;

use App\Models\LODGING\Lodging;
use Illuminate\Database\Eloquent\Model;

class PackageLodging extends Model
{
	protected $table = 'package__package_lodging';

	protected $guarded = [];

    public function lodging()
    {
        return $this->hasOne(Lodging::class, 'id', 'lodging_mode_id');
    }
}
