# Pólizas Backend Jesús

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404

from .models import (
    Poliza, Producto, Plan, Contratante, 
    Asegurado, Aseguradora, MedioDeCobro, FormaDePago
)
from .serializers import (
    AseguradoraSerializer, ProductoSerializer, PlanSerializer,
    MedioDeCobroSerializer, FormaDePagoSerializer
)

class PolizasPorAseguradora(APIView):
    def get(self, request, aseguradora_id):

        polizas = Poliza.objects.filter(
            aseguradora_id=aseguradora_id,
            activo=1
        ).select_related(
            "producto", 
            "plan", 
            "contratante", 
            "asegurado", 
            "medio_de_cobro", 
            "forma_de_pago" 
        )

        data = []
        for p in polizas:
            nombre_forma_pago = p.forma_de_pago.forma_de_pago if p.forma_de_pago else "N/A"

            data.append({
                "id_poliza": p.id_poliza,
                "no_poliza": p.no_poliza,
                "producto": p.producto.producto,
                "plan": p.plan.plan,
                
                "fecha_de_emision": p.fecha_de_emision,
                "fecha_de_vencimiento": p.fecha_de_vencimiento,

                "contratante": p.contratante.nombre_completo,
                "correo": p.contratante.correo,           
                "telefono": p.contratante.no_celular,     
                "fecha_nacimiento_contratante": p.contratante.fecha_nacimiento,
                "asegurado": p.asegurado.nombre_completo,
                "medio_de_cobro": p.medio_de_cobro.medio_de_cobro,
                "forma_de_pago": nombre_forma_pago,
                "deducible": p.deducible,
                "no_agente": p.no_agente
            })

        return Response(data, status=status.HTTP_200_OK)

class CrearPolizaView(APIView):
    def post(self, request):
        data = request.data

        try:
            aseguradora = Aseguradora.objects.get(pk=data["aseguradora_id"])
            plan = Plan.objects.get(pk=data["plan_id"])
            producto = Producto.objects.get(pk=data["producto_id"])
            medio_cobro = MedioDeCobro.objects.get(pk=data["medio_cobro_id"])
            forma_pago = FormaDePago.objects.get(pk=data["forma_pago_id"])

            fecha_nac = data.get("fecha_de_nacimiento") 
            if fecha_nac == "": 
                fecha_nac = None

            contratante = Contratante.objects.create(
                nombre_completo=data["contratante"],
                fecha_nacimiento=fecha_nac,
                correo=data["correo"],
                no_celular=data["telefono"]
            )

            asegurado = Asegurado.objects.create(
                nombre_completo=data["asegurado"]
            )

            Poliza.objects.create(
                aseguradora=aseguradora,
                producto=producto,
                plan=plan,
                medio_de_cobro=medio_cobro,
                forma_de_pago=forma_pago,
                
                no_poliza=data["numero_poliza"],
                fecha_de_emision=data["fecha_de_emision"],
                fecha_de_vencimiento=data["fecha_de_vencimiento"],
                
                contratante=contratante,
                asegurado=asegurado,
                deducible=data["deducible"],
                no_agente=data["numero_agente"],
                activo=1
            )

            return Response(
                {"mensaje": "Póliza creada correctamente"},
                status=status.HTTP_201_CREATED
            )

        except KeyError as e:
            return Response({"error": f"Falta el campo: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class AseguradorasListView(ListAPIView):
    queryset = Aseguradora.objects.all()
    serializer_class = AseguradoraSerializer


class ProductosListView(ListAPIView):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class PlanesListView(ListAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer


class MediosCobroListView(ListAPIView):
    queryset = MedioDeCobro.objects.all()
    serializer_class = MedioDeCobroSerializer


class FormasPagoListView(ListAPIView):
    queryset = FormaDePago.objects.all()
    serializer_class = FormaDePagoSerializer


class EliminarPolizaLogico(APIView):
    def patch(self, request, pk):
        try:
            poliza = Poliza.objects.get(pk=pk)
            
            poliza.activo = 0 
            poliza.save()

            return Response(
                {"mensaje": "Póliza desactivada correctamente"}, 
                status=status.HTTP_200_OK
            )
        except Poliza.DoesNotExist:
            return Response(
                {"error": "La póliza no existe"},
                status=status.HTTP_404_NOT_FOUND
            )

class EditarPolizaView(APIView):
    def put(self, request, pk):
        data = request.data
        try:
            poliza = Poliza.objects.get(pk=pk)
            
            if "no_poliza" in data: poliza.no_poliza = data["no_poliza"]
            if "deducible" in data: poliza.deducible = data["deducible"]
            if "no_agente" in data: poliza.no_agente = data["no_agente"]
            
            if "fecha_de_emision" in data: poliza.fecha_de_emision = data["fecha_de_emision"]
            if "fecha_de_vencimiento" in data: poliza.fecha_de_vencimiento = data["fecha_de_vencimiento"]

            poliza.save()
            return Response({"mensaje": "Póliza actualizada"}, status=status.HTTP_200_OK)
            
        except Poliza.DoesNotExist:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class EditarPolizaView(APIView):
    def put(self, request, pk):
        data = request.data
        try:
            poliza = Poliza.objects.get(pk=pk)

            if "no_poliza" in data: poliza.no_poliza = data["no_poliza"]
            if "deducible" in data: poliza.deducible = data["deducible"]
            if "no_agente" in data: poliza.no_agente = data["no_agente"]
            if "fecha_de_emision" in data and data["fecha_de_emision"]: 
                poliza.fecha_de_emision = data["fecha_de_emision"]
            if "fecha_de_vencimiento" in data and data["fecha_de_vencimiento"]: 
                poliza.fecha_de_vencimiento = data["fecha_de_vencimiento"]

            contratante = poliza.contratante
            cambios_contratante = False
            if "contratante" in data: 
                contratante.nombre_completo = data["contratante"]
                cambios_contratante = True
            if "correo" in data: 
                contratante.correo = data["correo"]
                cambios_contratante = True
            if "telefono" in data: 
                contratante.no_celular = data["telefono"]
                cambios_contratante = True
            
            if cambios_contratante:
                contratante.save()

            if "asegurado" in data:
                asegurado = poliza.asegurado
                asegurado.nombre_completo = data["asegurado"]
                asegurado.save()

            poliza.save()
            return Response({"mensaje": "Póliza actualizada"}, status=status.HTTP_200_OK)

        except Poliza.DoesNotExist:
            return Response({"error": "No encontrada"}, status=status.HTTP_404_NOT_FOUND)