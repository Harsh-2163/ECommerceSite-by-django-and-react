# Generated by Django 4.0.1 on 2022-05-10 00:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0005_order_shippingaddress_orderitem'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
    ]
