website url: not-scotland-yard.herokuapp.com/scotland_yard

running locally:
    clone the repo
    create a virtual env and install requirements
        `pip install -r requirements.txt`
    run server using `make host`

todo:
    vh for mobile
    testing

description:
    Web-based implementation of the popular board game - Scotland Yard.
    Uses a python backend using the django framework, with Channels for ASGI.
    The frontend is written in vanilla JavaScript and uses JQuery.
    The frontend was created in components that can be controlled by the websocket
        or, equivalently, the backend.