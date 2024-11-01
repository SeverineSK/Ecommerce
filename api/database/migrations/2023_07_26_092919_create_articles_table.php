<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('picture');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->float('price');
            $table->float('height');
            $table->float('width');
            $table->float('length');
            $table->float('weight');
            $table->integer('discount')->default(0);
            $table->boolean('recommended')->default(false);
            $table->enum('stock_state', ['In Stock', 'Out of Stock', 'Pre-Order']);
            $table->unsignedInteger('counter_visits')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
