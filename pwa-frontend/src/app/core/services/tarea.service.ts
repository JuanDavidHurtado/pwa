import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TareaService {
  private apiUrl = environment.apiBaseUrl + 'tareas/';

  constructor(private http: HttpClient) {}

  getTareas() {
    return this.http.get(this.apiUrl);
  }

  crearTarea(tarea: any) {
    return this.http.post(this.apiUrl, tarea);
  }

  actualizarTarea(id: number, data: any) {
    return this.http.patch(`${this.apiUrl}${id}/`, data);
  }
}
