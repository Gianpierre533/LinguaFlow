import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
  
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface LanguageData {
  language: string;
  level: string;
}

export interface AuthResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  token: string;
}

export interface LanguageResponse {
  message: string;
  user_language: {
    id: number;
    user_id: number;
    language: string;
    level: string;
  };
}
export interface PlacementAnswer {
  question_id: number;
  selected_answer: number;
}

export interface PlacementAssessmentData {
  language: string;
  selected_level: string;
  answers: PlacementAnswer[];
}

export interface PlacementAssessmentResponse {
  message: string;
  assessment: {
    id: number;
    language: string;
    selected_level: string;
    estimated_level: string;
    score: number;
    total_questions: number;
    answers: PlacementAnswer[];
    completed_at: string;
  };
}
export interface PlacementQuestion {
  id: number;
  language: string;
  level: string;
  category: string;
  question: string;
  options: string[];
  explanation: string | null;
}

export interface PlacementQuestionsResponse {
  questions: PlacementQuestion[];
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = 'http://localhost:8000/api';

  private readonly tokenKey = 'linguaflow_token';

  private readonly languageKey = 'linguaflow_language';

 private readonly levelKey = 'linguaflow_level'; 

  constructor(private readonly http: HttpClient) {}

  register(data: RegisterData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  login(data: LoginData): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data)
      .pipe(tap((response) => this.saveToken(response.token)));
  }

  saveLanguage(data: LanguageData): Observable<LanguageResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`
  });

  return this.http
    .post<LanguageResponse>(
      `${this.apiUrl}/user-languages`,
      data,
      { headers }
    )
    .pipe(
      tap(() => {
        localStorage.setItem(this.languageKey, data.language);
        localStorage.setItem(this.levelKey, data.level);
      })
    );
}
savePlacementAssessment(
  data: PlacementAssessmentData
): Observable<PlacementAssessmentResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`
  });

  return this.http.post<PlacementAssessmentResponse>(
    `${this.apiUrl}/placement-assessments`,
    data,
    { headers }
  );
}
getPlacementQuestions(
  language: string,
  level: string
): Observable<PlacementQuestionsResponse> {
  const headers = new HttpHeaders({
    Authorization: `Bearer ${this.getToken()}`
  });

  return this.http.get<PlacementQuestionsResponse>(
    `${this.apiUrl}/placement-questions`,
    {
      headers,
      params: {
        language,
        level,
      },
    }
  );
}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  getSelectedLanguage(): string | null {
  return localStorage.getItem(this.languageKey);
}

getSelectedLevel(): string | null {
  return localStorage.getItem(this.levelKey);
}

  logout(): void {
  localStorage.removeItem(this.tokenKey);
  localStorage.removeItem(this.languageKey);
  localStorage.removeItem(this.levelKey);
}

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}
