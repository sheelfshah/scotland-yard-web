import json


def modify_stations(source="stations_og.json", dest="stations.json"):
    with open(source, "r") as f:
        df = json.load(f)
        old_keys = list(df.keys())
        for key in old_keys:
            for transport in df[key].keys():
                df[key][transport] = list(map(int, df[key][transport]))
            df[key]["blackticket"] = df[key]["taxi"] + \
                df[key]["bus"] + df[key]["underground"] + df[key]["blackticket"]

    with open(dest, "w") as f:
        json.dump(df, f, indent=4)

if __name__ == '__main__':
    modify_stations()
