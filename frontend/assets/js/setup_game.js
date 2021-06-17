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

var syg_role = localStorage.getItem("syg_role");
var syg_room_num = localStorage.getItem("syg_room_num");

if((!syg_role)||(!syg_room_num)){
  alert("Something is wrong :(; Go to " +
    window.location.host + "/scotland_yard to reset");
}

const socket = new WebSocket(
  'ws://'
  + window.location.host
  + '/ws/scotland_yard/'
  + syg_room_num + '/'
  + syg_role + '/'
);

socket.addEventListener('open', function (event) {
    console.log("Socket established");
    socket.send(JSON.stringify({
      'purpose': "setup_server",
      'role': syg_role
    }));
});

socket.addEventListener('close', function (event) {
  console.log("Socket closed " + event.code);
});