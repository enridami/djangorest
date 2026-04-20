from django.db import models
from django.core.exceptions import ValidationError

class Empleado(models.Model):
    idEmpleado = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    departamento = models.CharField(max_length=100)
    sueldo = models.DecimalField(max_digits=10, decimal_places=2)

    def clean(self):
        if self.sueldo <= 0:
            raise ValidationError("El sueldo debe ser mayor que 0")
        
    # Nombre exacto de la tabla
    class Meta:
        db_table = 'empleado'

    def __self__(self):
        return f'{self.idEmpleado} - {self.nombre}({self.departamento})'
    

