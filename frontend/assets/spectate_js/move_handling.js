/*
path_to_text(path);
*/

function path_to_text(path){
  var ans = "Shortest path: ";
  for (var i = 0; i < path.length; i++) {
    ans += path[i][1] + " to " + path[i][0];
    if(i!= path.length-1) ans += ", ";
  }
  return ans;
}