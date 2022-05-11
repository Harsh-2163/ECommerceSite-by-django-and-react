from dataclasses import field
from rest_framework.serializers import ModelSerializer
from .models import *

class CustomerSerializer(ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class ProductSerializer(ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(ModelSerializer):
    class Meta:
        model = Order
        fields = '__all__'

class OrderItemSerializer(ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'

class ShippingAddressSerializer(ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = '__all__'

