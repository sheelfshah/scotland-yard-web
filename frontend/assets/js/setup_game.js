// global vars
var syg_name, syg_room_num, syg_role, current_stats_role;
var latest_move_dict, game_state;
var $mapdiv, $mapimg, $mapcanvas, $select;
var canvas, ctx;
var sc, factor;
var socket, graph;

function load_stuff() {
  syg_name = localStorage.getItem("syg_name");
  syg_room_num = localStorage.getItem("syg_room_num");
  syg_role = "";
  current_stats_role = "";
  latest_move_dict = {};
  game_state={};
  $mapdiv = $("#map-div");
  $mapimg = $("#map-img");
  $mapcanvas = $('#map-canvas');
  $select = null;
  canvas = document.getElementById("map-canvas");
  ctx = canvas.getContext("2d");
  sc = JSON.parse(station_coordinates);
  factor = 1;
  graph = new Graph();

  if((!syg_name)||(!syg_room_num)){
    alert("Something is wrong :(; Go to " +
      window.location.host + "/scotland_yard to reset");
    syg_room_num=0;
  }
  else if(parseInt(window.location.pathname.slice(-5, -1))!=syg_room_num){
    alert("Something is wrong :(; Go to " +
      window.location.host + "/scotland_yard to reset");
    syg_room_num=0;
  }

  $mapcanvas.css({
    top: $mapimg.position().top,
    left: $mapimg.position().left
  });
  canvas.height = $mapimg.height();
  canvas.width = $mapimg.width();

  var ws_scheme = window.location.protocol == "https:" ? "wss://" : "ws://";
  socket = new WebSocket(
    ws_scheme
    + window.location.host
    + '/ws/scotland_yard/'
    + syg_room_num + '/'
  );

  socket.addEventListener('open', function (event) {
      console.log("Socket established");
      socket.send(JSON.stringify({
        'purpose': "setup_server",
        'name': syg_name
      }));
  });
  socket.addEventListener('close', function (event) {
    console.log("Socket closed " + event.code);
    if(event.code === 69){
      window.onbeforeunload = function() {return;}
      setTimeout(function() {
        alert("GG WP");
        window.location.href =
          window.location.href.slice(0, -5).replace("game/", "");
      }, 5000);
    }
  });

  socket_message();
  document.addEventListener('keyup', handleKey);
};

document.onload = function(){
  load_stuff();
};

window.onbeforeunload = function() {
  return "Leaving a game midway is not good for health";
};

$("#status").fadeOut(30);