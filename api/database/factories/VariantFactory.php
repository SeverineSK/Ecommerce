<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Variant>
 */
class VariantFactory extends Factory
{
     /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->jobTitle(),
            'feature_id' => fake()->numberBetween(1, 2),
            'price' => fake()->randomFloat(2, 0, 1000),
            'stock' => fake()->numberBetween(0, 100),
        ];
    }
}
