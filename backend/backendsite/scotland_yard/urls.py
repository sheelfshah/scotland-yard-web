# chat/urls.py
from django.urls import path

from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('join/<int:room_num>/', views.room_join, name='room_join'),
    path('create/<int:room_num>/', views.room_create, name='room_create'),
    path('game/<int:room_num>/', views.play_game, name='play_game'),
    path('spectate/<int:room_num>/', views.spectate_game, name='spectate_game'),
]
