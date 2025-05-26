from rest_framework import serializers
from .models import Tarea

class TareaSerializer(serializers.ModelSerializer):
    """
    Convierte el modelo Tarea a formato JSON y viceversa.
    """
    class Meta:
        model = Tarea
        fields = ['id', 'titulo', 'descripcion', 'sincronizado', 'fecha_creacion']
