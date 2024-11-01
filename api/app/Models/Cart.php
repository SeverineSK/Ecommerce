<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    use HasFactory;


    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'carts';

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
        'user_id',
        'article_id',
        'quantity',
    ];

    /**
     * Relationship with Users.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relationship with Articles.
     */
    public function article(): BelongsTo
    {
        return $this->belongsTo(Article::class);
    }

    /**
     * Relationship with variants.
     */
     
    public function variants(): HasMany
    {
        return $this->hasMany(Variant::class);
    }

    /**
     * Relationship with items.
     */

    public function items(): HasMany
    {
        return $this->hasMany(Item::class);
    }
    
}
