document.addEventListener('keyup', handleKey);

function handleKey(e) {
  if(e.code == "Tab"){
    if($("#mrx-stat-content").is(':visible')){
        if($("#player-stat-content").is(':visible')) 
            // hide mrx stats
            $("#toggle-mrx-stats").click();
        else 
            // show both
            $("#toggle-stats").click();
    }
    else{
        if($("#player-stat-content").is(':visible'))
            // hide both
            $("#toggle-stats").click();
        else
            // show mrx stats
            $("#toggle-mrx-stats").click();
    }
  }
}