<?php

namespace App\Http\Controllers;

use App\Models\PlacementQuestion;
use Illuminate\Http\Request;

class PlacementQuestionController extends Controller
{
    public function index(Request $request)
    {
        $validated = $request->validate([
            'language' => [
                'required',
                'string',
                'in:ingles,italiano,portugues,polaco',
            ],
            'level' => [
                'required',
                'string',
                'in:A1,A2,B1,B2,C1,C2',
            ],
        ]);

        $questions = PlacementQuestion::query()
            ->where('language', $validated['language'])
            ->where('level', $validated['level'])
            ->where('is_active', true)
            ->inRandomOrder()
            ->limit(10)
            ->get([
                'id',
                'language',
                'level',
                'category',
                'question',
                'options',
                'explanation',
            ]);

        return response()->json([
            'questions' => $questions,
        ]);
    }
}