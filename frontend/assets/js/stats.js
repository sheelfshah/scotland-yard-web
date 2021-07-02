/*
role_to_name(role);
get_player_name(index); // return role
get_next_role(role, prev); // prev is bool
show_stats(role)
show_mrx_stats();
*/

function role_to_name(role){
  if (role.slice(0, 3) === "mrx"){
    return "MrX " + role.slice(5);
  }
  else if(role.slice(0, 3) === "det") {
    return "Detective" + role[3]+ " " + role.slice(5); 
  }
  return "Error"
}

function get_player_name(index){
  keys = Object.keys(game_state);
  for(var key in keys){
    if(keys[key][3]==index) return keys[key];
  }
  return "Error";
}

function get_next_role(role, prev){
  if(!role) role = current_stats_role;
  roll_no = parseInt(role[3]);
  if(prev) roll_no = ((roll_no - 1)%6 + 6) % 6;
  else roll_no = (roll_no + 1)%6;
  return get_player_name(roll_no);
}

function show_stats(role){
  $("#player-stat-name").text(role_to_name(role));
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

function show_mrx_stats(){
  var mrx_role = get_player_name(0);

  var rounds_played = game_state[mrx_role].moves_played;
  $("#rounds-played").text(
    "Round: " + rounds_played);
  var src = [0x22, 0xdd, 0x22], dest = [0xff, 0x6b, 0x5b], steps = 24;
  var col_array = [];
  for (var i = 0; i < src.length; i++) {
    var lambda = rounds_played/steps;
    col_array[i] = src[i]*(1-lambda) + dest[i]*lambda;
  }
  $("#rounds-played").css("color",
    "rgb("+col_array+")");

  var last_transport = game_state[mrx_role].last_transport_used;
  if(last_transport)
    $("#mrx-last-transport").text("MrX used " + last_transport);
  else $("#mrx-last-transport").text("MrX hasn't moved yet");

  var last_seen = game_state[mrx_role].last_public_position;
  if(last_seen)
    $("#mrx-last-seen").text("MrX was last seen at " + last_seen);
  else $("#mrx-last-seen").text("MrX hsn't been spotted yet");
  
  var reveal_times = game_state[mrx_role].reveal_times;
  var pre_reveal_time = 0;
  for (var i = 0; i < reveal_times.length; i++) {
    // assumes reveal_times is sorted
    if(rounds_played<reveal_times[i]){
      pre_reveal_time = reveal_times[i] - rounds_played;
      break;
    }
    pre_reveal_time = 0;
  }
  if(pre_reveal_time)
    $("#next-reveal-in").text("MrX will be spotted in " + pre_reveal_time + " rounds");
  else $("#next-reveal-in").text("MrX won't be spotted now");
}