# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import random

from .views import ongoing_games


class GameConsumer(WebsocketConsumer):

    def connect(self):
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
            self.close()
            return

        # validate role
        self.role = self.scope['url_route']['kwargs']['role']
        valid_role=False
        for player in self.game.players:
            if player.role ==  self.role:
                valid_role = True
                break
        if not valid_role:
            self.close()
            return

            
        print(self.role)

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.user = self.scope["user"]
        print(self.user)
        self.accept()
        

    def disconnect(self, close_code):
        if self.game is not None:
            for i, game in enumerate(ongoing_games):
                if game.game_id == self.game.game_id:
                    self.game = game
                    break


    # Receive message from WebSocket
    def receive(self, text_data):
        global room_group_names_dict

        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        if self.role == "god":
            try:
                receiver_role = text_data_json['receiver_role']
                if receiver_role not in roles_dict.keys():
                    raise ValueError
            except:
                self.send(text_data=json.dumps({
                    'purpose': "chat",
                    'name': self.name,
                    'message': "sent to no one"
                }))
                return
            async_to_sync(self.channel_layer.group_send)(
                room_group_names_dict[receiver_role],
                {
                    'type': 'chat_message',
                    'message': message,
                    'name': "god " + self.name,
                }
            )
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'chat_message',
                    'message': message,
                    'name': "god " + self.name,
                }
            )
            return

        # Send message to self
        if self.role in roomless_roles:
            try:
                receiver_role = text_data_json['receiver_role']
                if receiver_role == "god":
                    async_to_sync(self.channel_layer.group_send)(
                        room_group_names_dict["god"],
                        {
                            'type': 'chat_message',
                            'message': message,
                            'name': self.role + " " + self.name,
                        }
                    )
                    if message[:4] == "dead":
                        async_to_sync(self.channel_layer.group_discard)(
                            self.room_group_name,
                            self.channel_name
                        )
                        self.role = "dead"
                        self.room_group_name = get_room_name(self.role)
                        room_group_names_dict[self.role] = self.room_group_name
                        async_to_sync(self.channel_layer.group_add)(
                            self.room_group_name,
                            self.channel_name
                        )
                        self.send(text_data=json.dumps({
                            'purpose': "setup",
                            'role': self.role,
                        }))

            except:
                pass

            self.send(text_data=json.dumps({
                'purpose': "chat",
                'name': self.name,
                'message': message
            }))
            return

        try:
            receiver_role = text_data_json['receiver_role']
            if receiver_role == "god":
                async_to_sync(self.channel_layer.group_send)(
                    room_group_names_dict["god"],
                    {
                        'type': 'chat_message',
                        'message': message,
                        'name': self.role + " " + self.name,
                    }
                )
                if message[:4] == "dead":
                    async_to_sync(self.channel_layer.group_discard)(
                        self.room_group_name,
                        self.channel_name
                    )
                    self.role = "dead"
                    self.room_group_name = get_room_name(self.role)
                    room_group_names_dict[self.role] = self.room_group_name
                    async_to_sync(self.channel_layer.group_add)(
                        self.room_group_name,
                        self.channel_name
                    )
                    self.send(text_data=json.dumps({
                        'purpose': "setup",
                        'role': self.role,
                    }))
        except:
            pass
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': message,
                'name': self.name,
            }
        )

    # Receive message from room group
    def chat_message(self, event):

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'purpose': "chat",
            'name': event['name'],
            'message': event['message'],
        }))
