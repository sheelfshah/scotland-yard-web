# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

import random
import json
from copy import deepcopy as dcopy

from .views import ongoing_games


"""close codes:(wrt 3000)
    1: no such game
    2: no such role
"""
consumer_number = 1234


class GameConsumer(WebsocketConsumer):
    """
    assumption:
        on every new connection, a new consumer is created
        and it connects to the game with a unique consumer_id
        and the game can call events on the consumer
    """

    def connect(self):
        global consumer_number
        room_num = self.scope['url_route']['kwargs']['room_num']
        room_num = int(room_num)
        self.room_group_name = 'game_%d' % room_num

        # validate room num
        self.game = None
        for game in ongoing_games:
            print(game.game_id)
            if game.game_id == room_num:
                self.game = game
                break
        if not self.game:
            self.accept()
            self.close(code=3001)
            return
            
        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.consumer_id = consumer_number
        consumer_number += random.choice([3,4,5])
        self.game.add_consumer(self)
        self.accept()
        

    def disconnect(self, close_code):
        if self.game is not None:
            for i, game in enumerate(ongoing_games):
                if game.game_id == self.game.game_id:
                    self.game.remove_player(self.role)
                    if len(self.game.available_roles) == 6:
                        del ongoing_games[i]
                    break


    # Communication with WebSocket
    """message formats
    all mssgs must have "purpose" key which is one of :
        * setup_server: client sends role
        * play_move: client sends move_dict

        * move_reply: server sends move_dict and bool(move_success)
        * game_update: server sends game_state # edits mrx_pos
        * game_end: server send reason for end

    all mssgs have "who" key which is senders role
    """
    def game_update_event(self):
        game_state = dcopy(self.game.game_state)
        if self.role != self.game.mrx.role:
            del game_state[self.game.mrx.role]
        self.send(text_data=json.dumps({
            'purpose': "game_update",
            'who': self.role,
            'game_state': game_state
        }))

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        purpose = text_data_json['purpose']

        if purpose == "setup_server":
            self.role = text_data_json["role"]

            # validate role
            valid_role=False
            for player in self.game.players:
                if player.role ==  self.role:
                    valid_role = True
                    break
            if not valid_role:
                self.close(code=3002)
            print(self.role)
            return
        
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name,
        #     {
        #         'type': 'chat_message',
        #         'message': message,
        #         'name': self.name,
        #     }
        # )

    # Receive message from room group
    def chat_message(self, event):

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'purpose': "chat",
            'name': event['name'],
            'message': event['message'],
        }))
