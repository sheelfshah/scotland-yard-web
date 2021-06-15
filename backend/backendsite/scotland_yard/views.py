from django.shortcuts import render, redirect
from django.http import HttpResponse
from .game_rules import ScotlandYardGame

ongoing_games = []

def index(request):
    return render(request, 'index.html', {})


def room_join(request, room_num):
    global ongoing_games
    for game in ongoing_games:
        if game.game_id == room_num:
            try:
                role = game.add_player(request.GET.get("name"))
                return render(request, 'game.html', {
                    'room_num': room_num, 'role': role
                })
            except:
                return HttpResponse("<h1>This room is full :/</h1>")
    return HttpResponse("<h1>This room does not exist :/</h1>")

def room_create(request, room_num):
    global ongoing_games
    game = ScotlandYardGame(room_num)
    ongoing_games.append(game)
    role  = game.add_player(request.GET.get("name"))
    return render(request, 'game.html', {
        'room_num': room_num, 'role': role
    })
