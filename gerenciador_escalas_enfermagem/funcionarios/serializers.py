from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Vinculo, CategoriaProfissional, Funcionario


class VinculoSerializer(ModelSerializer):
    class Meta:
        model = Vinculo
        fields = ('id', 'nome', 'abreviacao')


class CategoriaProfissionalSerializer(ModelSerializer):
    class Meta:
        model = Vinculo
        fields = ('id', 'nome', 'abreviacao')


class FuncionarioSerializer(ModelSerializer):
    vinculo = VinculoSerializer()
    categoria = CategoriaProfissionalSerializer()

    class Meta:
        model = Funcionario
        fields = ('id', 'nome', 'rfre', 'coren', 'categoria', 'vinculo')
