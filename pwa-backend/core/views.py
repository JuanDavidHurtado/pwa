from rest_framework import viewsets
from .models import Tarea
from .serializers import TareaSerializer

class TareaViewSet(viewsets.ModelViewSet):
    """
    Vista basada en ViewSet para exponer la API REST de tareas.
    Permite listar, crear, actualizar y eliminar tareas.
    """
    queryset = Tarea.objects.all().order_by('-fecha_creacion')
    serializer_class = TareaSerializer
