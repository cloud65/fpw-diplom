# Generated by Django 4.2 on 2023-04-11 07:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='reclamation',
            name='service',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, related_name='reclamations', to=settings.AUTH_USER_MODEL, verbose_name='Сервисная компания'),
        ),
    ]