/*
dcopy(x);
move_balls();
create_balls();
path_to_move_dict(path);
*/

function dcopy(x) {
  return JSON.parse(JSON.stringify(x));
}

function path_to_move_dict(path) {
  var move_dict = {
    "role": syg_role,
    "is_double": false,
    "next_position": 0,
    "transport": "",
    "next_to_next_position": null,
    "next_transport": null
  }
  if (path.length > 2 || path.length <= 0) return null;
  if (path.length === 1) {
    move_dict.next_position = path[0][0];
    move_dict.transport = path[0][1];
    return move_dict;
  }
  move_dict.is_double = true;
  move_dict.next_position = path[0][0];
  move_dict.transport = path[0][1];
  move_dict.next_to_next_position = path[1][0];
  move_dict.next_transport = path[1][1];
  return move_dict;
}

function create_balls(n) {
  for (var i = 0; i < n; i++) {
    var $div = $("<div>", {"class": "ball"});
    $("body").append($div);
    $div.offset({
      top: Math.random()*$(window).height(),
      left: Math.random()*$(window).width()
    });
  }
}


function move_balls(){
  $(".ball").each(function(idx) {
    var x1, x2, y1, y2;
    var $this = $(this);
    x1 = $this.offset().left;
    x2 = x1 + $this.width();
    y1 = $this.offset().top;
    y2 = y1 + $this.height();
    if(x1<0){
      vx_balls[idx] = Math.abs(vx_balls[idx]);
    }
    if(x2 > $(window).width() - 10){
      vx_balls[idx] = -Math.abs(vx_balls[idx]);
    }
    if(y1<0){
      vy_balls[idx] = Math.abs(vy_balls[idx]);
    }
    if(y2 > $(window).height()){
      vy_balls[idx] = -Math.abs(vy_balls[idx]);
    }
    $this.offset({ top: y1+vy_balls[idx], left: x1+vx_balls[idx] });
  });
  setTimeout(move_balls, 100);
}