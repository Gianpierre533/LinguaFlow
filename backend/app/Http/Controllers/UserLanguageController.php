<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserLanguageController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
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
            ],
            [
                'language.required' => 'El idioma es obligatorio.',
                'language.in' => 'El idioma seleccionado no está disponible.',
                'level.required' => 'El nivel es obligatorio.',
                'level.in' => 'El nivel seleccionado no es válido.',
            ]
        );

        $userLanguage = $request->user()
            ->languages()
            ->updateOrCreate(
                ['language' => $validated['language']],
                ['level' => $validated['level']]
            );

        return response()->json([
            'message' => 'Idioma y nivel guardados correctamente.',
            'user_language' => $userLanguage,
        ], 200);
    }
}