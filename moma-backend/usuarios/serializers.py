from rest_framework import serializers
from .models import HistorialAccesos

class HistorialAccesosSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistorialAccesos
        fields = "__all__"