<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('placement_assessments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained()
                ->cascadeOnDelete();

            $table->string('language');
            $table->string('selected_level');
            $table->string('estimated_level')->nullable();

            $table->unsignedInteger('score')->default(0);
            $table->unsignedInteger('total_questions')->default(0);

            $table->json('answers')->nullable();
            $table->timestamp('completed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('placement_assessments');
    }
};