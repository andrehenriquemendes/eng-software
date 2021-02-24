from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Escala, Ponto, PeriodoMes
from blocos.serializers import UnidadeSerializer
from funcionarios.serializers import FuncionarioSerializer

from blocos.models import Unidade


class PeriodoMesSerializer(ModelSerializer):

    class Meta:
        model = PeriodoMes
        fields = '__all__'


class EscalaListSerializer(ModelSerializer):
    unidade = UnidadeSerializer()
    funcionario = FuncionarioSerializer()
    periodo_mes = PeriodoMesSerializer()

    class Meta:
        model = Escala
        fields = '__all__'


class EscalaSerializer(ModelSerializer):

    class Meta:
        model = Escala
        fields = '__all__'


class UnidadeFuncionariosSerializer(ModelSerializer):
    funcionario = FuncionarioSerializer(many=True)

    class Meta:
        model = Unidade
        fields = ('id', 'nome', 'bloco', 'funcionario')


class DistribuicaoSerializer(ModelSerializer):
    funcionario = FuncionarioSerializer()
    unidade = UnidadeSerializer()

    class Meta:
        model = Escala
        fields = ('id', 'funcionario', 'unidade', 'horario_entrada', 'horario_saida', 'tipo_escala')


class EscalaPeriodoMesSerializer(ModelSerializer):
    escala_set = DistribuicaoSerializer(many=True)

    class Meta:
        model = PeriodoMes
        fields = ('id', 'data_inicio', 'data_fim', 'escala_set')


class PontoSerializer(ModelSerializer):

    class Meta:
        model = Ponto
        fields = '__all__'
    
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['funcionario'] = FuncionarioSerializer(instance.funcionario).data
       return ret