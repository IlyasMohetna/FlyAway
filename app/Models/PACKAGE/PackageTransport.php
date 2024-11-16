<?php
namespace App\Models\PACKAGE;

use Illuminate\Database\Eloquent\Model;
class PackageTransport extends Model
{
	protected $table = 'package__package_transport';
	protected $guarded = [];

    public function transport()
    {
        return $this->hasOne(TransportationMode::class, 'id', 'transportation_mode_id');
    }
}
