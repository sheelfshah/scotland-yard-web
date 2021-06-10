var sc = JSON.parse(station_coordinates);

var factor = 2;
var $mapimg = $("#map-img");
var $mapcanvas = $('#map-canvas');

var canvas = document.getElementById("map-canvas");
var ctx = canvas.getContext("2d");


$mapcanvas.click(function (e) { //Relative ( to its parent) mouse position 
        var posX = $(this).position().left,
            posY = $(this).position().top;

        var ptx = (e.pageX - posX)/factor, pty = (e.pageY - posY)/factor;
        
        var station_clicked = -1;

        for (var i = 0; i < sc.length; i++) {
            var dist = (ptx - sc[i]["cx"])**2 + (pty - sc[i]["cy"])**2;
            if (dist < 100) {
                station_clicked = sc[i]["number"];
                break;
            }
        }
        console.log(station_clicked);
        ctx.beginPath();
        ctx.arc(sc[station_clicked-1]["cx"]*factor, sc[station_clicked-1]["cy"]*factor,
            10*factor, 0, 2 * Math.PI);
        ctx.stroke();
});

function scale_stuff(scale) {
    $mapimg.height($mapimg.height()*scale);
    $mapimg.width($mapimg.width()*scale);
    canvas.height = $mapimg.height();
    canvas.width = $mapimg.width();
    console.log(canvas.height);
    factor = factor * scale;
    //redraw circles
}

$("#zoom-in").click(function () {
    scale_stuff(1.15);
});

$("#zoom-out").click(function () {
    scale_stuff(0.8696);
});  