import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-language-selection',
  imports: [ReactiveFormsModule],
  templateUrl: './language-selection.html',
  styleUrl: './language-selection.css',
})
export class LanguageSelection {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly error = signal('');

  protected readonly languageForm = this.formBuilder.nonNullable.group({
    language: ['', [Validators.required]],
    level: ['', [Validators.required]],
  });

  protected saveSelection(): void {
    if (this.languageForm.invalid) {
      this.languageForm.markAllAsTouched();
      return;
    }

    this.authService.saveLanguage(this.languageForm.getRawValue()).subscribe({
      next: () => {
        this.router.navigate(['/placement-test']);
      },
      error: (error) => {
        this.error.set(
          error.error?.message ??
          'No se pudo guardar la selección.'
        );
      },
    });
  }
}