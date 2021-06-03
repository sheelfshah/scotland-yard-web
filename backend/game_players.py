# a player that plays the game


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


class MrX(Player):

    def __init__(self, role, position):
        assert role.lower().startswith("mr"), "role should be MrX"
        Player.__init__(self, role, position)
        self.last_public_position = None
        self.last_vehicle_used = None

    def check_double(self, transport1, transport2):
        if transport1 in self.tokens.keys() and transport2 in self.tokens.keys():
            if self.tokens["double"] * self.tokens[transport1] *\
                    self.tokens[transport2] > 0:
                return True
        return False


if __name__ == '__main__':
    # testing
    det = Detective("det0", 88)
    print(det.tokens)
    print(det.check_token("bus"))
