from django.urls import path
from .views import LoginView
from .views import HistorialAccesosView

urlpatterns = [
    path('login/', LoginView.as_view()),
    path('historial-accesos/', HistorialAccesosView.as_view()),
]
