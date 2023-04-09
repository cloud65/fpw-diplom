from django.contrib import admin

from app.models import Reference, Machinery, Maintenance, Reclamation

admin.site.register(Reference)
admin.site.register(Machinery)
admin.site.register(Maintenance)
admin.site.register(Reclamation)
