from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Escala, Ponto, PeriodoMes
from blocos.serializers import UnidadeSerializer
from funcionarios.serializers import FuncionarioSerializer

class PeriodoMesSerializer(ModelSerializer):

    class Meta:
        model = PeriodoMes
        fields = '__all__'


class PontoSerializer(ModelSerializer):

    class Meta:
        model = Ponto
        fields = '__all__'


class EscalaSerializer(ModelSerializer):
    unidade = UnidadeSerializer()
    funcionario = FuncionarioSerializer()
    periodo_mes = PeriodoMesSerializer()

    class Meta:
        model = Escala
        fields = '__all__'


