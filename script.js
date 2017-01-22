$(function() {
  var sock = new WebSocket("ws://localhost:8000");
  var uid = null;
  var sendMsg = function() {
    var name = $("#name").val();

    if (name == '') {
      return false;
    }

    var message = $("#message").val();
    var payload = {name: name, message: message};
    sock.send(JSON.stringify(payload));
    $("#message").val('');
  };

  if (sock) {
    //alert("Got a new websocket connection.");
    sock.onopen = function() {
    //  sock.send("New connection"); 
    };
    sock.onmessage = function(message) {
      var payload = JSON.parse(message.data);
      if (uid == null) {
        uid = payload.uid;
      }
      console.log(payload);
      var p = $("<p>").appendTo("#output");
      $("<strong>").text(payload.name+": ").appendTo(p);
      p.append(payload.message);
      //$("<p>").text(message.data).appendTo("#output");
    };

    $("#send").on('click', sendMsg); 

    $("#message").on('keyup', function(evt) {
      if (evt.keyCode == 13) {
        sendMsg();        
      }
    });

    sock.onclose = function() {
      sock.send(JSON.stringify({uid: uid, event: "close"}));
    };
  }
});
