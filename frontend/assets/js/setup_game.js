window.onload = function() {
  var canvas = document.getElementById("map-canvas");
  var ctx = canvas.getContext("2d");
  var $img = $("#map-img");
  var $canvas = $("#map-canvas")
  $canvas.css({
    top: $img.position().top,
    left: $img.position().left
  });
  canvas.height = $img.height();
  canvas.width = $img.width();
};

// global vars
var syg_name = localStorage.getItem("syg_name");
var syg_room_num = localStorage.getItem("syg_room_num");
var syg_role = "";

var latest_move_dict = {};
var game_state={};

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

function update_game() {
  // temporary
  console.log("game updated");
}