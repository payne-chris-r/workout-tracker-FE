
var api = "http://localhost:3000";

$("#test").click(function() {
  console.log("You clicked test");
  //$('#runstable')[0].scrollIntoView({behavior: "smooth", block: "start"});
  $('body').scrollTo("#runstable", 1700, {offset: {top: -70}});
});

var runTemplate = function(run) {
  return "<tr><td>" + run.id + "</td><td>" + run.distance + "</td><td>" + run.time + "</td><td>" + run.speed + "</td><td>" + run.comment + "</td></tr>";
};

var runHeader = "<table id='testtable' class='table table-striped'><thead> <tr><th>#</th> <th>Distance</th> <th>Time</th> <th>Pace</th> <th>Comment</th></tr></thead>";

$('#show').on('click', function(e){
  console.log("You clicked show.");
  $.ajax(api + '/runs',
  {
    // dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data, textStatus, jqXHR){
    //done
    console.log("Success!");
    console.log(JSON.stringify(data));

    var newHTML = runHeader;
    console.log(data.runs);
    data.runs.forEach(function(run){
      newHTML += runTemplate(run);
    });
    newHTML += "</table>";
    $("#runsSection").html(newHTML);

  }).fail(function(jqXHR, textStatus, errorThrown){
    //fail
    $('#result').val(errorThrown);
  });
});

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
    $("#logout").show();
    $("#login").hide();
    $("#user-create").hide();
    $('body').scrollTo("#runstable", 1700, {offset: {top: -70}});
  }).fail(function(jqXHR, textStatus, errorThrown){
    $('#result').val(errorThrown);
  });
});

// create Run with Ajax
$("#run-create").on('click', function(){
  var pace = (($("#run-time").val()) / ($("#run-distance").val()));
  $.ajax({
    url: api + '/runs',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    },
    data: {
      run: {
        distance: Number($("#run-distance").val()),
        time: $("#run-time").val(),
        speed: pace,
        comment: $("#run-comment").val(),
        date: $("#run-date").val(),
        rating: $("#run-rating").val(),
        user_id: $("#user-id").val()
      }
    }
  }).done(function(data){
    console.log("I'm a robot that created a run.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//update Run with Ajax
$("#run-update").on('click', function(){
  var pace = (($("#run-time").val()) / ($("#run-distance").val()));
  console.log("Pace is " + pace);
  console.log("URL is " + api + '/runs/' + $("#run-id").val());
  $.ajax({
    url: api + '/runs/' + $("#run-id").val(),
    contentType: 'application/json',
    processData: false,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    },
    data: JSON.stringify({
      run: {
        distance: Number($("#run-distance").val()),
        time: $("#run-time").val(),
        speed: pace,
        comment: $("#run-comment").val(),
        date: $("#run-date").val(),
        rating: $("#run-rating").val()
      }
    })
  }).done(function(data){
    console.log("I'm a robot that updated a run.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//destroy Movies with Ajax
$("#run-destroy").on('click', function(){
  $.ajax({
    url: api + '/runs/' + $("#run-id").val(),
    method: 'DELETE'
  }).done(function(data){
    console.log("I'm a robot that DELETED a run.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//display run image with ajax
  // $("#movie-display").on('click', function(){
  //   $.ajax({
  //     url: '/movies/' + $("#movie-id").val(),
  //     method: 'GET'
  //   }).done(function(data){
  //     console.log(data);
  //     $("#movie-image").html("<img src=" + data.poster_src + ">");
  //   }).fail(function(data){
  //     console.log("YOU DONE FUCKED UP NOW!");
  //   });
  // });

// create Run with Ajax
$("#user-create").on('click', function(){
  $.ajax({
    url: api + '/users',
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

//update user with Ajax
$("#user-update").on('click', function(){
  $.ajax({
    url: api + '/users/' + $("#user-id").val(),
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    },
    data: {
      credentials: {
        username: $("#username").val(),
        password: $("#user-password").val()
      }
    }
  }).done(function(data){
    console.log("I'm a robot that updated a user.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//destroy Movies with Ajax
$("#user-destroy").on('click', function(){
  $.ajax({
    url: api + '/users/' + $("#user-id").val(),
    method: 'DELETE'
  }).done(function(data){
    console.log("I'm a robot that DELETED a user.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

// create Run with Ajax
$("#profile-create").on('click', function(){
  $.ajax({
    url: api + '/profiles',
    method: 'POST',
    headers: {
       Authorization: 'Token token=' + $('#token').val()
    },
    data: {
      profile: {
        first_name: ($("#first-name").val()),
        last_name: $("#last-name").val(),
        middle_name: $("#middle-name").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        picture: $("#picture").val(),
        description: $("#profile-description").val(),
        dob: $("#dob").val(),
        user_id: $("#user-id").val()
      }
    }
  }).done(function(data){
    console.log("I'm a robot that created a profile.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

$("#profile-update").on('click', function(){
  $.ajax({
    url: api + '/profiles/' + $("#profile-id").val(),
    contentType: 'application/json',
    processData: false,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    },
    data: JSON.stringify({
      profile: {
        first_name: ($("#first-name").val()),
        last_name: $("#last-name").val(),
        middle_name: $("#middle-name").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        picture: $("#picture").val(),
        description: $("#profile-description").val(),
        dob: $("#dob").val()
      }
    })
  }).done(function(data){
    console.log("I'm a robot that updated a profile.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//destroy Movies with Ajax
$("#profile-destroy").on('click', function(){
  $.ajax({
    url: api + '/profiles/' + $("#profile-id").val(),
    method: 'DELETE'
  }).done(function(data){
    console.log("I'm a robot that DELETED a profile.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

$("#goal-create").on('click', function(){
  var pace = (($("#goal-time").val()) / ($("#goal-distance").val()));
  $.ajax({
    url: api + '/goals',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    },
    data: {
      goal: {
        distance: Number($("#goal-distance").val()),
        time: $("#goal-time").val(),
        speed: pace
      }
    }
  }).done(function(data){
    console.log("I'm a robot that created a goal.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//update goal with Ajax
$("#goal-update").on('click', function(){
  var pace = (($("#goal-time").val()) / ($("#goal-distance").val()));
  console.log("Pace is " + pace);
  console.log("URL is " + api + '/goals/' + $("#goal-id").val());
  $.ajax({
    url: api + '/goals/' + $("#goal-id").val(),
    contentType: 'application/json',
    processData: false,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    },
    data: JSON.stringify({
      goal: {
        distance: Number($("#goal-distance").val()),
        time: $("#goal-time").val(),
        speed: pace
      }
    })
  }).done(function(data){
    console.log("I'm a robot that updated a goal.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});

//destroy Movies with Ajax
$("#goal-destroy").on('click', function(){
  $.ajax({
    url: api + '/goals/' + $("#goal-id").val(),
    method: 'DELETE'
  }).done(function(data){
    console.log("I'm a robot that DELETED a goal.");
  }).fail(function(data){
    console.log("YOU DONE FUCKED UP NOW!");
  });
});
