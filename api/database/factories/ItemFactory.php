<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //
            "article_id" => $this->faker->numberBetween(1, 125),
            "cart_id" => $this->faker->numberBetween(1, 11),
            "quantity" => $this->faker->numberBetween(1, 5),
            "created_at" => now(),
            "updated_at" => now(),
        ];
    }
}
