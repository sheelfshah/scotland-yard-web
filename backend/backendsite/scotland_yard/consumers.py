# chat/consumers.py
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer

import random
import json
from copy import deepcopy as dcopy

from .views import ongoing_games


"""close codes:(wrt 3000)
    1: no such game
    2: game full
    69: nice ending
"""
consumer_number = 1234


class GameConsumer(WebsocketConsumer):
    """
    assumption:
        on every new connection, a new consumer is created
        and it connects to the game with a unique consumer_id
        and the game can call events on the consumer

    * = pending
    ** = implemented
    *** = tested
    """

    def connect(self):
        # ***
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
        # async_to_sync(self.channel_layer.group_add)(
        #     self.room_group_name,
        #     self.channel_name
        # )
        self.role = None
        self.consumer_id = consumer_number
        consumer_number += random.choice([3,4,5])
        self.game.add_consumer(self)
        self.accept()
        

    def disconnect(self, close_code):
        # ***
        if self.game is not None:
            for i, game in enumerate(ongoing_games):
                if game.game_id == self.game.game_id:
                    self.game.remove_player(self.role)
                    if len(self.game.available_roles) == 6:
                        del ongoing_games[i]
                    break
        print("%d games going on" % len(ongoing_games))


    # Communication with WebSocket
    """message formats
    all mssgs must have "purpose" key which is one of :
        *** setup_server: client sends name
        ** play_move: client sends move_dict
        
        *** setup_client: server sends role
        ** move_reply: server sends move_dict and bool(move_success)
        *** game_update: server sends game_state # edits mrx_pos
        ** game_end: server send reason for end

    all mssgs have "who" key which is senders role
    """
    def setup_client(self):
        self.send(text_data=json.dumps({
            'purpose': "setup_client",
            'who': self.role
        }))
        return

    def move_reply(self, move_dict):
        if self.game.move(move_dict):
            self.send(text_data=json.dumps({
                'purpose': "move_reply",
                'who': self.role,
                'move_dict': move_dict,
                'success': True
            }))
            self.game.move_completed()
            return
        self.send(text_data=json.dumps({
            'purpose': "move_reply",
            'who': self.role,
            'move_dict': move_dict,
            'success': False
        }))
        return

    def game_update_event(self):
        game_state = dcopy(self.game.game_state)
        if self.role != self.game.mrx.role:
            del game_state[self.game.mrx.role]["position"]
        self.send(text_data=json.dumps({
            'purpose': "game_update",
            'who': self.role,
            'game_state': game_state
        }))
        return

    def game_end_event(self, reason):
        self.send(text_data=json.dumps({
            'purpose': "game_end",
            'who': self.role,
            'reason': reason
        }))
        self.close(3069)
        return

    def receive(self, text_data):
        text_data_json = json.loads(text_data)
        purpose = text_data_json['purpose']

        if purpose == "setup_server":
            name = text_data_json["name"]
            try:
                self.role = self.game.add_player(name)
            except:
                self.close(code=3002)
            print(self.role)
            self.setup_client()
            self.game_update_event()
            return

        if purpose == "play_move":
            move_dict = text_data_json["move_dict"]
            self.move_reply(move_dict)
            return
        
        # async_to_sync(self.channel_layer.group_send)(
        #     self.room_group_name,
        #     {
        #         'type': 'chat_message',
        #         'message': message,
        #         'name': self.name,
        #     }
        # )

