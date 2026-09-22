<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('placement_questions', function (Blueprint $table) {
            $table->id();

            $table->string('language');
            $table->string('level');
            $table->string('category');

            $table->text('question');
            $table->json('options');
            $table->unsignedTinyInteger('correct_answer');
            $table->text('explanation')->nullable();

            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->index(['language', 'level']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placement_questions');
    }
};