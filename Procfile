release: python backend/backendsite/manage.py collectstatic
web: cd backend/backendsite/ && daphne backendsite.asgi:application --port 8000 --bind 0.0.0.0 && cd ../..