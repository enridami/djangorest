from rest_framework import generics
from .models import Empleado
from .serializers import EmpleadoSerializer


"""Encargada de listar y crear objetos de tipo Empleado"""
class EmpleadoListCreateView(generics.ListCreateAPIView):
    queryset = Empleado.objects.all().order_by('idEmpleado')
    serializer_class = EmpleadoSerializer


"""Encargada de recuperar, actualizar o eliminar un empleado en particular"""
class EmpleadoRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Empleado.objects.all()
    serializer_class = EmpleadoSerializer
    lookup_field = 'idEmpleado'