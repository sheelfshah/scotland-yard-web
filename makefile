.PHONY = help host

PYTHON = py

.DEFAULT: help
help:
	@echo "make host"
	@echo "       host local django server"

host:
	${PYTHON} backend/backendsite/manage.py runserver
