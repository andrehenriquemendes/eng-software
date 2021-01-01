# Generated by Django 3.1.4 on 2021-01-01 18:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('funcionarios', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='categoriaprofissional',
            options={'verbose_name_plural': 'Categorias Profissionais'},
        ),
        migrations.RenameField(
            model_name='categoriaprofissional',
            old_name='codigo',
            new_name='abreviacao',
        ),
        migrations.RenameField(
            model_name='vinculo',
            old_name='codigo',
            new_name='abreviacao',
        ),
        migrations.AddField(
            model_name='vinculo',
            name='nome',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
