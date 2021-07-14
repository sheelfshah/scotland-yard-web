/*
path_to_text(path);
show_move_panel();
hide_move_panel();
quick_move(new_position);
*/

function path_to_text(path){
  var ans = "Shortest path: ";
  for (var i = 0; i < path.length; i++) {
    ans += path[i][1] + " to " + path[i][0];
    if(i!= path.length-1) ans += ", ";
  }
  return ans;
}

Selectize.define('add_class', function(options) {
  options = $.extend({
    className: 'favorited'
  }, options);

  var addClassMethod = function(thisRef, options) {
    var self = thisRef;
    var original = self.setup;
    self.setup = (function() {

      return function() {
        var option_render = self.settings.render.option;
        self.settings.render.option = function(option) {
          // "render" the original option to get the current HTML
          var html = option_render.apply(self, arguments);

          // modify HTML to add class
          var $html = $(html);
          var classes = $html.attr("class");

          if (option.add_class) {
            $html.addClass(option.add_class)
          }

          // return NEW $html element as HTML string
          return $('<div>').append($html.clone()).html();
        }

        original.apply(self, arguments);
      };
    })();
  }

  addClassMethod(this, options);
  return;
});

function show_move_panel() {
  $select = $('#move-select').selectize({
    valueField: 'id',
    labelField: 'text',
    searchField: ['text', 'optgroup'],
    placeholder: "Pick a move...",
    maxItems: 1,
    maxOptions: 1000,
    closeAfterSelect: true,
    plugins: [
      'add_class'
    ],
  });
  var selectize = $select[0].selectize;
  $('#move-panel').removeClass("hidden");
  selectize.clearOptions(true);
  selectize.addOptionGroup("taxi", { label: "Taxi" });
  selectize.addOptionGroup("bus", { label: "Bus" });
  selectize.addOptionGroup("underground", { label: "Underground" });
  var is_detective = true;
  if (syg_role.slice(0, 3) === "mrx") {
    is_detective = false;
    selectize.addOptionGroup("blackticket", { label: "Black Ticket" });
  }
  let paths = graph.allroutes(
    game_state[syg_role].position, 1, [], is_detective);
  for (var path_i in paths) {
    var path = paths[path_i];
    var path_move_dict = path_to_move_dict(path);
    selectize.addOption({
      text: "To " + path[0][0],
      id: JSON.stringify(path_move_dict),
      optgroup: path[0][1],
      add_class: path[0][1]
    });
  }
  if (!is_detective) {
    selectize.addOptionGroup("double", { label: "Double" });
    let paths = graph.allroutes(
      game_state[syg_role].position, 2, [], is_detective);
    for (var path_i in paths) {
      var path = paths[path_i];
      var path_move_dict = path_to_move_dict(path);
      selectize.addOption({
        text: (path[0][1] + " to " + path[0][0]
          + ", " + path[1][1] + " to " + path[1][0]),
        id: JSON.stringify(path_move_dict),
        optgroup: "double",
        add_class: "double"
      });
    }
  }
  selectize.refreshOptions(false);
  selectize.on('item_add', function(value, $item) {
    if(value && (value != JSON.stringify(latest_move_dict))){
      var move_dict = JSON.parse(value);
      console.log(move_dict);
      play_move(move_dict);
    }
    selectize.clear();
  });
}

function hide_move_panel(){
  var selectize = $select[0].selectize;
  selectize.clearOptions(true);
  selectize.settings.placeholder = 'Wait for your turn';
  selectize.updatePlaceholder();
  $('#move-panel').addClass("hidden");
}

function quick_move(new_position){
  if(game_state.current_playing != syg_role){
    status_update("Not your turn to play", 2500);
    return;
  }
  var is_detective = (syg_role.slice(0, 3) != "mrx");
  let paths = graph.allroutes(
    game_state[syg_role].position, 1, [], is_detective);
  let my_paths = [];
  for (var i = 0; i < paths.length; i++) {
    if(paths[i][0][0] == new_position)
      my_paths.push(paths[i]);
  }

  if(my_paths.length === 0){
    status_update("Can't quick-move to " + new_position, 4000);
    return;
  }
  if(my_paths.length === 1){
    var path_move_dict = path_to_move_dict(my_paths[0]);
    play_move(path_move_dict);
    return;
  }
  var $form = $("#quick-move-form");
  $form.html("");
  for (var i = 0; i < my_paths.length; i++) {
    var path_move_dict = path_to_move_dict(my_paths[i]);
    var $button = $("<button name='transport' type='submit' value='" + 
      JSON.stringify(path_move_dict) + "'>" + my_paths[i][0][1] + "</button>"
      );
    if(my_paths[i][0][1] == "taxi")
      $button.css("color", "#ff2");
    else if(my_paths[i][0][1] == "bus")
      $button.css("color", "#22B49B");
    else if(my_paths[i][0][1] == "underground")
      $button.css("color", "#f22");
    else if(my_paths[i][0][1] == "blackticket")
      $button.css("color", "#000");
    $button.click(function(event) {
      play_move(JSON.parse($(this).val()));
      $("#quick-move-panel").addClass("hidden");
      event.preventDefault();
    });
    $form.append($button);
  }
  $("#quick-move-text").text("Move to " + new_position + " via?");
  $("#quick-move-panel").removeClass("hidden");
}