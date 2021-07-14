/*
status_update(mssg, duration);
role_to_name(role);
get_player_name(index); // return role
get_next_role(role, prev); // prev is bool
show_stats(role)
show_mrx_stats();
show_circes();
*/

function status_update(mssg, duration) {
  $("#status").fadeIn(100);
  $("#status").text(mssg);
  setTimeout(function() {
    $("#status").fadeOut(100)}, duration);
}

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
  var keys = Object.keys(game_state);
  for(var key in keys){
    if(keys[key][3]==index) return keys[key];
  }
  return "Error";
}

function get_next_role(role, prev){
  if(!role) role = current_stats_role;
  var roll_no = parseInt(role[3]);
  if(prev) roll_no = ((roll_no - 1)%6 + 6) % 6;
  else roll_no = (roll_no + 1)%6;
  return get_player_name(roll_no);
}

function show_stats(role){
  $("#player-stat-name").text(role_to_name(role));
  $("#player-stat-name").css("color", game_state[role].color);
  current_stats_role = role; // global

  $("#player-stat-position").text(""); // clear first
  $("#player-stat-position").text(game_state[role].position);

  var tokens_div = document.getElementById("player-stat-tokens");
  var table = document.createElement("table");
  var tokens = game_state[role].tokens;
  var token_color={
    "taxi": "#ff2", "bus": "#22B49B",
    "underground": "#f22", "double": "#2f2",
    "blackticket": "#000"
  }
  for (var key in tokens) {
    if(tokens[key]>0){ // don't show tokens one doesn't have
      var trow = table.insertRow(-1);
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
  
  var reveal_times = game_state[mrx_role].reveal_times;
  var pre_reveal_time = 0, post_reveal_time = 0;
  for (var i = 0; i < reveal_times.length; i++) {
    // assumes reveal_times is sorted
    if(rounds_played<reveal_times[i]){
      pre_reveal_time = reveal_times[i] - rounds_played;
      if(i > 0){
        post_reveal_time = rounds_played - reveal_times[i-1];
      }
      break;
    }
    pre_reveal_time = 0;
  }
var last_seen = game_state[mrx_role].last_public_position;
  if(last_seen)
    $("#mrx-last-seen").text("MrX was last seen at " + last_seen
      + ", " + post_reveal_time + " rounds ago");
  else $("#mrx-last-seen").text("MrX hsn't been spotted yet");

  if(pre_reveal_time)
    $("#next-reveal-in").text("MrX will be spotted in " + pre_reveal_time + " rounds");
  else $("#next-reveal-in").text("MrX won't be spotted now");
}

function show_circles(){
  // erase prevous drawings always
  function draw_circle(station, color){
    ctx.beginPath();
    ctx.arc(sc[station.toString()]["x"]*factor, sc[station.toString()]["y"]*factor,
        23*factor, 0, 2 * Math.PI);
    ctx.lineWidth = 10*factor;
    ctx.strokeStyle = color;
    ctx.stroke();
  }

  var keys = Object.keys(game_state);
  for(var key in keys){
    if([0,1,2,3,4,5].includes(parseInt(keys[key][3]))){
      if(game_state[keys[key]].position){
        draw_circle(game_state[keys[key]].position, game_state[keys[key]].color);
      }
    }
  }
  var mrx_role = get_player_name(0);
  if(game_state[mrx_role].last_public_position){
    var station = game_state[mrx_role].last_public_position, base = -0.15;
    ctx.beginPath();
    ctx.arc(sc[station.toString()]["x"]*factor, sc[station.toString()]["y"]*factor,
        23*factor, base * Math.PI, (base + 0.6) * Math.PI);
    ctx.lineWidth = 10*factor;
    ctx.strokeStyle = "#333333";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(sc[station.toString()]["x"]*factor, sc[station.toString()]["y"]*factor,
        23*factor, (base + 0.66) * Math.PI, (base + 1.26) * Math.PI);
    ctx.lineWidth = 10*factor;
    ctx.strokeStyle = "#333333";
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(sc[station.toString()]["x"]*factor, sc[station.toString()]["y"]*factor,
        23*factor, (base + 1.33) * Math.PI, (base + 1.93) * Math.PI);
    ctx.lineWidth = 10*factor;
    ctx.strokeStyle = "#333333";
    ctx.stroke();
  }
}