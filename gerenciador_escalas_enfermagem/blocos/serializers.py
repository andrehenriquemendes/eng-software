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
