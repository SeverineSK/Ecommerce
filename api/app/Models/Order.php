<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

// use App\Models\Article;

class Order extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'orders';

    /**
     * The primary key associated with the table.
     *
     * @var int
     */

    protected $primaryKey = 'id';

    /**
     * get the articles in the order.
     */
   public function articles(): BelongsToMany
   {
       return $this->belongsToMany(Article::class);
   }

    /**
     * get the user who made the order.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}
