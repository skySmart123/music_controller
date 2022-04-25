# Generated by Django 4.0.4 on 2022-04-24 07:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_alter_room_guest_can_pause'),
    ]

    operations = [
        migrations.AlterField(
            model_name='room',
            name='guest_can_pause',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='room',
            name='votes_to_skip',
            field=models.IntegerField(default=1),
        ),
    ]