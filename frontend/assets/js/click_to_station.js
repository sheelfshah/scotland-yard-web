/*
click event handler of $mapcanvas
cale_stuff(scale);
*/

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
