import { Injectable } from '@angular/core';
import { openDB } from 'idb';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareaOfflineService {
  private dbPromise = openDB('tarea-db', 1, {
    upgrade(db) {
      db.createObjectStore('tareas', { keyPath: 'id', autoIncrement: true });
    },
  });

  async listarPendientes(): Promise<Tarea[]> {
    const db = await this.dbPromise;
    const all = await db.getAll('tareas');
    return all.filter(tarea => !tarea.sincronizado);
  }

  async guardarTarea(tarea: Tarea) {
    const db = await this.dbPromise;
    tarea.sincronizado = false;
    await db.put('tareas', tarea);
  }

  async marcarComoSincronizada(id: number) {
    const db = await this.dbPromise;
    const tarea = await db.get('tareas', id);
    if (tarea) {
      tarea.sincronizado = true;
      await db.put('tareas', tarea);
    }
  }

  async marcarComoNoSincronizada(id: number) {
    const db = await this.dbPromise;
    const tarea = await db.get('tareas', id);
    if (tarea) {
      tarea.sincronizado = false;
      await db.put('tareas', tarea);
    }
  }

  async eliminarTarea(id: number) {
    const db = await this.dbPromise;
    await db.delete('tareas', id);
  }


}
