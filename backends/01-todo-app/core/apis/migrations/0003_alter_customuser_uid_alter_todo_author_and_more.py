# Generated by Django 5.0.6 on 2024-06-17 16:16

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apis', '0002_alter_customuser_uid_todo'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='uid',
            field=models.UUIDField(default=uuid.UUID('48013211-a3d7-4dbb-8fbc-0e1ddd5b6298'), editable=False, primary_key=True, serialize=False, verbose_name='uid'),
        ),
        migrations.AlterField(
            model_name='todo',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='todos', to=settings.AUTH_USER_MODEL, verbose_name='author'),
        ),
        migrations.AlterField(
            model_name='todo',
            name='uid',
            field=models.UUIDField(default=uuid.UUID('760db1ec-acbc-4e8d-92d6-b872e914794e'), editable=False, primary_key=True, serialize=False, verbose_name='uid'),
        ),
    ]
