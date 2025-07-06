score = 0;
cross = true;

const audio = new Audio("music.mp3");
const audiogo = new Audio("gameover.mp3");
const audiojump = new Audio("jump.mp3");

let button = document.querySelector(".fa-moon");
let currentMode = "light";

function startGame() {
// Hide the start text
    document.getElementById("startText").style.display = "none";

// Start background music after 1 second
    setTimeout(() => {
        audio.play().catch(err => console.log("Playback blocked:", err));
    }, 500);
    
// Arrow key enable    
    document.onkeydown = function(e){
        if(e.keyCode == 38){
            dino = document.querySelector(".dino");
            dino.classList.add("animateDino");
            audiojump.play();
            setTimeout(() => {
                dino.classList.remove("animateDino");
            },700);
        }

        else if(e.keyCode == 39) {
            dino = document.querySelector(".dino");
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = dinoX + 112 + "px";
        }  

        else if(e.keyCode == 37) {
            dino = document.querySelector(".dino");
            dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
            dino.style.left = (dinoX - 112) + "px";
        }  
    }
// Game Logic
    setInterval(() => {
        dino = document.querySelector(".dino");
        gameOver = document.querySelector(".gameOver");
        obstacle = document.querySelector(".obstacle");

        dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue("left"));
        dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue("top"));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("left"));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue("top"));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);
        if(offsetX < 73 && offsetY < 52){
            gameOver.style.visibility = "visible";
            obstacle.classList.remove("obstacleAni");
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            },1000);
        }
        else if(offsetX < 145 && cross){
            score+=1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);

            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue("animation-duration"));
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
            }, 500);        
        }
    }, 10);

//Update Score
    function updateScore(score) {
        scoreCont.innerHTML = "Your score: " + score;
    }
    document.removeEventListener('click', startGame);
}

document.addEventListener('click', startGame);
