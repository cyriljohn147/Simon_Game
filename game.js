var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function startOver()
{
  level=-1;
  gamePattern=[];
  started=false;
  $("#level-title").text("Press A Key to Start");
}

function checkAnswer(currentLevel) 
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
  {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){nextSequence();} , 1000);
    }
  }
  
  else
  {
    console.log("wrong");
    wrongInput();
  }
}

function wrongInput()
{
  $("body").addClass("game-over");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();

  setInterval(function(){
    $("body").addClass("game-over");
    $("body").removeClass("game-over");
  },500);

  startOver();
}

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
