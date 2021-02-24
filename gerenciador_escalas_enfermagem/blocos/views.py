from rest_framework.viewsets import ModelViewSet
from .models import Bloco, Unidade
from .serializers import BlocoSerializer, UnidadeSerializer


class BlocoViewSet(ModelViewSet):
    queryset = Bloco.objects.all()
    serializer_class = BlocoSerializer

class UnidadeViewSet(ModelViewSet):
    queryset = Unidade.objects.all()
    serializer_class = UnidadeSerializer