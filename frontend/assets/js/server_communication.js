function role_to_name(role){
  if (role.slice(0, 3) === "mrx"){
    return "MrX " + role.slice(5);
  }
  else if(role.slice(0, 3) === "det") {
    return "Detective" + role[3]+ " " + role.slice(5); 
  }
  return "Error"
}

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

function update_game() {
  show_stats(game_state.current_playing);
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

$("#recenter").click(function() {
  goto(game_state[syg_role].position);
});

$("#player-stat-position").click(function(){
  goto(parseInt($(this).text()));
});

function show_stats(role){
  $("#player-stat-name").text(role_to_name(role));
  $("#player-stat-name").removeClass("glow");
  if(role===syg_role) $("#player-stat-name").addClass("glow");
  $("#player-stat-name").css("color", game_state[role].color);

  $("#player-stat-position").text(""); // clear first
  $("#player-stat-position").text(game_state[role].position);

  var tokens_div = document.getElementById("player-stat-tokens");
  var table = document.createElement("table");
  var tokens = game_state[role].tokens;
  var token_color={
    "taxi": "#f6e64e", "bus": "#2EA49B",
    "underground": "#F24736", "double": "#22dd22",
    "blackticket": "#000000"
  }
  for (var key in tokens) {
    if(tokens[key]>0){ // don't show tokens one doesn't have
      trow = table.insertRow(-1);
      var cell = trow.insertCell(-1);
      cell.innerHTML = key;
      cell.style.color = token_color[key];
      cell = trow.insertCell(-1);
      cell.innerHTML = tokens[key];
      cell.style.color = token_color[key];
    }
  }
  tokens_div.innerHTML = "";
  tokens_div.appendChild(table);
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