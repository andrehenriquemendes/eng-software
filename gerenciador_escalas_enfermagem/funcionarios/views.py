from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import Funcionario, Vinculo, CategoriaProfissional
from .serializers import FuncionarioSerializer, VinculoSerializer, CategoriaProfissionalSerializer

class FuncionarioViewSet(ModelViewSet):
    queryset = Funcionario.objects.all()
    serializer_class = FuncionarioSerializer


class VinculoViewSet(ModelViewSet):
    queryset = Vinculo.objects.all()
    serializer_class = VinculoSerializer


class CategoriaProfissionalViewSet(ModelViewSet):
    queryset = CategoriaProfissional.objects.all()
    serializer_class = CategoriaProfissionalSerializer
