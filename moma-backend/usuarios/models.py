from django.db import models

class Usuario(models.Model):
    ID = models.AutoField(primary_key=True)
    CORREO = models.CharField(max_length=75)
    CONTRASENIA = models.CharField(max_length=50)

    class Meta:
        db_table = 'usuarios'


class HistorialAccesos(models.Model):
    id_acceso = models.AutoField(primary_key=True)
    fecha_hora = models.DateTimeField(auto_now_add=True)
    tipo_acceso = models.CharField(max_length=50)
    resultado = models.CharField(max_length=50)
    dispositivo_navegador = models.CharField(max_length=255)
    direccion_ip = models.GenericIPAddressField()

    class Meta:
        db_table = 'historial_accesos'
    
