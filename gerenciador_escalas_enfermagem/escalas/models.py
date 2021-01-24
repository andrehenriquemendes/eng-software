from django.db import models
from blocos.models import Unidade
from funcionarios.models import Funcionario


class PeriodoMes(models.Model):
    data_inicio = models.DateField()
    data_fim = models.DateField()

    def __str__(self):
        return f'Início: {self.data_inicio} - Fim: {self.data_fim}'

    class Meta:
        verbose_name_plural = "Períodos do Mês"


class Ponto(models.Model):
    funcionario = models.ForeignKey(Funcionario, on_delete=models.PROTECT)
    dia = models.DateField()
    esta_presente = models.BooleanField(default=False)


class Escala(models.Model):
    TIPOS_ESCALAS = (
        ('Enf Manhã e Tarde', 'Enf Manhã e Tarde'),
        ('6 Horas Manhã', '6 Horas Manhã'),
        ('6 Horas Tarde', '6 Horas Tarde'),
        ('DI', 'DI'),
        ('DII', 'DII'),
        ('SNI', 'SNI'),
        ('SNII', 'SNII'),
    )

    unidade = models.ForeignKey(Unidade, on_delete=models.PROTECT)
    funcionario = models.ForeignKey(Funcionario, on_delete=models.PROTECT)
    horario_entrada = models.TimeField()
    horario_saida = models.TimeField()
    tipo_escala = models.CharField(choices=TIPOS_ESCALAS, max_length=100)
    periodo_mes = models.ForeignKey(PeriodoMes, on_delete=models.PROTECT)

    def __str__(self):
        return self.nome
