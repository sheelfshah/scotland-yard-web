var sc = JSON.parse(station_coordinates);
var factor = 2;

$('img').click(function (e) { //Relative ( to its parent) mouse position 
        var posX = $(this).position().left,
            posY = $(this).position().top;

        var ptx = (e.pageX - posX)/factor, pty = (e.pageY - posY)/factor;
        
        var station_clicked = -1;

        for (var i = 0; i < sc.length; i++) {
            var dist = (ptx - sc[i]["cx"])**2 + (pty - sc[i]["cy"])**2;
            if (dist < 100) {
                station_clicked = sc[i]["number"];
            }
        }
        alert(station_clicked);
});

$("#zoom-in").click(function(){
    $("img").height($("img").height()*1.1);
    $("img").width($("img").width()*1.1);
    factor = factor * 1.1;
});

$("#zoom-out").click(function(){
    $("img").height($("img").height()*0.909);
    $("img").width($("img").width()*0.909);
    factor = factor * 0.909;
});