// global vars
var syg_name = sessionStorage.getItem("syg_name");
var syg_room_num = sessionStorage.getItem("syg_room_num");
var syg_role = "";
var current_stats_role = "";

var latest_move_dict = {};
var game_state={};

var $mapdiv = $("#map-div");
var $mapimg = $("#map-img");
var $mapcanvas = $('#map-canvas');

var canvas = document.getElementById("map-canvas");
var ctx = canvas.getContext("2d");

var sc = JSON.parse(station_coordinates);
var factor = 1;

window.onload = function() {
  $mapcanvas.css({
    top: $mapimg.position().top,
    left: $mapimg.position().left
  });
  canvas.height = $mapimg.height();
  canvas.width = $mapimg.width();
};

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

const socket = new WebSocket(
  'ws://'
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
});