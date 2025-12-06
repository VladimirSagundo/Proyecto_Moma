from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Usuario
from .models import HistorialAccesos
from .serializers import HistorialAccesosSerializer


class LoginView(APIView):
    def post(self, request):
        correo = request.data.get("correo")
        contrasenia = request.data.get("contrasenia")

        # Obtener IP y navegador
        ip = request.META.get("REMOTE_ADDR")
        user_agent = request.META.get("HTTP_USER_AGENT", "desconocido")

        try:
            usuario = Usuario.objects.get(CORREO=correo, CONTRASENIA=contrasenia)

            HistorialAccesos.objects.create(
                tipo_acceso="Inicio de sesión",
                resultado="Acceso permitido",
                dispositivo_navegador=user_agent,
                direccion_ip=ip
            )

            return Response({"message": "Login correcto"}, status=status.HTTP_200_OK)

        except Usuario.DoesNotExist:

            HistorialAccesos.objects.create(
                tipo_acceso="Inicio de sesión",
                resultado="Acceso bloqueado",
                dispositivo_navegador=user_agent,
                direccion_ip=ip
            )

            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_400_BAD_REQUEST)

class HistorialAccesosView(APIView):
    def get(self, request):
        registros = HistorialAccesos.objects.all()
        serializer = HistorialAccesosSerializer(registros, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)