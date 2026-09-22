<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class PlacementQuestionSeeder extends Seeder
{
    public function run(): void
    {
        $questions = [
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'vocabulario',
                'question' => '¿Qué significa “Hello”?',
                'options' => json_encode([
                    'Adiós',
                    'Hola',
                    'Gracias',
                    'Por favor',
                ]),
                'correct_answer' => 1,
                'explanation' => 'Hello significa Hola.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'gramatica',
                'question' => 'Completa: “I ___ a student”.',
                'options' => json_encode([
                    'am',
                    'is',
                    'are',
                    'be',
                ]),
                'correct_answer' => 0,
                'explanation' => 'Con I se utiliza am.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'vocabulario',
                'question' => '¿Qué significa “Good morning”?',
                'options' => json_encode([
                    'Buenas noches',
                    'Buenos días',
                    'Hasta luego',
                    'Bienvenido',
                ]),
                'correct_answer' => 1,
                'explanation' => 'Good morning significa Buenos días.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'vocabulario',
                'question' => '¿Qué significa “Thank you”?',
                'options' => json_encode(['Hola', 'Gracias', 'Adiós', 'Perdón']),
                'correct_answer' => 1,
                'explanation' => 'Thank you significa Gracias.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'gramatica',
                'question' => 'Completa: “They ___ friends”.',
                'options' => json_encode(['am', 'is', 'are', 'be']),
                'correct_answer' => 2,
                'explanation' => 'Con They se utiliza are.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'vocabulario',
                'question' => '¿Qué significa “Book”?',
                'options' => json_encode(['Mesa', 'Libro', 'Silla', 'Puerta']),
                'correct_answer' => 1,
                'explanation' => 'Book significa Libro.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'gramatica',
                'question' => 'Completa: “This ___ my house”.',
                'options' => json_encode(['am', 'are', 'is', 'be']),
                'correct_answer' => 2,
                'explanation' => 'Con This se utiliza is.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'vocabulario',
                'question' => '¿Qué significa “Water”?',
                'options' => json_encode(['Agua', 'Comida', 'Leche', 'Pan']),
                'correct_answer' => 0,
                'explanation' => 'Water significa Agua.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'gramatica',
                'question' => 'Selecciona la opción correcta: “She ___ happy”.',
                'options' => json_encode(['am', 'are', 'is', 'be']),
                'correct_answer' => 2,
                'explanation' => 'Con She se utiliza is.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'vocabulario',
                'question' => '¿Qué significa “Red”?',
                'options' => json_encode(['Azul', 'Verde', 'Rojo', 'Amarillo']),
                'correct_answer' => 2,
                'explanation' => 'Red significa Rojo.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'language' => 'ingles',
                'level' => 'A1',
                'category' => 'comprension',
                'question' => '“My name is Ana”. ¿Qué significa?',
                'options' => json_encode([
                    'Mi nombre es Ana',
                    'Ana es mi amiga',
                    'Vivo con Ana',
                    'Conozco a Ana',
                ]),
                'correct_answer' => 0,
                'explanation' => 'My name is Ana significa Mi nombre es Ana.',
                'is_active' => true,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ];

        foreach ($questions as $question) {
            DB::table('placement_questions')->updateOrInsert(
                [
                    'language' => $question['language'],
                    'level' => $question['level'],
                    'question' => $question['question'],
                ],
                $question
            );
        }
    }
}
