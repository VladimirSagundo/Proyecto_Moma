from django.db import models

class Actividades(models.Model):
    id_actividad = models.AutoField(primary_key=True)
    tipo = models.CharField(max_length=50)
    asunto = models.CharField(max_length=50)
    prioridad = models.CharField(max_length=50)
    persona_contacto = models.CharField(max_length=50)
    telefono = models.CharField(max_length=50)
    activo = models.IntegerField(default=1)

    class Meta:
        db_table = "actividades"