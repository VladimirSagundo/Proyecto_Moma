from django.db import models

class Producto(models.Model):
    id_producto = models.AutoField(primary_key=True)
    producto = models.CharField(max_length=100)

    class Meta:
        db_table = "producto"

class Plan(models.Model):
    id_plan = models.AutoField(primary_key=True)
    plan = models.CharField(max_length=100)

    class Meta:
        db_table = "plan"

class Contratante(models.Model):
    id_contratante = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=150)
    fecha_nacimiento = models.DateField(null=True, blank=True)
    correo = models.CharField(max_length=150, null=True, blank=True)
    no_celular = models.CharField(max_length=50, null=True, blank=True)

    class Meta:
        db_table = "contratante"

class Asegurado(models.Model):
    asegurado_id = models.AutoField(primary_key=True)
    nombre_completo = models.CharField(max_length=150)

    class Meta:
        db_table = "asegurado"

class MedioDeCobro(models.Model):
    id_medio_de_cobro = models.AutoField(primary_key=True)
    medio_de_cobro = models.CharField(max_length=100)

    class Meta:
        db_table = "medio_de_cobro"

class Aseguradora(models.Model):
    id_aseguradora = models.AutoField(primary_key=True)
    aseguradora = models.CharField(max_length=100)

    class Meta:
        db_table = "aseguradora"

class FormaDePago(models.Model):
    id_forma_de_pago = models.AutoField(primary_key=True)
    forma_de_pago = models.CharField(max_length=100)
    
    class Meta:
        db_table = "forma_de_pago" 


class Poliza(models.Model):
    id_poliza = models.AutoField(primary_key=True)

    aseguradora = models.ForeignKey(Aseguradora, on_delete=models.CASCADE)
    no_poliza = models.CharField(max_length=100)

    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)

    fecha_de_emision = models.DateField()
    fecha_de_vencimiento = models.DateField()

    contratante = models.ForeignKey(Contratante, on_delete=models.CASCADE)
    asegurado = models.ForeignKey(Asegurado, on_delete=models.CASCADE)

    medio_de_cobro = models.ForeignKey(MedioDeCobro, on_delete=models.CASCADE)
    
    forma_de_pago = models.ForeignKey(FormaDePago, on_delete=models.CASCADE, null=True)

    deducible = models.CharField(max_length=50)
    no_agente = models.CharField(max_length=50)

    activo = models.IntegerField()

    class Meta:
        db_table = "polizas"