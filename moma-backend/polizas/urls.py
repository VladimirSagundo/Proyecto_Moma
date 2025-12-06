from django.urls import path
from .views import (
    PolizasPorAseguradora,
    CrearPolizaView,
    AseguradorasListView,
    ProductosListView,
    PlanesListView,
    MediosCobroListView,
    FormasPagoListView,
    EliminarPolizaLogico,
    EditarPolizaView
)

urlpatterns = [
    path("aseguradoras/", AseguradorasListView.as_view()),
    path("productos/", ProductosListView.as_view()),
    path("planes/", PlanesListView.as_view()),
    path("medios-cobro/", MediosCobroListView.as_view()),
    path("formas-pago/", FormasPagoListView.as_view()),

    path("crear-poliza/", CrearPolizaView.as_view()),
    path("por-aseguradora/<int:aseguradora_id>/", PolizasPorAseguradora.as_view()),
    path('eliminar/<int:pk>/', EliminarPolizaLogico.as_view(), name='eliminar_poliza'),
    path('editar/<int:pk>/', EditarPolizaView.as_view(), name='editar_poliza'),
]