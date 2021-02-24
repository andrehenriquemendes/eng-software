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

    class Meta:
        model = Funcionario
        fields = ('id', 'nome', 'rfre', 'coren', 'categoria', 'vinculo')
    
    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['vinculo'] = VinculoSerializer(instance.vinculo).data
       ret['categoria'] = CategoriaProfissionalSerializer(instance.categoria).data
       return ret
