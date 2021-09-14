var buttonColors = ["red", "blue", "green", "yellow"]; //register id names inside array

var gamePattern = []; //game pattern starting empty bcz the game hasn't randomly chosen yet

var userClickedPattern = []; //user also hasn't chosen any color

var started = false; //we need to run a part only once, this is what it's for. See code below

var level = 0; //game starts at level 0


$(document).keypress(function() { //at any keypress on keyboard
  if (!started) {

    $("#level-title").text("Level " + level); //change title
    nextSequence(); //run nextSequence() function
    started = true; //change started value to exit this if statement
  }
});


$(".btn").click(function() { //whenever user clicks any of the 4 buttons

  var userChosenColor = $(this).attr("id"); //store that button id into userChosenColor

  userClickedPattern.push(userChosenColor); //and then add to userClickedPattern array

  playsound(userChosenColor); //play sound corresponding to id

  animatePress(userChosenColor); //animate doesn't really matter

//Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence
  checkAnswer(userClickedPattern.length-1);

})

function checkAnswer(currentLevel){ //chosen  previously is

//Write an if statement to check if the most recent user answer is the same as the game patter
  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

    //if so, check that they have finished their sequence with this if statement
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence(); //then call nextSequence() after 1s to get next sequence
      }, 1000)
    }
  } else {
//if not do what's in here
      playsound("wrong");

      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200)

      $("#level-title").text("Game Over, Press Any Key to Restart");

      startOver();
    }
}



function nextSequence() {

  userClickedPattern = []; //each new sequence empty userClickedPattern array to allow him to reenter everything

  level++; //increment level by 1 everytime

  $("#level-title").text("Level " + level); //change text of level-title

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber]; //same thing as on top

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //small animation for when clicked

  playsound(randomChosenColor);

}


function playsound(name) { //playsound function
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) { //add class pressed when pressed

  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){ //reset values of certain elements at new game
  level = 0;

  gamePattern = [];

  started = false;

}
