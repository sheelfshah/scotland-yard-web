function role_to_name(role){
  if (role.slice(0, 3) === "mrx"){
    return "MrX " + role.slice(5);
  }
  else if(role.slice(0, 3) === "det") {
    return "Detective" + role[3]+ " " + role.slice(5); 
  }
  return "Error"
}

function get_next_role(role, prev){
  if(!role) role = current_stats_role;
  keys = Object.keys(game_state);
  roll_no = parseInt(role[3]);
  console.log(roll_no, role);
  if(prev) roll_no = ((roll_no - 1)%6 + 6) % 6;
  else roll_no = (roll_no + 1)%6;
  for(var key in keys){
    if(keys[key][3]==roll_no) return keys[key];
  }
  return "Error";
}

function show_stats(role){
  $("#player-stat-name").text(role_to_name(role));
  $("#player-stat-name").removeClass("glow");
  if(role===game_state.current_playing)
    $("#player-stat-name").addClass("glow");
  $("#player-stat-name").css("color", game_state[role].color);
  current_stats_role = role;

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