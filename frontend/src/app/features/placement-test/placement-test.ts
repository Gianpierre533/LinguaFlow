import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

@Component({
  selector: 'app-placement-test',
  imports: [],
  templateUrl: './placement-test.html',
  styleUrl: './placement-test.css',
})
export class PlacementTest {
  protected getRecommendedLevel(): string {
  const percentage = (this.score() / this.questions.length) * 100;

  if (percentage >= 90) {
    return 'B2 · Intermedio alto';
  }

  if (percentage >= 70) {
    return 'B1 · Intermedio';
  }

  if (percentage >= 40) {
    return 'A2 · Básico';
  }

  return 'A1 · Inicial';
}
  private readonly authService = inject(AuthService);

protected readonly selectedLanguage =
  this.authService.getSelectedLanguage() ?? 'ingles';

protected readonly selectedLevel =
  this.authService.getSelectedLevel() ?? 'A1';

  protected readonly answers = signal<number[]>([]);
protected readonly saving = signal(false);
protected readonly saveError = signal('');

  private readonly router = inject(Router);

  protected readonly currentQuestion = signal(0);
  protected readonly selectedAnswer = signal<number | null>(null);
  protected readonly score = signal(0);
  protected readonly finished = signal(false);

  protected readonly questions: Question[] = this.loadQuestions();

private loadQuestions(): Question[] {
  const key = `${this.selectedLanguage}-${this.selectedLevel}`;

  const questionBank: Record<string, Question[]> = {
    'ingles-A1': [
      {
        question: '¿Cuál es la traducción correcta de “Hello”?',
        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
        correctAnswer: 1,
      },
      {
        question: 'Completa: “I ___ a student”.',
        options: ['am', 'is', 'are', 'be'],
        correctAnswer: 0,
      },
      {
        question: '¿Qué significa “Good morning”?',
        options: ['Buenas noches', 'Buenos días', 'Hasta luego', 'Bienvenido'],
        correctAnswer: 1,
      },
    ],

    'ingles-A2': [
      {
        question: 'Completa: “She ___ coffee every morning”.',
        options: ['drink', 'drinks', 'drinking', 'drank'],
        correctAnswer: 1,
      },
      {
        question: '¿Cuál es el pasado de “go”?',
        options: ['Goed', 'Gone', 'Went', 'Going'],
        correctAnswer: 2,
      },
      {
        question: '¿Qué significa “I have never visited London”?',
        options: [
          'Visité Londres ayer',
          'Nunca he visitado Londres',
          'Visitaré Londres',
          'Vivo en Londres',
        ],
        correctAnswer: 1,
      },
    ],

    'italiano-A1': [
      {
        question: '¿Qué significa “Ciao”?',
        options: ['Hola', 'Gracias', 'Adiós solamente', 'Perdón'],
        correctAnswer: 0,
      },
      {
        question: 'Completa: “Io ___ studente”.',
        options: ['sono', 'sei', 'è', 'siete'],
        correctAnswer: 0,
      },
      {
        question: '¿Qué significa “Grazie”?',
        options: ['Hola', 'Gracias', 'Por favor', 'Buenos días'],
        correctAnswer: 1,
      },
    ],

    'portugues-A1': [
      {
        question: '¿Qué significa “Olá”?',
        options: ['Hola', 'Adiós', 'Gracias', 'Perdón'],
        correctAnswer: 0,
      },
      {
        question: 'Completa: “Eu ___ estudante”.',
        options: ['sou', 'é', 'são', 'somos'],
        correctAnswer: 0,
      },
      {
        question: '¿Qué significa “Obrigado”?',
        options: ['Hola', 'Gracias', 'Por favor', 'Hasta luego'],
        correctAnswer: 1,
      },
    ],

    'polaco-A1': [
      {
        question: '¿Qué significa “Dzień dobry”?',
        options: ['Buenas noches', 'Buenos días', 'Gracias', 'Adiós'],
        correctAnswer: 1,
      },
      {
        question: '¿Qué significa “Cześć”?',
        options: ['Hola', 'Perdón', 'Gracias', 'Por favor'],
        correctAnswer: 0,
      },
      {
        question: '¿Qué significa “Dziękuję”?',
        options: ['Hola', 'Gracias', 'Adiós', 'Buenos días'],
        correctAnswer: 1,
      },
    ],
  };

  return questionBank[key] ?? questionBank['ingles-A1'];
}

  protected selectAnswer(index: number): void {
    this.selectedAnswer.set(index);
  }

  protected nextQuestion(): void {
  const answer = this.selectedAnswer();

  if (answer === null) {
    return;
  }

  const current = this.questions[this.currentQuestion()];
  const isCorrect = answer === current.correctAnswer;
  const updatedScore = this.score() + (isCorrect ? 1 : 0);
  const updatedAnswers = [...this.answers(), answer];

  this.score.set(updatedScore);
  this.answers.set(updatedAnswers);

  if (this.currentQuestion() < this.questions.length - 1) {
    this.currentQuestion.update((value) => value + 1);
    this.selectedAnswer.set(null);
    return;
  }

  this.saveAssessment(updatedScore, updatedAnswers);
}

  private saveAssessment(
    finalScore: number,
    finalAnswers: number[]
  ): void {
    this.saving.set(true);
    this.saveError.set('');

    this.authService.savePlacementAssessment({
      language: this.selectedLanguage,
      selected_level: this.selectedLevel,
      score: finalScore,
      total_questions: this.questions.length,
      answers: finalAnswers,
    }).subscribe({
      next: () => {
        this.saving.set(false);
        this.finished.set(true);
      },
      error: (error) => {
        this.saving.set(false);
        this.saveError.set(
          error.error?.message ??
          'No se pudo guardar la evaluación.'
        );
      },
    });
  }

  protected finishTest(): void {
    this.router.navigate(['/dashboard']);
  }

  protected get progress(): number {
    return ((this.currentQuestion() + 1) / this.questions.length) * 100;
  }
}
