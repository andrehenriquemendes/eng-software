# Generated by Django 3.1.4 on 2021-01-24 23:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('funcionarios', '0003_auto_20210101_1536'),
        ('blocos', '0002_auto_20210101_1451'),
    ]

    operations = [
        migrations.CreateModel(
            name='PeriodoMes',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('data_inicio', models.DateField()),
                ('data_fim', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Ponto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('dia', models.DateField()),
                ('esta_presente', models.BooleanField(default=False)),
                ('funcionario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='funcionarios.funcionario')),
            ],
        ),
        migrations.CreateModel(
            name='Escala',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('horario_entrada', models.TimeField()),
                ('horario_saida', models.TimeField()),
                ('tipo_escala', models.CharField(choices=[('Enf Manhã e Tarde', 'Enf Manhã e Tarde'), ('6 Horas Manhã', '6 Horas Manhã'), ('6 Horas Tarde', '6 Horas Tarde'), ('DI', 'DI'), ('DII', 'DII'), ('SNI', 'SNI'), ('SNII', 'SNII')], max_length=100)),
                ('funcionario', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='funcionarios.funcionario')),
                ('periodo_mes', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='escalas.periodomes')),
                ('unidade', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='blocos.unidade')),
            ],
        ),
    ]
