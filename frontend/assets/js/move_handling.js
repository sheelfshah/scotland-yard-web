Selectize.define('add_class', function(options) {
  options = $.extend({
        className : 'favorited'
    }, options);

  var addClassMethod = function(thisRef, options) {
    var self = thisRef;
    console.log({'self':self})
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

$(document).ready(function () {
    var $select = $('#move-select').selectize({
      valueField: 'id', labelField: 'text',
      searchField: ['text', 'optgroup'],
      placeholder: "Pick a move...",
      maxItems: 1, maxOptions: 10,
      closeAfterSelect: true,
      plugins: [
        'add_class' 
      ],
    });
    var selectize = $select[0].selectize;
    selectize.addOptionGroup("taxi", {label: "Taxi"});
    selectize.addOptionGroup("bus", {label: "Bus"});
    selectize.addOptionGroup("blackticket", {label: "Black Ticket"});
    selectize.addOption([
      {text: "To 87", id: "something", // moves_dict stringify
      optgroup: "taxi", add_class: "taxi"},
      {text: "To 83", id: "34", // moves_dict stringify
      optgroup: "taxi", add_class: "taxi"},
      {text: "To 83", id: "67", // moves_dict stringify
      optgroup: "bus", add_class: "bus"},
      {text: "To 84", id: "77", // moves_dict stringify
      optgroup: "bus", add_class: "bus"},
      {text: "To 83", id: "57", // moves_dict stringify
      optgroup: "blackticket", add_class: "blackticket"}
    ]);
    selectize.refreshOptions();
    selectize.on('item_add', function(value, $item) {
      alert(value);
      selectize.clear();
      if(value==57){
        selectize.clearOptions(true);
      }
    });
});