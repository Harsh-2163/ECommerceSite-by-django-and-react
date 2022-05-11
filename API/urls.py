from django.urls import path
from . import views


urlpatterns = [
    path('getRoutes',views.getRoutes,name='getRoutes'),
    path('signup',views.signUp,name='signUp'),
    path('login',views.login,name='login'),
    path('getProductsList',views.getProductsList,name='getProductsList'),
    path('addToCart',views.addToCart,name='addToCart'),
    path('getCartItems',views.getCartItems,name='getCartItems'),
    path('removeFromCart',views.removeFromCart,name='removeFromCart'),
    path('processOrder',views.processOrder,name='processOrder'),
    path('getItem',views.getItem,name='getItem'),
]