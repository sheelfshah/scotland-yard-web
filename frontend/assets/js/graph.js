class Station{
    constructor(id, x_coord=0, y_coord=0){
        this.id = id;
        this.x_coord = x_coord; this.y_coord = y_coord;
        this.taxi = []; this.bus = [];
        this.underground = []; this.blackticket = [];
    }
    adjacent(){
        return this.taxi.concat(
            this.bus, this.underground, this.blackticket);
    }
}

class Graph{
    constructor(){
        this.stations = [];
        this.weights = {
            "taxi": 1, "bus": 1, "underground": 1,
            "blackticket": 1
        };
        this.load();
    }
    str_list_to_int(list){
        var int_list = [];
        for (var i = 0; i < list.length; i++) {
            int_list.push(parseInt(list[i]));
        }
        return int_list;
    }
    load() {
        for(var key in station_neighbors){
            let station = new Station(parseInt(key),
                sc[key].x, sc[key].y);
            station.taxi = this.str_list_to_int(
                station_neighbors[key].taxi);
            station.bus = this.str_list_to_int(
                station_neighbors[key].bus);
            station.underground = this.str_list_to_int(
                station_neighbors[key].underground);
            station.blackticket = this.str_list_to_int(
                station_neighbors[key].blackticket);
            this.stations.push(station);
        }
    }
    get_station(id){
        return this.stations[id-1];
    }
    minimum_token_path(from, to){
        // check for from==to

        let visited = new Array(this.stations.length + 1).fill(false);
        var queue = []; queue.push(from);
        let predecessor = new Array(this.stations.length + 1).fill(-1);
        
        visited[from] = true;
        // BFS with storing predecessors
        while(queue.length > 0){
            var current = queue.shift();
            var found = false;
            for (var i = 0; i < this.get_station(current).adjacent().length; i++) {
                var next = this.get_station(current).adjacent()[i];
                if(!visited[next]){
                    visited[next] = true;
                    predecessor[next] = current;
                    queue.push(next);
                    if(next === to){
                        found = true;
                        break;
                    }
                }
            }
            if(found) break;
        }
        var rev_path = [to];
        while(true){
            if(predecessor[rev_path[rev_path.length - 1]] === from) break;
            rev_path.push(predecessor[rev_path[rev_path.length - 1]]);
        }
        var path = [];
        for (var i = rev_path.length - 1; i >= 0; i--) {
            var prev_station = this.get_station(predecessor[rev_path[i]]);
            if(prev_station.taxi.includes(rev_path[i]))
                path.push([rev_path[i], "taxi"]);
            else if(prev_station.bus.includes(rev_path[i]))
                path.push([rev_path[i], "bus"]);
            else if(prev_station.underground.includes(rev_path[i]))
                path.push([rev_path[i], "underground"]);
            else if(prev_station.blackticket.includes(rev_path[i]))
                path.push([rev_path[i], "blackticket"]);
            else console.log("Minimum token path failed");
        }
        return path;
    }
}

let graph = new Graph();
