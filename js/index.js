
var api = "http://localhost:3000";

// $(function(){
//   $('.myCarousel').carousel();
// });

$("#test").click(function() {
  $.ajax(api + '/users/' ,
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

  }).fail(function(jqXHR, textStatus, errorThrown){
    //fail
    $('#result').val(errorThrown);
  });
});

var runTemplate = function(run) {
  return "<tr><td>" + run.id + "</td><td>" + run.distance + "</td><td>" + run.time + "</td><td>" + run.speed + "</td><td>" + run.comment + "</td></tr>";
};

var totalsTemplate = function(user){
  var newHTML = '';
  newHTML += totalDistanceTemplate(user);
  $("#distance").html(newHTML);

  newHTML = '';
  newHTML += totalTimeTemplate(user);
  $("#time").html(newHTML);

  newHTML = '';
  newHTML += totalPaceTemplate(user);
  $("#pace").html(newHTML);
};

var totalDistanceTemplate = function(user){
  return "<div id='distance'><h2>Distance</h2><p>Furthest Run: " + user.furthest_run + " miles</p><p>Total Distance: " + user.total_run_distance + " miles</p><p>Average Distance: " + user.average_distance + " miles</p></div>";
};

var totalTimeTemplate = function(user){
  return "<div id='time'><h2>Time</h2><p>Longest Run: " + user.longest_run + " minutes</p><p>Total Time Spent: " + user.total_run_time + " minutes</p><p>Average Duration: " + user.average_duration + " minutes</p></div>";
};

var totalPaceTemplate = function(user){
  return "<div id='pace'><h2>Pace</h2><p>Fastest Run: " + user.fastest_run + " minute miles</p><p>Average Pace: " + user.average_pace + " minute miles</p></div>";
};

var renderRuns = function(){
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
};

var renderTotals = function(id) {
  $.ajax(api + '/users/' + id,
  {
    //dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data, textStatus, jqXHR){
    // console.log(data.user.total_run_distance);
    // var newHTML = '';
    // newHTML += totalDistanceTemplate(data.user);
    // $("#distance").html(newHTML);
    totalsTemplate(data.user);
    console.log(totalDistanceTemplate(data.user));
  }).fail(function(jqXHR, textStatus, errorThrown){
    //fail
    $('#result').val(errorThrown);
  });
};

var runHeader = "<table id='testtable' class='table table-striped'><thead> <tr><th>#</th> <th>Distance</th> <th>Time</th> <th>Pace</th> <th>Comment</th></tr></thead>";

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
    $('#token').val(data.user.token);
    //simpleStorage.set('token',data.token);
    $("#logout").show();
    $("#login").hide();
    $("#user-create").hide();
    renderRuns();
    currentUserID = data.user.id;
    console.log("Your user id is " + currentUserID);
    renderTotals(currentUserID);
    $('body').scrollTo("#newRun", 1700, {offset: {top: -70, left: -100}});
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
        rating: $("#run-rating").val()
      }
    }
  }).done(function(data){
    console.log("I'm a robot that created a run.");
    renderRuns();
    $('body').scrollTo("#runstable", 1700, {offset: {top: -70}});
    renderTotals(currentUserID);
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

var createUser = function(){
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
};

// create user with Ajax
$("#user-create").on('click', function(){
  createUser();
});

$("#sign-up-button").on('click', function(){
  createUser();
});

$("#sign-up-button1").on('click', function(){
  createUser();
});

$("#sign-up-button2").on('click', function(){
  createUser();
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
