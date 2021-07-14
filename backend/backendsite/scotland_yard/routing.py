# chat/routing.py
from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path(r'ws/scotland_yard/game/(?P<room_num>\w+)', consumers.GameConsumer.as_asgi()),
    re_path(r'ws/scotland_yard/spectate/(?P<room_num>\w+)', consumers.SpectateConsumer.as_asgi()),
]
