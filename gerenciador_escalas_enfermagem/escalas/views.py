from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import mixins, status



from .models import Escala, Ponto, PeriodoMes
from .serializers import EscalaSerializer, EscalaListSerializer, PontoSerializer, EscalaPeriodoMesSerializer

class EscalaViewSet(ModelViewSet, mixins.CreateModelMixin, mixins.ListModelMixin):
    queryset = Escala.objects.all()
    serializer_class = EscalaSerializer

    def list(self, request, *args, **kwargs):
        queryset = PeriodoMes.objects.all()
        serializer = EscalaPeriodoMesSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


    def create(self, request, *args, **kwargs):
        data = request.data
        periodo_inicio = data.get('periodo')['inicio']
        periodo_fim = data.get('periodo')['final']

        periodo_mes = PeriodoMes.objects.create(
            data_inicio=periodo_inicio,
            data_fim=periodo_fim
        )

        lista_escalas = []
        for distribuicao in data.get('distribuicao'):
            unidade = distribuicao.get('unidade')

            for funcionario in distribuicao.get('funcionarios'):
                escala = Escala(
                    funcionario_id=funcionario['id'],
                    unidade_id=unidade,
                    horario_entrada=funcionario['horario_entrada'],
                    horario_saida=funcionario['horario_saida'],
                    periodo_mes=periodo_mes
                )
                lista_escalas.append(escala)
        
        Escala.objects.bulk_create(lista_escalas)

        queryset = PeriodoMes.objects.filter(id=periodo_mes.id)
        serializer = EscalaPeriodoMesSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class PontoViewSet(ModelViewSet):
    queryset = Ponto.objects.all()
    serializer_class = PontoSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        lista_presenca = []
        for instancia in data:
            ponto = Ponto(
                funcionario_id=instancia['funcionario'],
                esta_presente=instancia['estapresente'],
                dia=instancia['dia']
            )
            lista_presenca.append(ponto)
        
        Ponto.objects.bulk_create(lista_presenca)

        queryset = Ponto.objects.all()
        serializer = PontoSerializer(queryset, many=True)

        return Response(serializer.data, status=status.HTTP_201_CREATED)