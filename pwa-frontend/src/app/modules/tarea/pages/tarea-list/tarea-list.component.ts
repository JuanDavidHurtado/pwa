import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../../../core/services/tarea.service';
import { TareaOfflineService } from '../../../../core/services/tarea-offline.service';

import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Tarea } from '../../../../core/models/tarea.model';
import { TareaSyncStatusComponent } from '../tarea-sync-status/tarea-sync-status.component';

@Component({
  selector: 'app-tarea-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSortModule,
    TareaSyncStatusComponent
  ],
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.scss']
})
export class TareaListComponent implements OnInit, AfterViewInit {

  loading = true;

  tareasOnlineDataSource = new MatTableDataSource<Tarea>([]);
  tareasOfflineDataSource = new MatTableDataSource<Tarea>([]);

  displayedColumns: string[] = ['titulo', 'descripcion', 'fecha'];

  @ViewChild('onlineSort') onlineSort!: MatSort;
  @ViewChild('offlineSort') offlineSort!: MatSort;

  private onlineLoaded = false;
  private offlineLoaded = false;

  constructor(
    private tareaService: TareaService,
    private tareaOfflineService: TareaOfflineService
  ) { }

  ngAfterViewInit() {
    this.tareasOnlineDataSource.sort = this.onlineSort;
    this.tareasOfflineDataSource.sort = this.offlineSort;
  }

  cargarTareas() {
    this.loading = true;
    this.onlineLoaded = false;
    this.offlineLoaded = false;

    this.tareaService.getTareas().subscribe({
      next: (data: any) => {
        this.tareasOnlineDataSource.data = data as Tarea[];
        this.onlineLoaded = true;
        this.checkLoading();
      },
      error: (error) => {
        console.error('Error cargando tareas online', error);
        this.onlineLoaded = true;
        this.checkLoading();
      }
    });

    this.tareaOfflineService.listarPendientes().then(data => {
      this.tareasOfflineDataSource.data = data;
      this.offlineLoaded = true;
      this.checkLoading();
    });
  }

  ngOnInit() {
    this.cargarTareas();
  }

  private checkLoading() {
    if (this.onlineLoaded && this.offlineLoaded) {
      this.loading = false;
    }
  }

  onSincronizacionCompletada() {
    console.log('Sincronización completada, recargando lista online...');
    this.cargarTareas();
  }
}
