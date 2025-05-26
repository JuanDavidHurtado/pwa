import { Routes } from '@angular/router';
import { TareaListComponent } from './modules/tarea/pages/tarea-list/tarea-list.component';
import { TareaFormComponent } from './modules/tarea/pages/tarea-form/tarea-form.component';

export const routes: Routes = [
    { path: '', redirectTo: 'tareas', pathMatch: 'full' },
    { path: 'tareas', component: TareaListComponent },
    { path: 'tareas/crear', component: TareaFormComponent },
    { path: '**', redirectTo: 'tareas' }
];
