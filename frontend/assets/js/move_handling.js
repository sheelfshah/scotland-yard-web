/*
show_move_panel();
hide_move_panel();
*/

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