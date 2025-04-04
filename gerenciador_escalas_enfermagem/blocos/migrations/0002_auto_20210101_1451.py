# Generated by Django 3.1.4 on 2021-01-01 17:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('blocos', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bloco',
            name='nome',
            field=models.CharField(max_length=150),
        ),
        migrations.CreateModel(
            name='Unidade',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('nome', models.CharField(max_length=150)),
                ('bloco', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blocos.bloco')),
            ],
        ),
    ]
