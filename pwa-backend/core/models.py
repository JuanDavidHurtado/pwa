from django.db import models

class Tarea(models.Model):
    """
    Modelo que representa una Tarea sincronizable.
    - titulo: título de la tarea.
    - descripcion: detalles o descripción adicional.
    - sincronizado: indica si ha sido sincronizado con el backend.
    - fecha_creacion: marca temporal de cuando fue creada.
    """
    titulo = models.CharField(max_length=255)
    descripcion = models.TextField(blank=True)
    sincronizado = models.BooleanField(default=False)
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.titulo} - {"✓" if self.sincronizado else "Pendiente"}'
