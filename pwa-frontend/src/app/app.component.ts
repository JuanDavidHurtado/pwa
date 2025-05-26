import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="main-nav">
      <a routerLink="/tareas" routerLinkActive="active-link" [routerLinkActiveOptions]="{exact: true}">Tareas</a>
      <a routerLink="/tareas/crear" routerLinkActive="active-link">Crear Tarea</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pwa-frontend';
}
