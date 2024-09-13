from django.urls import path, include
from . import views

urlpatterns = [
    path('send', views.send),
    path('get', views.getMessages),
    path('join', views.join_or_create_room),
]