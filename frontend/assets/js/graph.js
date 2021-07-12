/*
dcopy(x);
Station class:
  adjacent()
Graph class:
  get_station(id)
  minimum_token_path(from, true)
  allroutes(from, length, current_path = [], is_detective=true)
move_balls();
*/

function dcopy(x) {
  return JSON.parse(JSON.stringify(x));
}

class Station {
  constructor(id, x_coord = 0, y_coord = 0) {
    this.id = id;
    this.x_coord = x_coord;
    this.y_coord = y_coord;
    this.taxi = [];
    this.bus = [];
    this.underground = [];
    this.blackticket = [];
  }
  adjacent() {
    return this.taxi.concat(
      this.bus, this.underground, this.blackticket);
  }
}

class Graph {
  constructor() {
    this.stations = [];
    this.weights = {
      "taxi": 1,
      "bus": 1,
      "underground": 1,
      "blackticket": 1
    };
    this.load();
  }
  str_list_to_int(list) {
    var int_list = [];
    for (var i = 0; i < list.length; i++) {
      int_list.push(parseInt(list[i]));
    }
    return int_list;
  }
  load() {
    for (var key in station_neighbors) {
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
  get_station(id) {
    return this.stations[id - 1];
  }
  minimum_token_path(from, to) {
    // returns path List[Tuple[position, transport]]

    let visited = new Array(this.stations.length + 1).fill(false);
    var queue = [];
    queue.push(from);
    let predecessor = new Array(this.stations.length + 1).fill(-1);

    visited[from] = true;
    // BFS with storing predecessors
    while (queue.length > 0) {
      var current = queue.shift();
      var found = false;
      for (var i = 0; i < this.get_station(current).adjacent().length; i++) {
        var next = this.get_station(current).adjacent()[i];
        if (!visited[next]) {
          visited[next] = true;
          predecessor[next] = current;
          queue.push(next);
          if (next === to) {
            found = true;
            break;
          }
        }
      }
      if (found) break;
    }
    var rev_path = [to];
    while (true) {
      if (predecessor[rev_path[rev_path.length - 1]] === from) break;
      rev_path.push(predecessor[rev_path[rev_path.length - 1]]);
    }
    var path = [];
    for (var i = rev_path.length - 1; i >= 0; i--) {
      var prev_station = this.get_station(predecessor[rev_path[i]]);
      if (prev_station.taxi.includes(rev_path[i]))
        path.push([rev_path[i], "taxi"]);
      else if (prev_station.bus.includes(rev_path[i]))
        path.push([rev_path[i], "bus"]);
      else if (prev_station.underground.includes(rev_path[i]))
        path.push([rev_path[i], "underground"]);
      else if (prev_station.blackticket.includes(rev_path[i]))
        path.push([rev_path[i], "blackticket"]);
      else console.log("Minimum token path failed");
    }
    return path;
  }
  allroutes(from, length, current_path = [], is_detective=true) {
    // returns path List[Tuple[position, transport]]
    if (length <= 0) return [dcopy(current_path)];
    var ans = [],
      from_station = this.get_station(from);
    var neighbors = new Set(from_station.adjacent());
    for (let neighbor of neighbors) {
      if (from_station.taxi.includes(neighbor)) {
        ans = ans.concat(this.allroutes(neighbor, length - 1,
          dcopy(current_path).concat([[neighbor, "taxi"]]), is_detective));
      }
      if (from_station.bus.includes(neighbor)) {
        ans = ans.concat(this.allroutes(neighbor, length - 1,
          dcopy(current_path).concat([[neighbor, "bus"]]), is_detective));
      }
      if (from_station.underground.includes(neighbor)) {
        ans = ans.concat(this.allroutes(neighbor, length - 1,
          dcopy(current_path).concat([[neighbor, "underground"]]), is_detective));
      }
      if (!is_detective)
        ans = ans.concat(this.allroutes(neighbor, length - 1,
          dcopy(current_path).concat([[neighbor, "blackticket"]]), is_detective));
    }
    return ans;
  }
}

function path_to_move_dict(path) {
  var move_dict = {
    "role": syg_role,
    "is_double": false,
    "next_position": 0,
    "transport": "",
    "next_to_next_position": null,
    "next_transport": null
  }
  if (path.length > 2 || path.length <= 0) return null;
  if (path.length === 1) {
    move_dict.next_position = path[0][0];
    move_dict.transport = path[0][1];
    return move_dict;
  }
  move_dict.is_double = true;
  move_dict.next_position = path[0][0];
  move_dict.transport = path[0][1];
  move_dict.next_to_next_position = path[1][0];
  move_dict.next_transport = path[1][1];
  return move_dict;
}

function create_balls(n) {
  for (var i = 0; i < n; i++) {
    var $div = $("<div>", {"class": "ball"});
    $("body").append($div);
    $div.offset({
      top: Math.random()*$(window).height(),
      left: Math.random()*$(window).width()
    });
  }
}


function move_balls(){
  $(".ball").each(function(idx) {
    var x1, x2, y1, y2;
    var $this = $(this);
    x1 = $this.offset().left;
    x2 = x1 + $this.width();
    y1 = $this.offset().top;
    y2 = y1 + $this.height();
    if(x1<0){
      vx_balls[idx] = Math.abs(vx_balls[idx]);
    }
    if(x2 > $(window).width() - 10){
      vx_balls[idx] = -Math.abs(vx_balls[idx]);
    }
    if(y1<0){
      vy_balls[idx] = Math.abs(vy_balls[idx]);
    }
    if(y2 > $(window).height()){
      vy_balls[idx] = -Math.abs(vy_balls[idx]);
    }
    $this.offset({ top: y1+vy_balls[idx], left: x1+vx_balls[idx] });
  });
  setTimeout(move_balls, 100);
}