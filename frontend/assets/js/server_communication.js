/*
status_update(mssg, duration);
play_move(move_dict);
update_game();
goto(station);
socket onmessage handler
*/

function status_update(mssg, duration) {
  $("#status").fadeIn(100);
  $("#status").text(mssg);
  setTimeout(function() {
    $("#status").fadeOut(100)}, duration);
}

function play_move(move_dict) {
  latest_move_dict = JSON.parse(JSON.stringify(move_dict));
  socket.send(JSON.stringify({
    'purpose': "play_move",
    'who': syg_role,
    'move_dict': move_dict
  }));
}

function update_game() {
  show_stats(game_state.current_playing);
  show_mrx_stats();
  if (game_state.current_playing === syg_role)
    show_move_panel();
  console.log("game updated");
}

function goto(station){
  var gotox = sc[station.toString()]["x"]*factor;
  var gotoy = sc[station.toString()]["y"]*factor;
  var mapdiv = document.getElementById("map-div");
  gotox -= $mapdiv.width() / 2;
  gotoy -= $mapdiv.height() / 2;
  mapdiv.scrollTo(gotox, gotoy);
}

socket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  if(data.purpose==="setup_client"){
    syg_role=data.who;
    console.log("setup done")
    return;
  }
  else if(data.purpose==="move_reply"){
    if(data.success){
      hide_move_panel();
      if(data.move_dict===latest_move_dict){
        console.log("Move played");
        return;
      }
      console.log("Wrong move played... oops");
      return;
    }
    status_update("The move is invalid, try some other move", 2000);
    return;
  }
  else if(data.purpose==="game_update"){
    game_state = data.game_state;
    update_game();
    return;
  }
  else if(data.purpose==="game_end"){
    reason = data.reason;
    status_update(reason, 10000);
    return;
  }
}