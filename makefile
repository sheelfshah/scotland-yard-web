.PHONY = help host deploy

PYTHON = py

.DEFAULT: help
help:
	@echo "make host"
	@echo "       host local django server"
	@echo "make deploy"
	@echo "		  deploy to heroku"

host:
	cd backend/backendsite && ${PYTHON} manage.py collectstatic && cd ../..
	${PYTHON} backend/backendsite/manage.py runserver

deploy:
	git push heroku master