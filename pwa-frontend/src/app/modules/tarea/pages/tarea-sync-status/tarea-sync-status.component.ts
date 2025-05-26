import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { TareaOfflineService } from '../../../../core/services/tarea-offline.service';
import { TareaService } from '../../../../core/services/tarea.service';

@Component({
  selector: 'app-tarea-sync-status',
  standalone: true,
  template: `{{ online ? 'Online' : 'Offline' }}`
})
export class TareaSyncStatusComponent implements OnInit {
  online = navigator.onLine;
  private sincronizando = false;
  private debounceTimer: any = null;

  @Output() sincronizacionCompletada = new EventEmitter<void>();

  constructor(
    private tareaOfflineService: TareaOfflineService,
    private tareaService: TareaService
  ) { }

  ngOnInit() {
    window.addEventListener('online', this.onlineHandler);
    window.addEventListener('offline', () => {
      this.online = false;
    });

    if (this.online) {
      this.handleReconnect();
    }
  }

  ngOnDestroy() {
    window.removeEventListener('online', this.onlineHandler);
  }

  private onlineHandler = () => {
    this.online = true;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
      this.handleReconnect();
    }, 500);
  };

  async handleReconnect() {
    if (this.sincronizando) return;
    this.sincronizando = true;

    try {
      const pendientes = await this.tareaOfflineService.listarPendientes();

      for (let tarea of pendientes) {
        
        //await this.tareaOfflineService.marcarComoSincronizada(tarea.id!);

        try {
          tarea.sincronizado = true;
          await firstValueFrom(this.tareaService.crearTarea(tarea));
          await this.tareaOfflineService.marcarComoSincronizada(tarea.id!);
          await this.tareaOfflineService.eliminarTarea(tarea.id!);
        } catch (e) {
          // Si falla, vuelve a marcar como no sincronizada
          await this.tareaOfflineService.marcarComoNoSincronizada?.(tarea.id!);
          console.error('Error sincronizando tarea', tarea, e);
        }
      }

      this.sincronizacionCompletada.emit();
    } finally {
      this.sincronizando = false;
    }
  }
}
