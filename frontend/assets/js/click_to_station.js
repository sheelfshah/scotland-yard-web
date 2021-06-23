var sc = JSON.parse(station_coordinates);

var factor = 1;
var $mapdiv = $("#map-div");
var $mapimg = $("#map-img");
var $mapcanvas = $('#map-canvas');

var canvas = document.getElementById("map-canvas");
var ctx = canvas.getContext("2d");

$mapcanvas.click(function (e) { //Relative ( to its parent) mouse position 
        var posX_parent = $(this).parent().position().left,
            posY_parent = $(this).parent().position().top,
            posX = $(this).position().left,
            posY = $(this).position().top;

        var ptx = (e.pageX - posX - posX_parent)/factor, pty = (e.pageY - posY - posY_parent)/factor;
        
        var station_clicked = -1;

        for (var i = 1; i <= Object.keys(sc).length; i++) {
            var dist = (ptx - sc[i.toString()]["x"])**2 + (pty - sc[i.toString()]["y"])**2;
            if (dist < 529) {
                station_clicked = i;
                break;
            }
        }
        console.log(station_clicked);
        console.log(ptx+" "+pty);
        console.log(sc[station_clicked.toString()]["x"]+" "+sc[station_clicked.toString()]["y"]);
        ctx.beginPath();
        ctx.arc(sc[station_clicked.toString()]["x"]*factor, sc[station_clicked.toString()]["y"]*factor,
            23*factor, 0, 2 * Math.PI);
        ctx.lineWidth = 4*factor;
        ctx.stroke();
});

function scale_stuff(scale) {
    $mapimg.height($mapimg.height()*scale);
    $mapimg.width($mapimg.width()*scale);
    canvas.height = $mapimg.height();
    canvas.width = $mapimg.width();
    factor = factor * scale;
    //redraw circles
}

$("#zoom-in").click(function () {
    scale_stuff(1.15);
});

$("#zoom-out").click(function () {
    scale_stuff(0.8696);
});  