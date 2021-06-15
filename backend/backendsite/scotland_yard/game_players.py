# a player that plays the game

import json


def get_color(role):
    return "#000000"


class Player:

    def __init__(self, role, position):
        self.role = role
        self.color = get_color(role.lower())
        self.position = position

        self.has_played = False

        if self.role.lower().startswith("det"):
            self.tokens = {
                "taxi": 10, "bus": 8,
                "underground": 4, "blackticket": 0, "double": 0
            }
        else:
            self.tokens = {
                "taxi": 4, "bus": 3,
                "underground": 3, "blackticket": 5, "double": 2
            }

    def check_token(self, transport):
        # retrurns True if transport token available
        if transport in self.tokens.keys():
            if self.tokens[transport] > 0:
                return True
        return False


class Detective(Player):

    def __init__(self, role, position):
        assert role.lower().startswith("det"), "role should be detective"
        Player.__init__(self, role, position)

    def move(self, new_position, transport, mrx):
        # assumes valid move
        self.position = new_position
        self.tokens[transport] -= 1
        mrx.increase_token(transport)


class MrX(Player):

    def __init__(self, role, position):
        assert role.lower().startswith("mr"), "role should be MrX"
        Player.__init__(self, role, position)
        self.last_public_position = None
        self.moves_played = 0
        self.last_transport_used = None
        self.reveal_times = [3, 8, 13, 18, 24]

    def increase_token(self, transport):
        self.tokens[transport] += 1

    def check_double(self, transport1, transport2):
        if transport1 in self.tokens.keys() and transport2 in self.tokens.keys():
            if self.tokens["double"] * self.tokens[transport1] *\
                    self.tokens[transport2] > 0:
                if transport1 == transport2:
                    return self.tokens[transport2] > 1
                return True
        return False

    def move(self, new_position, transport):
        # assumes valid move
        self.position = new_position
        self.tokens[transport] -= 1
        self.last_transport_used = transport
        self.moves_played += 1
        if self.moves_played in self.reveal_times:
            self.last_public_position = self.position

    def move_double(self, next_p, next_to_next_p, transport1, transport2):
        # assumes valid double
        self.move(next_p, transport1)
        self.move(next_to_next_p, transport2)
        self.tokens["double"] -= 1
        self.last_transport_used = "double: " + transport1 + ", " + transport2


def check_validity(player, position1, position2, transport, stations_dict):
    if player.check_token(transport):
        try:
            if position2 in stations_dict[str(position1)][transport]:
                return True
        except:
            return False
    return False


def check_double_validity(player, p1, p2, p3, t1, t2, stations_dict):
    if player.check_double(t1, t2):
        return check_validity(p1, p2, t1, stations_dict) and check_validity(p2, p3, t2, stations_dict)
    return False


if __name__ == '__main__':
    # testing
    mrx = MrX("mrx", 88)
    det = Detective("det0", 187)
    with open("assets/stations.json", "r") as f:
        stations_dict = json.load(f)

    if check_validity(det, det.position, 1, "bus", stations_dict):
        print(mrx.tokens, det.tokens)
        det.move(185, "bus", mrx)
        print(mrx.tokens, det.tokens)
        print(det.position)
