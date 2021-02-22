from django.db import models


class Bloco(models.Model):
    nome = models.CharField(max_length=150)

    def __str__(self):
        return self.nome


class Unidade(models.Model):
    nome = models.CharField(max_length=150)
    bloco = models.ForeignKey(Bloco, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome
