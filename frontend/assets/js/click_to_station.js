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
        if(station_clicked<=0) return;
        path = graph.minimum_token_path(
            game_state[syg_role].position, station_clicked);
        console.log(path);
        /*ctx.beginPath();
        ctx.arc(sc[station_clicked.toString()]["x"]*factor, sc[station_clicked.toString()]["y"]*factor,
            23*factor, 0, 2 * Math.PI);
        ctx.lineWidth = 4*factor;
        ctx.stroke();*/
});

function scale_stuff(scale) {
    if(factor*scale<=1.7 && factor*scale>=0.4){
        $mapimg.height($mapimg.height()*scale);
        $mapimg.width($mapimg.width()*scale);
        canvas.height = $mapimg.height();
        canvas.width = $mapimg.width();
        factor = factor * scale;
        //redraw circles
    }
}

$("#zoom-in").click(function () {
    var timesRun = 0;
    var scale_loop = setInterval(function(){
        timesRun += 1;
        if(timesRun >= 10){
            clearInterval(scale_loop);
        }
        scale_stuff(1.01);
    }, 25);
});

$("#zoom-out").click(function () {
    var timesRun = 0;
    var scale_loop = setInterval(function(){
        timesRun += 1;
        if(timesRun >= 10){
            clearInterval(scale_loop);
        }
        scale_stuff(0.99);
    }, 25);
});  

$("#toggle-fullscreen").click(function (){
    if($mapdiv.width()/$(window).width() >= 0.8){
        $mapdiv.width("75vw");
        $mapdiv.height("90vh");
        var new_src = $($(this).children()[0]).attr("src").replace("compress", "expand");
        $($(this).children()[0]).attr("src", new_src);
        return;
    }
    $mapdiv.width("100vw");
    $mapdiv.height("100vh");
    var new_src = $($(this).children()[0]).attr("src").replace("expand", "compress");
    $($(this).children()[0]).attr("src", new_src);
});