var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPatter = [];

var level = 0;

var started = false;

$(document).keypress(function () {  
    if (!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }

});

$(".btn").click(function (e){
    var userChosenCoulour = $(this).attr("id");
    animatePress(userChosenCoulour);

    userClickedPatter.push(userChosenCoulour);

    if( checkAnswer(userClickedPatter.length - 1) != "nope"){
        playSound(userChosenCoulour);
    }

});

function nextSequence(){
    level ++;
    $("h1").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    playSound(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

}

function playSound(name){
    var sound = new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel){
    if ( userClickedPatter[currentLevel] === gamePattern[currentLevel]){
        console.log("Correct")
    } else {
        startOver()
        return "nope"
    }

    if ( userClickedPatter.length === gamePattern.length){
        setTimeout(() => {
           nextSequence() 
           userClickedPatter = [];
        }, 1000);
    }
}

function startOver(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart")
    playSound("wrong")
    level = 0
    gamePattern = [] 
    userClickedPatter = []
    started = false

}