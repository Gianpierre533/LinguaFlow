import { Routes } from '@angular/router';

import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { Dashboard } from './features/dashboard/dashboard';
import { LanguageSelection } from './features/language-selection/language-selection';
import { Landing } from './features/landing/landing';
import { authGuard } from './core/guards/auth-guard';
import { PlacementTest } from './features/placement-test/placement-test';

export const routes: Routes = [
  {
    path: '',
    component: Landing
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'login',
    component: Login
  },
  {
    path: 'language-selection',
    component: LanguageSelection,
    canActivate: [authGuard]
  },
  {
  path: 'placement-test',
  component: PlacementTest,
  canActivate: [authGuard]
},
  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  }
];