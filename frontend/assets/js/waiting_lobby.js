/*
copy_to_clipboard(text);
show_waiting_lobby();
pro_tips array
*/

function copy_to_clipboard(text) {
    var dummy = document.createElement("textarea");
    // to avoid breaking orgain page when copying more words
    dummy.style.visiilty = 'hidden';
    document.body.appendChild(dummy);
    //Be careful if you use texarea. setAttribute('value', value), which works with "input" does not work with "textarea". – Eduard
    dummy.value = text;
    dummy.select();
    dummy.setSelectionRange(0, 10);
    document.execCommand("copy");
    document.body.removeChild(dummy);
}

pro_tips= [
  // tips
  "It's best to keep MrX away from the River Thames",
  "Moves will be invalid if you are out of tokens",
  "Two detectives are not allowed to be in the same station",
  "Beware of running out of taxis, you might get stuck",
  "There's no going back after you have played a move",

  // tricks
  "Press F11 and go fullscreen for the best experience",
  "Press S to switch between panel configurations",
  "Press F to toggle fullscreen of the map",
  "You can go back to your position with the recenter button<br>\
  Or press A",
  "Too lazy to scroll? You can move around with arrow keys too",
  "Pressing D will display the move panel if it's your turn",
  "Clicking any position will move the map to that position",
  "Use Alt+Click to quick-move to any position in one transport",
  "You can type in the move area to filter moves. Take note MrX",
  
  // lighter comments
  "Keep an eye out at station 130, you might just spot the Queen",
  "Hogwart's Express is waiting for you at station 13 3/4",
  "What did the fish say when it hit a wall? ... Damn",
  "A thief broke into Scotland Yard and stole all the toilets.<br>\
  Police say they have nothing to go on.",
  "I fink there's no trufth in bri ish jokes mate",
]

setTimeout(function() {
  $("#waiting-tip").html(pro_tips[
    Math.floor(Math.random() * pro_tips.length)]);
}, 1000);
var pro_tip_display = setInterval(function() {
  $("#waiting-tip").html(pro_tips[
    Math.floor(Math.random() * pro_tips.length)]);
}, 10*1000);

function show_waiting_lobbby() {
  if(!$("#waiting-lobby").is(':visible'))
    $("#waiting-lobby").fadeIn(300);
  $("#waiting-title").text("Waiting for players to join...");
  $("#room-code").text('' + syg_room_num);
  $("#room-code").click(function() {
    copy_to_clipboard('' + syg_room_num);
    $(this).attr("title", "Copied");
    setTimeout(function() {
      $("#room-code").attr("title", "Click to copy");
    }, 2000);
  });
  $("#waiting-status").text("Share the room code above with "
    +  (6 - game_state.num_players) + " more friends");
  var people_html = "Players in the lobby:<br>\
  <ol>";
  var keys = Object.keys(game_state);
  for(var key in keys){
    var name = keys[key];
    if([0, 1, 2, 3, 4, 5].includes(parseInt(name[3]))){
      name  = name.slice(5);
      if(name != "name")
        people_html += "<li>" + name + "</li>";
      else
        people_html += "<li>?</li>";
    }
  }
  people_html += "</ol>";
  $("#waiting-players").html(people_html);
}

function hide_waiting_lobby(){
  clearInterval(pro_tip_display);
  if($("#waiting-lobby").is(':visible')){
    if(!game_has_started){
      setTimeout(function() {$("#room-code").text("3");}, 700);
      setTimeout(function() {$("#room-code").text("2");}, 1400);
      setTimeout(function() {$("#room-code").text("1");}, 2100);
      setTimeout(function() {
        $("#waiting-lobby").fadeOut(600);
        game_has_started = true;
      }, 2300);
    }
    else
      setTimeout(function() {$("#waiting-lobby").fadeOut(600);}, 300);
  }
}