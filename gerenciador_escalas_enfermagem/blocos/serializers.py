from rest_framework.fields import SerializerMethodField
from rest_framework.serializers import ModelSerializer
from .models import Bloco, Unidade


class BlocoSerializer(ModelSerializer):
    class Meta:
        model = Bloco
        fields = ('id', 'nome')
        


class UnidadeSerializer(ModelSerializer):

    class Meta:
        model = Unidade
        fields = ('id', 'nome', 'bloco')

    def to_representation(self, instance):
       ret = super().to_representation(instance)
       ret['bloco'] = BlocoSerializer(instance.bloco).data
       return ret
