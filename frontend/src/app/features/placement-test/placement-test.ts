import { DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import {
  AuthService,
  PlacementAnswer,
  PlacementQuestion,
} from '../../core/services/auth';

@Component({
  selector: 'app-placement-test',
  imports: [DatePipe],
  templateUrl: './placement-test.html',
  styleUrl: './placement-test.css',
})
export class PlacementTest {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly selectedLanguage =
    this.authService.getSelectedLanguage() ?? 'ingles';

  protected readonly selectedLevel =
    this.authService.getSelectedLevel() ?? 'A1';

  protected readonly questions = signal<PlacementQuestion[]>([]);
  protected readonly currentQuestion = signal(0);
  protected readonly selectedAnswer = signal<number | null>(null);
  protected readonly answers = signal<PlacementAnswer[]>([]);
  protected readonly score = signal(0);
  protected readonly estimatedLevel = signal('');
  protected readonly completedAt = signal('');
  protected readonly finished = signal(false);
  protected readonly loading = signal(true);
  protected readonly saving = signal(false);
  protected readonly error = signal('');

  constructor() {
    this.loadQuestions();
  }

  private loadQuestions(): void {
    this.authService
      .getPlacementQuestions(
        this.selectedLanguage,
        this.selectedLevel
      )
      .subscribe({
        next: (response) => {
          this.questions.set(response.questions);
          this.loading.set(false);
        },
        error: (error) => {
          this.error.set(
            error.error?.message ??
            'No se pudieron cargar las preguntas.'
          );
          this.loading.set(false);
        },
      });
  }

  protected selectAnswer(index: number): void {
    this.selectedAnswer.set(index);
  }

  protected nextQuestion(): void {
    const answer = this.selectedAnswer();
    const question = this.questions()[this.currentQuestion()];

    if (answer === null || !question) {
      return;
    }

    const updatedAnswers: PlacementAnswer[] = [
      ...this.answers(),
      {
        question_id: question.id,
        selected_answer: answer,
      },
    ];

    this.answers.set(updatedAnswers);

    if (this.currentQuestion() < this.questions().length - 1) {
      this.currentQuestion.update((value) => value + 1);
      this.selectedAnswer.set(null);
      return;
    }

    this.saveAssessment(updatedAnswers);
  }

  private saveAssessment(answers: PlacementAnswer[]): void {
    this.saving.set(true);
    this.error.set('');

    this.authService
      .savePlacementAssessment({
        language: this.selectedLanguage,
        selected_level: this.selectedLevel,
        answers,
      })
      .subscribe({
        next: (response) => {
          this.score.set(response.assessment.score);
          this.estimatedLevel.set(
            response.assessment.estimated_level
          );
          this.completedAt.set(
            response.assessment.completed_at
          );
          this.saving.set(false);
          this.finished.set(true);
        },
        error: (error) => {
          this.saving.set(false);
          this.error.set(
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
    const total = this.questions().length;

    if (total === 0) {
      return 0;
    }

    return ((this.currentQuestion() + 1) / total) * 100;
  }
}
