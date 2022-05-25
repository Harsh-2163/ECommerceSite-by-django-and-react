from statistics import mode
from django.db import models
from django.contrib.auth.models import User
from django.forms import ImageField
# Create your models here.

class Customer(models.Model):
    email = models.EmailField(max_length=200)
    name = models.CharField(max_length=200,unique=True)
    password = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=200,unique=True)
    price = models.FloatField()
    image = models.ImageField(null=True,blank=True)

class Order(models.Model):
    customer = models.ForeignKey(Customer,on_delete=models.SET_NULL,null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete =models.BooleanField(default=False)
    transaction_id = models.CharField(max_length=200,null=True)

    @property
    def get_cart_total(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.get_total for item in orderitems])
        return total

    @property
    def get_cart_items(self):
        orderitems = self.orderitem_set.all()
        total = sum([item.quantity for item in orderitems])
        return total

class OrderItem(models.Model):
    order = models.ForeignKey(Order,on_delete=models.SET_NULL,null=True)
    product = models.ForeignKey(Product,on_delete=models.SET_NULL,null=True)
    quantity = models.IntegerField(default=0,null=True,blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self):
        total = ((self.product.price)*(self.quantity))
        return total

class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL,null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL,null=True)
    address = models.CharField(max_length=200,null=True)
    city = models.CharField(max_length=200,null=True)
    state = models.CharField(max_length=200,null=True)
    zip_code = models.CharField(max_length=200,null=True)
    date_added = models.DateTimeField(auto_now_add=True)
    