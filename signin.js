
var api = "http://localhost:3000";

$('#login').on('click', function(e){
  $.ajax( api + '/login',
  {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      credentials: {
        username: $('#username').val(),
        password: $('#user-password').val()
      }
    }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqXHR){
    $('#token').val(data.token);
  }).fail(function(jqXHR, textStatus, errorThrown){
    $('#result').val(errorThrown);
  });
});

// create Run with Ajax
$("#user-create").on('click', function(){
  $.ajax({
    url: '/users',
    method: 'POST',
    data: {
      credentials: {
        username: $("#username").val(),
        password: $("#user-password").val()
      }
    }
  }).done(function(data){
    console.log("I'm a robot that created a user.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

