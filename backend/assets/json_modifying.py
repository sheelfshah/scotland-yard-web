import json


def modify_stations(name="stations.json"):
    with open(name, "r") as f:
        df = json.load(f)
        old_keys = list(df.keys())
        for key in old_keys:
            for transport in df[key].keys():
                df[key][transport] = list(map(int, df[key][transport]))
            df[key]["blackticket"] = df[key]["taxi"] + \
                df[key]["bus"] + df[key]["underground"]
            df[int(key) + 200] = df[key]

    with open(name, "w") as f:
        json.dump(df, f, indent=4)

if __name__ == '__main__':
    modify_stations()
