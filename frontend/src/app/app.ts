import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly http = inject(HttpClient);

  protected readonly message = signal('Conectando con Laravel...');

  constructor() {
    this.http.get<{ message: string }>('http://localhost:8000/api/ping')
      .subscribe({
        next: (response) => {
          this.message.set(response.message);
        },
        error: () => {
          this.message.set('No se pudo conectar con Laravel');
        }
      });
  }
}