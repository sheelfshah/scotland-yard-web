from django.shortcuts import render, redirect
from django.template import RequestContext
from django.http import HttpResponse
from .game_rules import ScotlandYardGame

ongoing_games = []

def index(request):
    return render(request, 'index.html', {})


def room_join(request, room_num):
    global ongoing_games
    for game in ongoing_games:
        if game.game_id == room_num:
            if len(game.available_roles) > 0:
                return render(request, 'redirect.html', {
                    'room_num': room_num
                })
            return redirect('spectate_game', room_num=room_num)
    return HttpResponse("<h1>This room does not exist :/</h1>")

def room_create(request, room_num):
    global ongoing_games
    game = ScotlandYardGame(room_num)
    ongoing_games.append(game)
    return render(request, 'redirect.html', {
        'room_num': room_num
    })

def play_game(request, room_num):
    return render(request, 'game.html', {})

def spectate_game(request, room_num):
    return render(request, 'spectate.html', {})

def handler404(request, *args, **argsv):
    return render(request, 'error.html', {})

def handler500(request, *args, **argsv):
    return render(request, 'error.html', {})