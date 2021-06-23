# a class that implements a game instance
# assign positions, move characters
from .game_players import *
import random

class ScotlandYardGame:

    def __init__(self, game_id):
        self.game_id = game_id
        self.available_roles = [
            "mrx0", "det1", "det2",
            "det3",  "det4",  "det5"]
        self.total_roles = len(self.available_roles)
        with open("assets/utilities.min.json") as f:
            utilities = json.load(f)

        start_positions = random.sample(utilities["start_positions"], self.total_roles)
        self.stations_dict = utilities["stations"]

        self.mrx = MrX("mrx0_name", start_positions[0])
        self.detectives = [
            Detective("det1_name", start_positions[1]),
            Detective("det2_name", start_positions[2]),
            Detective("det3_name", start_positions[3]),
            Detective("det4_name", start_positions[4]),
            Detective("det5_name", start_positions[5])
        ]
        self.players = [self.mrx] + self.detectives
        self.current_playing = self.mrx

        self.consumers = []
        self.update_game_state()


    def add_player(self, name):
        print(self.available_roles)
        if len(self.available_roles) > 0:
            player_index = int(self.available_roles[0][-1])
            self.players[player_index].change_name(name)
            del self.available_roles[0]
            self.update_game_state()
            return self.players[player_index].role
        raise Exception("Game is full")

    def remove_player(self, role):
        # must be a valid role
        for player in self.players:
            if player.role == role:
                self.available_roles.append(role[:4])
                player.change_name("name")
                break
        print(self.available_roles)
        self.update_game_state()

    def add_consumer(self, consumer):
        self.consumers.append(consumer)

    def remove_consumers(self, consumer_id):
        for i, consumer in enumerate(self.consumers):
            if consumer.consumer_id == consumer_id:
                del self.consumers[i]

    def update_game_for_consumers(self):
        for consumer in self.consumers:
            consumer.game_update_event()

    def end_game_for_consumers(self, reason):
        for consumer in self.consumers:
            consumer.game_end_event(reason)

    def update_game_state(self):
        state = {}
        for player in self.players:
            state[player.role] = player.to_json()

        state["current_playing"] = self.current_playing.role
        state["num_players"] = self.total_roles - len(self.available_roles)
        self.game_state = state
        self.update_game_for_consumers()

    def move_completed(self):
        # update current playing
        if self.current_playing.role.startswith("mrx"):
            self.current_playing = self.detectives[0]
        else:
            det_index = int(self.current_playing.role[3])
            if det_index == 5:
                self.current_playing = self.mrx
            else:
                self.current_playing = self.detectives[det_index]

        # update game state
        self.update_game_state()

        # check completion
        if False:
            self.end_game_for_consumers(reason)

    def move(self, move_dict):
        """
        takes in a move_dict
        returns bool(move was succesfully played)

        move_dict attributes:
            role: role name of player
            is_double: wether double is played or no
            next_position: next position to move to
            transport: (first) transport to be used
            next_to_next_position: next to next position (optional)
            next_transport: second transport to be used (optional)
        """

        try:
            if move_dict["role"] != self.current_playing.role:
                return False

            # can't go to an occupied position
            # only for detectives
            if move_dict["role"].startswith("det"):
                for detective in self.detectives:
                    if detective.position == move_dict["next_position"]:
                        return False

            if move_dict["is_double"]:
                if not self.current_playing.role.startswith("mrx"):
                    return False
                [p1, t1, p2, t2] = [
                    move_dict[key] for key in ["next_position",
                        "transport", "next_to_next_position", "next_transport"]]
                if not check_double_validity(self.current_playing, 
                    self.current_playing.position, p1, p2, t1, t2, self.stations_dict):
                    return False
                self.current_playing.move_double(p1, p2, t1, t2)
                return True
            else:
                p1, t1 = move_dict["next_position"], move_dict["transport"]
                if not check_validity(self.current_playing,
                    self.current_playing.position, p1, t1, self.stations_dict):
                    return False
                if self.current_playing.role.startswith("mrx"):
                    self.current_playing.move(p1, t1)
                    return True
                self.current_playing.move(p1, t1, self.mrx)
                return True
        except:
            # move_dict does not have required properties
            return False
        

if __name__ == '__main__':
    syg = ScotlandYardGame()
    syg.mrx.position = 87
    syg.detectives[0].position = 89
    syg.update_game_state()
    print(syg.game_state)
    print(syg.mrx.tokens)
    move_dict1={
        "role": "mrx_name",
        "is_double": False,
        "next_position": 88,
        "transport": "taxi",
    }
    print(syg.move(move_dict1))
    syg.move_completed()
    print(syg.game_state)
    move_dict2={
        "role": "det1_name",
        "is_double": False,
        "next_position": 67,
        "transport": "underground",
    }
    print(syg.move(move_dict2))
    syg.move_completed()
    print(syg.game_state)
    print(syg.mrx.tokens)
