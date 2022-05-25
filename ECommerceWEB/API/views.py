from http.client import OK
from os import stat
from sqlite3 import complete_statement
from django.shortcuts import render
from numpy import apply_over_axes, product
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
from .models import *
import datetime

# Create your views here.

## GET ROUTES
@api_view(['GET'])
def getRoutes(request):

    routes = [
        {
            'Endpoint': '/getRoutes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an list of routes'
        },
        {
            'Endpoint': '/signup/',
            'method': 'POST',
            'body': 'USER DETAILS',
            'description': 'Registers user'
        },
        {
            'Endpoint': '/login/',
            'method': 'POST',
            'body': 'USER DETAILS',
            'description': 'Login user into system'
        },
        {
            'Endpoint':'/getProductsList/',
            'method':'POST',
            'body':'USERNAME',
            'description':'Retuns list of products'
        },
        {
            'Endpoint':'/addToCart/',
            'method':'POST',
            'body':'USERNAME, DATA',
            'description':'ADDS ITEM IN CART'
        },
        {
            'Endpoint':'/getCartItems/',
            'method':'POST',
            'body':'USERNAME',
            'description':'Retuns list of products IN CART'
        },
        {
            'Endpoint':'/removeFromCart/',
            'method':'POST',
            'body':'username,data',
            'description':'removes item from cart'
        },
        
        {
            'Endpoint':'/processOrder/',
            'method':'POST',
            'body':'username,shipping data',
            'description':'completes order and add shipping address'
        },
        {
            'Endpoint':'/getItem/',
            'method':'POST',
            'body':'username,id',
            'description':'get item from list'
        },
    ]

    return Response(routes)


@api_view(['POST'])
def signUp(request):
    
    data = request.data
    name = data['userName']
    email = data['userEmail']
    password = data['userPassword']

    try:
        customer = Customer.objects.get(name = name)
        return Response({'Msg':'Customer Name already exists'},status=status.HTTP_400_BAD_REQUEST)
    except:
        customer = Customer.objects.create(email = email, name = name, password = password)
        order,created = Order.objects.get_or_create(customer = customer, complete = False)
        serialzer = CustomerSerializer(customer,many=False)
        print(serialzer.data)
        return Response({'customer':serialzer.data},status=status.HTTP_200_OK)

@api_view(['POST'])
def login(request):
    data = request.data

    name = data['userName']
    password = data['userPassword']
    try:
        customer = Customer.objects.get(name = name, password = password)
        order,created = Order.objects.get_or_create(customer = customer, complete = False)
        serializer  = CustomerSerializer(customer,many=False)
        return Response({'customer':serializer.data},status=status.HTTP_200_OK)
    except:
        return Response({'Msg':'Invalid Credentials'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getProductsList(request):
    data = request.data
    userName = data['userName']
    try:
        customer = Customer.objects.get(name = userName)
        order = Order.objects.get(customer = customer)
        prodList = Product.objects.all()
        serializer = ProductSerializer(prodList,many=True)
        number_of_items = order.get_cart_items
        return Response({'data':serializer.data,'number_of_items':number_of_items},status=status.HTTP_200_OK)

    except:
        return Response({'Msg':'customer not exists'},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def addToCart(request):
    data = request.data

    userName = data['userName']

    name = data['name']
    price = data['price']
    image = data['image']

    try:
        customer = Customer.objects.get(name = userName)
        order = Order.objects.get(customer = customer)
        product = Product.objects.get(name = name)
        orderitem,created = OrderItem.objects.get_or_create(order=order,product=product)
        orderitem.quantity = (orderitem.quantity + 1)
        orderitem.save()
        number_of_items = order.get_cart_items
        return Response({'total_items':number_of_items},status=status.HTTP_200_OK)
    except:
        return Response({'Msg':'Getting Error in adding item'},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def getCartItems(request):
    data = request.data
    userName = data['userName']

    try:
        customer = Customer.objects.get(name = userName)
        order = Order.objects.get(customer = customer)
        orderitems = order.orderitem_set.all()
        orderItems = OrderItemSerializer(orderitems,many=True)
        orderData = OrderSerializer(order,many=False)
        products = Product.objects.all()
        productData = ProductSerializer(products,many=True)
        count = order.get_cart_items
        total = order.get_cart_total
        return Response({'list':orderItems.data,'products':productData.data,'order':orderData.data,'count':count,'total':total},status=status.HTTP_200_OK)
    except:
        return Response({'Msg':'Error, cant get cart details'},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def removeFromCart(request):
    data = request.data

    userName = data['userName']

    name = data['name']
    price = data['price']
    image = data['image']

    try:
        customer = Customer.objects.get(name = userName)
        order = Order.objects.get(customer = customer)
        product = Product.objects.get(name = name)
        orderitem= OrderItem.objects.get(order=order,product=product)
        orderitem.quantity = (orderitem.quantity - 1)
        orderitem.save()

        if orderitem.quantity <= 0:
            orderitem.delete()

        number_of_items = order.get_cart_items
        return Response({'total_items':number_of_items},status=status.HTTP_200_OK)
    except:
        return Response({'Msg':'Getting Error in adding item'},status=status.HTTP_403_FORBIDDEN)

@api_view(['POST'])
def processOrder(request):
    data = request.data

    userName = data['userName']
    Email = data['email']
    Address = data['address']
    City = data['city']
    State = data['state']
    zipcode = data['zipcode']

    transID = datetime.datetime.now().timestamp()

    try:
        customer = Customer.objects.get(name = userName)
        order = Order.objects.get(customer = customer)
        order.complete = True
        order.transaction_id = transID
        order.save()
        shipping = ShippingAddress.objects.create(
            customer = customer,
            order = order,
            address = Address,
            city = City,
            state = State,
            zip_code = zipcode
        )
        return Response({'Msg':'Transction successful'},status=status.HTTP_200_OK)
    except:
        return Response({'Msg':'Error during transaction'},status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def getItem(request):
    data = request.data

    userName = data['userName']
    itemName = data['itemName']

    try:
        product = Product.objects.get(name = itemName)
        productData = ProductSerializer(product,many=False)
        return Response({'item':productData.data},status=status.HTTP_200_OK)
    except:
        return Response({'msg':'Error in getting item'})