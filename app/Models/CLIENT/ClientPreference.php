<?php

namespace App\Models\CLIENT;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ClientPreference extends Model
{
    protected $table = 'client__client_preference';

    public function client(): HasOne
    {
        return $this->hasOne(Client::class, 'client_id');
    }

    public function preferenceType(): HasOne
    {
        return $this->hasOne(PreferencesType::class, 'preference_type_id');
    }
}
