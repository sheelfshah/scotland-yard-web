function handleKey(e) {
  // console.log(e.code);
  if($(".selectize-control").find(".focus").length==0){
    if(e.code == "KeyA"){
      $("#recenter").click();
    }
    if(e.code == "KeyS"){
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
    if(e.code == "KeyD"){
      $select[0].selectize.focus();
    }
    if(e.code == "KeyF"){
      $("#toggle-fullscreen").click();
    }
  }

}