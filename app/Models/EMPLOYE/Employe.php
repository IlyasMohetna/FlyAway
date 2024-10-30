<?php

namespace App\Models\EMPLOYE;

use App\Models\CONFIG\City;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employe extends Model
{
    protected $table = 'employe__employe';

    public function city(): HasOne
    {
        return $this->hasOne(City::class, 'city_id');
    }

    public function post(): HasOne
    {
        return $this->hasOne(Post::class, 'post_id');
    }

}
