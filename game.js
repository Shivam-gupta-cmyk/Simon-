let buttonColours = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let start = false;
let level = 0;
$(".primary-btn").click(function () {
  if (!start) {
    $("h1").text("Level " + level);
    nextSequence();
    start = true;
  }
});
// $(document).load(function () {
//       if (!start) {
//         $("h1").text("Level " + level);
//         nextSequence();
//         start = true;
//       }

// })
$(".btn").click(function () {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playsound(userChosenColour);
  animatepress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playsound("wrong");
    $("body").addClass("game-over");
    $("h1").text("Game Over, Press Any Key To Restart");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomColour = buttonColours[randomNumber];
  gamePattern.push(randomColour);
  $("#" + randomColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playsound(randomColour);
}
function playsound(currentColour) {
  var audio = new Audio("sounds/" + currentColour + ".mp3");
  audio.play();
}
function animatepress(currentpress) {
  $("#" + currentpress).addClass("pressed");
  setTimeout(function () {
    $("#" + currentpress).removeClass("pressed");
  }, 100);
}
function startOver() {
  gamePattern = [];
  level = 0;
  start = false;
}
