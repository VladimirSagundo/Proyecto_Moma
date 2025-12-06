from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from .models import Actividades
#Actividades Vladimir
class ActividadesListView(APIView):
    def get(self, request):
        # FILTRO IMPORTANTE: Solo traemos las actividades con activo=1
        actividades = Actividades.objects.filter(activo=1)

        datos = []
        for act in actividades:
            datos.append({
                "id_actividades": act.id_actividad,
                "tipo": act.tipo,
                "asunto": act.asunto,
                "prioridad": act.prioridad,
                "personaContacto": act.persona_contacto,
                "telefono": act.telefono,
            })
        return Response(datos, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        try:
            nueva = Actividades.objects.create(
                tipo=data.get("tipo"),
                asunto=data.get("asunto"),
                prioridad=data.get("prioridad"),
                persona_contacto=data.get("personaContacto"),
                telefono=data.get("telefono"),
                activo=1 # Se crea activa por defecto
            )
            return Response({"mensaje": "Creada", "id": nueva.id_actividad}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

class EliminarActividadLogico(APIView):
    def patch(self, request, pk):
        try:
            actividad = Actividades.objects.get(pk=pk)
            actividad.activo = 0 # Borrado lógico (no se elimina de la BD)
            actividad.save()
            return Response({"mensaje": "Eliminada lógicamente"}, status=status.HTTP_200_OK)
        except Actividades.DoesNotExist:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)

class EditarActividadView(APIView):
    def put(self, request, pk):
        data = request.data
        try:
            act = Actividades.objects.get(pk=pk)
            
            # Actualizamos campo por campo si viene en la petición
            if "tipo" in data: act.tipo = data["tipo"]
            if "asunto" in data: act.asunto = data["asunto"]
            if "prioridad" in data: act.prioridad = data["prioridad"]
            if "personaContacto" in data: act.persona_contacto = data["personaContacto"]
            if "telefono" in data: act.telefono = data["telefono"]
            
            act.save()
            return Response({"mensaje": "Actualizada"}, status=status.HTTP_200_OK)
        except Actividades.DoesNotExist:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)