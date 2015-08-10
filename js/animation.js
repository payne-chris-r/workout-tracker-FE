$("#runsNavBar").click(function() {
  console.log("You clicked runs");
  renderTotals();
  scrollToRuns();
});

$("#addARunNavBar").click(function() {
  console.log("You clicked runs");
  renderTotals();
  scrollToNewRun();
});

var scrollToRuns = function(){
  $('body').scrollTo("#runstable", 1700, {offset: {top: -70}});
};

var scrollToNewRun = function(){
  $('body').scrollTo("#newRun", 1700, {offset: {top: -70}});
};
