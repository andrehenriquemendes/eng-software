from rest_framework.viewsets import ModelViewSet
from .models import Bloco, Unidade
from .serializers import BlocoSerializer, UnidadeSerializer


class BlocoViewSet(ModelViewSet):
    queryset = Bloco.objects.all()
    serializer_class = BlocoSerializer

    def get_serializer_class(self):
        if self.action == 'list':
            return serializers.ListaGruppi
        if self.action == 'retrieve':
            return serializers.DettaglioGruppi
        return serializers.Default

class UnidadeViewSet(ModelViewSet):
    queryset = Unidade.objects.all()
    serializer_class = UnidadeSerializer