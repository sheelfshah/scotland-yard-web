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