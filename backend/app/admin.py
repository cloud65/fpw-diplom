from django.contrib import admin

from app.models import Reference, Machinery, Maintenance, Reclamation, UserProfile


class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'organization_name', 'group')

    def group(self, row):
        groups = []
        for group in row.user.groups.all():
            groups.append(group.name)
        return ' '.join(groups)


admin.site.register(UserProfile, ProfileAdmin)

admin.site.register(Reference)
admin.site.register(Machinery)
admin.site.register(Maintenance)
admin.site.register(Reclamation)
