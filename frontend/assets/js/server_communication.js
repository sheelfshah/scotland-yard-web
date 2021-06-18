function play_move() {
  // temporary
  move_dict={
    "role": syg_role,
    "is_double": false,
    "next_position": 8,
    "transport": "taxi",
    "next_to_next_position": null,
    "next_transport": null
  }
  latest_move_dict = JSON.parse(JSON.stringify(move_dict));
  socket.send(JSON.stringify({
    'purpose': "play_move",
    'who': syg_role,
    'move_dict': move_dict
  }));
}

socket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  if(data.purpose==="setup_client"){syg_role=data.who; return;}
  else if(data.purpose==="move_reply"){
    if(data.success){
      if(data.move_dict===latest_move_dict){
        console.log("Move played");
        return;
      }
      console.log("Wrong move played... oops");
      return;
    }
    alert("The move is invalid, try some other move");
    return;
  }
  else if(data.purpose==="game_update"){
    game_state = data.game_state;
    update_game();
    return;
  }
  else if(data.purpose==="game_end"){
    reason = data.reason;
    alert(reason);
    return;
  }
}