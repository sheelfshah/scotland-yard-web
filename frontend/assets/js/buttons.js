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

$("#toggle-stats").click(function (){
    if(!$("#player-stat-content").is(':visible')){
        $("#player-stat-content").fadeIn(500);
        var new_src = $("#toggle-stats").attr("src").replace("plus", "minus");
        $("#toggle-stats").attr("src", new_src);
        $("#toggle-stats").removeClass("minimized");
        return;
    }
    $("#player-stat-content").fadeOut(500, function(){
        var new_src = $("#toggle-stats").attr("src").replace("minus", "plus");
        $("#toggle-stats").attr("src", new_src);
        $("#toggle-stats").addClass("minimized");
    });
});

$("#toggle-mrx-stats").click(function (){
    if(!$("#mrx-stat-content").is(':visible')){
        $("#mrx-stat-content").fadeIn(500);
        var new_src = $("#toggle-mrx-stats").attr("src").replace("plus", "minus");
        $("#toggle-mrx-stats").attr("src", new_src);
        $("#toggle-mrx-stats").removeClass("minimized");
        return;
    }
    $("#mrx-stat-content").fadeOut(500, function(){
        var new_src = $("#toggle-mrx-stats").attr("src").replace("minus", "plus");
        $("#toggle-mrx-stats").attr("src", new_src);
        $("#toggle-mrx-stats").addClass("minimized");
    });
});

$("#recenter").click(function() {
    goto(game_state[syg_role].position);
});
$("#player-stat-position").click(function(){
    goto(parseInt($(this).text()));
});
$("#mrx-last-seen").click(function(){
    var last_seen = parseInt($(this).text().replace(/\D/g, ""));
    if(last_seen)
        goto(last_seen);
});

$("#prev-stat").click(function(){
    show_stats(get_next_role("", true));
});

$("#next-stat").click(function(){
  show_stats(get_next_role("", false));
});