# backendsite/asgi.py
import os
import django
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backendsite.settings")
django.setup()

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import scotland_yard.routing


application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AuthMiddlewareStack(
        URLRouter(
            scotland_yard.routing.websocket_urlpatterns
        )
    ),
})
