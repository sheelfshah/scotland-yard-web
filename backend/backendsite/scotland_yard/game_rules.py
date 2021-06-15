# a class that implements a game instance
# assign positions, move characters
from .game_players import *
import random

class ScotlandYardGame:

    def __init__(self, game_id):
        self.game_id = game_id
        with open("assets/utilities.min.json") as f:
            utilities = json.load(f)

        start_positions = random.sample(utilities["start_positions"], 6)
        self.stations_dict = utilities["stations"]

        self.mrx = MrX("mrx_name", start_positions[0])
        self.detectives = [
            Detective("det1_name", start_positions[1]),
            Detective("det2_name", start_positions[2]),
            Detective("det3_name", start_positions[3]),
            Detective("det4_name", start_positions[4]),
            Detective("det5_name", start_positions[5])
        ]
        self.players = [self.mrx] + self.detectives
        self.current_playing = self.mrx

        self.players_in_game = 0
        self.update_game_state()


    def add_player(self, name):
        if self.players_in_game < 6:
            self.players[self.players_in_game].role = \
                self.players[self.players_in_game].role.replace("name", name)
            self.players_in_game += 1
            return self.players[self.players_in_game-1].role
        raise Exception("Game is full")


    def update_game_state(self):
        state = {}
        for player in self.players:
            state[player.role] = player.position

        state["current_playing"] = self.current_playing.role
        state["mrx_rounds_played"] = self.mrx.moves_played
        state["last_transport_used"] = self.mrx.last_transport_used
        state["last_public_position"] = self.mrx.last_public_position
        self.game_state = state

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
