import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TareaService } from '../../../../core/services/tarea.service';
import { TareaOfflineService } from '../../../../core/services/tarea-offline.service';
import { Tarea } from '../../../../core/models/tarea.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-tarea-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tarea-form.component.html',
  styleUrls: ['./tarea-form.component.scss']
})
export class TareaFormComponent {
  tareaForm: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private tareaService: TareaService,
    private tareaOfflineService: TareaOfflineService
  ) {
    this.tareaForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  async submit() {
    if (this.tareaForm.invalid) {
      this.tareaForm.markAllAsTouched();
      this.message = 'Por favor complete el formulario correctamente.';
      return;
    }

    this.loading = true;

    const baseTarea = {
      ...this.tareaForm.value,
      fecha: new Date().toISOString()
    };

    try {
      const tareaOnline: Tarea = {
        ...baseTarea,
        sincronizado: true
      };
      await firstValueFrom(this.tareaService.crearTarea(tareaOnline));
      this.message = 'Tarea creada y sincronizada online.';
    } catch (error) {
      const tareaOffline: Tarea = {
        ...baseTarea,
        sincronizado: false
      };

      console.log('Guardando tarea offline:', tareaOffline);

      await this.tareaOfflineService.guardarTarea(tareaOffline);
      this.message = 'Sin conexión: tarea guardada localmente para sincronización futura.';
    } finally {
      this.tareaForm.reset();
      this.tareaForm.markAsUntouched();
      this.tareaForm.markAsPristine();
      Object.keys(this.tareaForm.controls).forEach(key => {
        this.tareaForm.get(key)?.setErrors(null);
      });
      this.loading = false;
    }
  }
}
