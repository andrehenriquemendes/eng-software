from django.db import models


class Vinculo(models.Model):
    nome = models.CharField(max_length=100)
    abreviacao = models.CharField(max_length=10)

    def __str__(self):
        return self.nome


class CategoriaProfissional(models.Model):
    nome = models.CharField(max_length=50)
    abreviacao = models.CharField(max_length=20)

    def __str__(self):
        return self.nome

    class Meta:
        verbose_name_plural = "Categorias Profissionais"


class Funcionario(models.Model):
    nome = models.CharField(max_length=100)
    vinculo = models.ForeignKey(Vinculo, on_delete=models.PROTECT)
    categoria = models.ForeignKey(CategoriaProfissional, on_delete=models.PROTECT)
    rfre = models.IntegerField()
    coren = models.IntegerField()

    def __str__(self):
        return self.nome
