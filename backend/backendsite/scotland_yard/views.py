from django.shortcuts import render


def index(request):
    return render(request, 'index.html', {})


def room_join(request, room_name):
    return render(request, 'game.html', {
        'room_name': room_name
    })

def room_create(request, room_name):
    return render(request, 'game.html', {
        'room_name': room_name
    })
