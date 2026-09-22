<?php

namespace App\Http\Controllers;

use App\Models\PlacementAssessment;
use Illuminate\Http\Request;

class PlacementAssessmentController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'language' => [
                'required',
                'string',
                'in:ingles,italiano,portugues,polaco',
            ],
            'selected_level' => [
                'required',
                'string',
                'in:A1,A2,B1,B2,C1,C2',
            ],
            'score' => [
                'required',
                'integer',
                'min:0',
            ],
            'total_questions' => [
                'required',
                'integer',
                'min:1',
            ],
            'answers' => [
                'required',
                'array',
            ],
        ]);

        $percentage = (
            $validated['score'] / $validated['total_questions']
        ) * 100;

        $estimatedLevel = match (true) {
            $percentage >= 90 => 'B2',
            $percentage >= 70 => 'B1',
            $percentage >= 40 => 'A2',
            default => 'A1',
        };

        $assessment = $request->user()
            ->placementAssessments()
            ->create([
                'language' => $validated['language'],
                'selected_level' => $validated['selected_level'],
                'estimated_level' => $estimatedLevel,
                'score' => $validated['score'],
                'total_questions' => $validated['total_questions'],
                'answers' => $validated['answers'],
                'completed_at' => now(),
            ]);

        return response()->json([
            'message' => 'Evaluación guardada correctamente.',
            'assessment' => $assessment,
        ], 201);
    }
}