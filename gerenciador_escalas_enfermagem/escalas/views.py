from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet

from .models import Escala, PeriodoMes, Ponto
from .serializers import EscalaSerializer, PeriodoMesSerializer, PontoSerializer

class EscalaViewSet(ModelViewSet):
    queryset = Escala.objects.all()
    serializer_class = EscalaSerializer


class PontoViewSet(ModelViewSet):
    queryset = Ponto.objects.all()
    serializer_class = PontoSerializer


class PeriodoMesViewSet(ModelViewSet):
    queryset = PeriodoMes.objects.all()
    serializer_class = PeriodoMesSerializer
