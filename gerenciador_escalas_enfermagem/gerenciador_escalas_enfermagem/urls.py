"""gerenciador_escalas_enfermagem URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from blocos.views import BlocoViewSet, UnidadeViewSet
from funcionarios.views import FuncionarioViewSet, VinculoViewSet, CategoriaProfissionalViewSet
from escalas.views import EscalaViewSet, PontoViewSet
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)


router = routers.DefaultRouter()
router.register(r'bloco', BlocoViewSet, basename='bloco')
router.register(r'unidade', UnidadeViewSet, basename='unidade')

router.register(r'funcionario', FuncionarioViewSet, basename='funcionario')
router.register(r'vinculo', VinculoViewSet, basename='vinculo')
router.register(r'categoria-profissional', CategoriaProfissionalViewSet, basename='categoria-profissional')

router.register(r'escala', EscalaViewSet, basename='escala')
router.register(r'ponto', PontoViewSet, basename='ponto')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify')
]
