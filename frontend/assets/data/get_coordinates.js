/*
following parameters used:
width: 1800px;
height: 1345px;
*/

var i=1;

var $mapimg = $("#map-img");
var $mapcanvas = $('#map-canvas');

var canvas = document.getElementById("map-canvas");
var ctx = canvas.getContext("2d");

var coordinates_json = {};


$mapcanvas.click(function (e) { //Relative ( to its parent) mouse position 
        var posX = $(this).position().left,
            posY = $(this).position().top;

        var ptx = (e.pageX - posX), pty = (e.pageY - posY);
        coordinates_json[i.toString()] = {
            "x_coordinate": Math.round(ptx),
            "y_coordinate": Math.round(pty)
        };
        console.log(i.toString()+" "+coordinates_json[i.toString()]["x_coordinate"]+" "+coordinates_json[i.toString()]["y_coordinate"]);
        i+=1;

});