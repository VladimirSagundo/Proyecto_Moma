from rest_framework import serializers
from .models import (
    Aseguradora, Producto, Plan,
    MedioDeCobro, FormaDePago
)

class AseguradoraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Aseguradora
        fields = ["id_aseguradora", "aseguradora"]


class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = ["id_producto", "producto"]


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = ["id_plan", "plan"]


class MedioDeCobroSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedioDeCobro
        fields = ["id_medio_de_cobro", "medio_de_cobro"]


class FormaDePagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormaDePago
        fields = ["id_forma_de_pago", "forma_de_pago"]
