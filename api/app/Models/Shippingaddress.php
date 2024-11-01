<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Shippingaddress extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'shipping_addresses';

    /**
     * The primary key associated with the table.
     *
     * @var int
     */

    protected $primaryKey = 'id';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'street1',
        'street2',
        'city',
        'state',
        'zip',
        'country'
    ];

    /**
     * get the user relared to the adress.
     */
   public function user() {

       return $this->belongsTo(User::class, 'user_id', 'id');
       
   }
}
