socket.onmessage = function(e) {
  const data = JSON.parse(e.data);
  console.log(data);
}