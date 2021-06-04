# a class that implements a game instance
# assign positions, maintain tokens, move characters
from game_players import *
import random


class ScotlandYardGame:

    def __init__(self):
        with open("assets/utilities.json") as f:
            utilities = json.dump(f)

        start_positions = random.sample(utilities["start_positions"], 6)
        self.mrx = MrX("mrx_name", start_positions[0])
        self.detectives = [
            Detective("det1_name", start_positions[1]),
            Detective("det2_name", start_positions[2]),
            Detective("det3_name", start_positions[3]),
            Detective("det4_name", start_positions[4]),
            Detective("det5_name", start_positions[5])
        ]

    def round(self):
        self.current_playing = self.mrx.role
        self.update(self.current_playing)
        self.mrx.play(
            *self.get_move(self.current_playing)
        )
        for i in range(len(self.detectives)):
            self.current_playing = self.detectives[i].role
            self.update(self.current_playing)
            self.detectives[i].play(
                *self.get_move(self.current_playing)
            )
