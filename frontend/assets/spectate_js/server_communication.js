/*
update_game();
goto(station);
socket onmessage handler
*/

function update_game() {
  if(game_state.num_players < 6) // change to 6
    show_waiting_lobbby();
  else{
    hide_waiting_lobby();
    scale_stuff(1);
    show_stats(game_state.current_playing);
    show_mrx_stats();
  }
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

function socket_message(){
  socket.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if(data.purpose==="setup_client"){
      syg_role=data.who;
      console.log("setup done")
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
}