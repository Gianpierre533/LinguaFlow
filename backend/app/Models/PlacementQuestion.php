<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlacementQuestion extends Model
{
    use HasFactory;

    protected $fillable = [
        'language',
        'level',
        'category',
        'question',
        'options',
        'correct_answer',
        'explanation',
        'is_active',
    ];

    protected function casts(): array
    {
        return [
            'options' => 'array',
            'correct_answer' => 'integer',
            'is_active' => 'boolean',
        ];
    }
}