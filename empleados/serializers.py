from rest_framework import serializers
from .models import Empleado


class EmpleadoSerializer(serializers.ModelSerializer):
    idEmpleado = serializers.IntegerField(read_only=True)

    class Meta:
        model = Empleado
        fields = '__all__'

    def validate_sueldo(self, value):
        if value <= 0:
            raise serializers.ValidationError("El sueldo debe ser mayor que 0")
        return value
    
    def validate_nombre(self, value:str):
        v = (value or '').strip()
        if not v:
            raise serializers.ValidationError("El nombre es requerido")
        return v
    
    def validate_departamento(self, value:str):
        v = (value or '').strip()
        if not v:
            raise serializers.ValidationError("El departamento es requerido")
        return v