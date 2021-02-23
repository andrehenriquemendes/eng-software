from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from .models import Vinculo, CategoriaProfissional, Funcionario

admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.site_header = 'Gerenciamento de Escalas de Enfermagem'
admin.site.register(Vinculo)
admin.site.register(CategoriaProfissional)
admin.site.register(Funcionario)
