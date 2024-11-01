<?php

namespace Database\Factories;

use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Article>
 */
class ArticleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'picture' => fake()->imageUrl(),
            'description' => fake()->realText(),
            'name' => fake()->jobTitle(),
            'price' => fake()->randomFloat(2, 0, 1000),
            'width' => fake()->randomFloat(2, 0, 1000),
            'height' => fake()->randomFloat(2, 0, 1000),
            'length' => fake()->randomFloat(2, 0, 1000),
            'weight' => fake()->randomFloat(2, 0, 1000),
        ];
    }
}
