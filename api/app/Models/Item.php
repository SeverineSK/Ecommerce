<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'items';

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
        'article_id',
        'quantity',
    ];

    /**
     * Relationship with Articles.
     */
    public function article()
    {
        return $this->belongsTo(Article::class);
    }

    /**
     * Relationship with variants.
     */

    public function variants()
    {
        return $this->belongsToMany(Variant::class);
    }
}
