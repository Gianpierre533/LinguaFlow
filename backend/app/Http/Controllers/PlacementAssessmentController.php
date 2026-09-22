<?php

namespace App\Http\Controllers;

use App\Models\PlacementAssessment;
use App\Models\PlacementQuestion;
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
            'answers' => [
                'required',
                'array',
                'min:1',
            ],
            'answers.*.question_id' => [
                'required',
                'integer',
                'exists:placement_questions,id',
            ],
            'answers.*.selected_answer' => [
                'required',
                'integer',
                'min:0',
                'max:3',
            ],
        ]);

        $questionIds = collect($validated['answers'])
            ->pluck('question_id');

        $questions = PlacementQuestion::query()
            ->whereIn('id', $questionIds)
            ->where('language', $validated['language'])
            ->where('level', $validated['selected_level'])
            ->where('is_active', true)
            ->get()
            ->keyBy('id');

        $score = collect($validated['answers'])
            ->filter(function (array $answer) use ($questions): bool {
                $question = $questions->get($answer['question_id']);

                return $question !== null &&
                    $question->correct_answer === $answer['selected_answer'];
            })
            ->count();

        $totalQuestions = count($validated['answers']);
        $percentage = ($score / $totalQuestions) * 100;

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
                'score' => $score,
                'total_questions' => $totalQuestions,
                'answers' => $validated['answers'],
                'completed_at' => now(),
            ]);

        return response()->json([
            'message' => 'Evaluación guardada correctamente.',
            'assessment' => $assessment,
        ], 201);
    }
}