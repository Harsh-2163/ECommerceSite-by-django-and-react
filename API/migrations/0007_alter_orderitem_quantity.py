# Generated by Django 4.0.1 on 2022-05-10 00:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0006_alter_product_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='orderitem',
            name='quantity',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]