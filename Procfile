release: cd backend/backendsite/ && python manage.py collectstatic && cd ../..
web: cd backend/backendsite/ && daphne backendsite.asgi:application --port 8000 --bind 0.0.0.0 && cd ../..