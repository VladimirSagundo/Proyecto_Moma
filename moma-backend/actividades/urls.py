from django.urls import path
from .views import ActividadesListView, EliminarActividadLogico, EditarActividadView

urlpatterns = [
    # Ruta principal para listar y crear
    path('actividades/', ActividadesListView.as_view(), name='actividades-list'),
    path('actividades/eliminar/<int:pk>/', EliminarActividadLogico.as_view(), name='eliminar-actividad'),
    path('actividades/editar/<int:pk>/', EditarActividadView.as_view(), name='editar-actividad'),
]