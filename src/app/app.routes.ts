import { Routes } from '@angular/router';
// import { RequirementEntryComponent } from './features/budget/pages/requirement-entry/requirement-entry.component';

export const routes: Routes = [
  {
    path: 'budget',
    loadChildren: () => import('./features/budget/budget.routes'),
  },
];
