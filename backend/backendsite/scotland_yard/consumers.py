# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import random

roles_dict = {
    "god": 1,
    "mafia": 4,
    "bomber": 1,
    "joker": 1,
    "barman": 1,
    "detective": 2,
    "civilian": 5,
    "clueful_doctor": 1,
    "clueless_doctor": 1,
    "dead": 0
}

room_group_names_dict = {
    "god": None,
    "mafia": None, "detective": None,
    "civilian": None,
    "bomber": None, "joker": None, "barman": None,
    "clueless_doctor": None, "clueful_doctor": None,
    "dead": None
}

roles_room_codes = {
    "mafia": None,
    "detective": None,
    "god": None,
    "dead": None
}

roomless_roles = ["bomber", "joker", "barman", "civilian",
                  "clueful_doctor", "clueless_doctor"]

role_index = 0
roles = []
for role in roles_dict.keys():
    roles += [role] * roles_dict[role]
random.shuffle(roles)
# print(roles)


def get_random_role():
    global role_index, roles

    role_index += 1
    try:
        return roles[role_index - 1]
    except:
        role_index -= 1
        return "dead"


def get_room_name(role):
    global roles_room_codes
    if roles_room_codes[role] is not None:
        return "chat_" + role + "_" + roles_room_codes[role]

    roles_room_codes[role] = str(random.randint(1000, 10000))
    return "chat_" + role + "_" + roles_room_codes[role]


class ChatConsumer(WebsocketConsumer):

    def connect(self):
        global room_group_names_dict

        self.name = self.scope['url_route']['kwargs']['room_name']
        self.role = get_random_role()
        print(self.role)
        if self.role in roomless_roles:
            self.room_group_name = "chat_" + self.role
        else:
            self.room_group_name = get_room_name(self.role)
        room_group_names_dict[self.role] = self.room_group_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()
        self.send(text_data=json.dumps({
            'purpose': "setup",
            'role': self.role,
        }))

    def disconnect(self, close_code):
        global roles

        # Leave room group
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )
        roles.append(self.role)

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
