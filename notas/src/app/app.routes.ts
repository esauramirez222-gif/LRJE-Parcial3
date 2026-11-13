import { Routes } from '@angular/router';
import { NotasPage } from './pages/notas-page/notas-page';

export const routes: Routes = [
    {path: '', redirectTo: 'notas', pathMatch: 'full'},
    {path: 'notas', component: NotasPage},
    {path: '**', redirectTo: 'notas'},
];
