 let score = JSON.parse(localStorage.getItem('score')) || {
      wins: 0,
      losses: 0,
      tie: 0
    };

    updateScoreElement();

    function updateScoreElement(){
       document.querySelector('.js-score').innerHTML = 
    `Wins: ${score.wins}, Losses: ${score.losses}, ties: ${score.tie}`;
    }
    

    function pickComputerMove(){
      const random = Math.random();
      let computerMove = '';

      if(random >= 0 && random < 1/3){
        computerMove = 'rock'
      }
      else if(random >= 1/3 && random < 2/3){
        computerMove = 'paper'
      }
      else{
        computerMove = 'scissors'
      }

      return computerMove;
    }

    let isAutoPlaying = false;
    let intervalId;
    function autoPlay(){
      if(!isAutoPlaying){
        document.querySelector('.js-auto-play-button').innerHTML = 'Stop Playing';
        intervalId = setInterval(function(){
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 1000)
        isAutoPlaying = true;
      }
      else{
        document.querySelector('.js-auto-play-button').innerHTML = 'Auto Play';
        clearInterval(intervalId);
        isAutoPlaying = false;
      }
    };

    function resetScore(){
      document.querySelector('.js-confirm-msg').innerHTML = `<p> Are you sure you want to reset? <button class = "confirm-button js-reset-yes">Yes</button> <button class="confirm-button js-reset-no">No</button>`;
      document.querySelector('.js-reset-yes').addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.tie = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        document.querySelector('.js-confirm-msg').innerHTML = '';
      });
      document.querySelector('.js-reset-no').addEventListener('click', () => {
        document.querySelector('.js-confirm-msg').innerHTML = '';
      })
    }

    document.querySelector('.js-rock-button').addEventListener('click', () =>{
      playGame('rock');
    });

    document.querySelector('.js-scissors-button').addEventListener('click', () =>{
      playGame('scissors');
    });

    document.querySelector('.js-paper-button').addEventListener('click', () =>{
      playGame('paper');
    });

    document.querySelector('.js-auto-play-button').addEventListener('click', () =>{
      autoPlay();
    });

    document.querySelector('.js-reset-score').addEventListener('click', () => resetScore());

    document.body.addEventListener('keydown', (event) =>{
      if(event.key === 'r'){
        playGame('rock');
      }
      else if(event.key === 'p'){
        playGame('paper');
      }
      else if(event.key === 's'){
        playGame('scissors');
      }
      else if(event.key === 'a'){
        autoPlay();
      }
      else if(event.key === 'Backspace'){
        resetScore();
      }
    });

    function playGame(playerMove){
      const computerMove = pickComputerMove();

      console.log(computerMove);
      result = ''
      if(playerMove === 'scissors'){

        if(computerMove === 'rock'){
          result = 'You lose';
        }
        else if(computerMove === 'paper'){
          result = 'You win';
        }
        else if (computerMove === 'scissors'){
          result = 'You tie';
        }
      }

        if(playerMove === 'paper'){
          if(computerMove === 'rock'){
            result = 'You win';
          }
          else if(computerMove === 'paper'){
            result = 'You tie';
          }
          else if (computerMove === 'scissors'){
            result = 'You lose';
          }
        }

        if(playerMove === 'rock'){
          if(computerMove === 'rock'){
            result = 'You tie';
          }
          else if(computerMove === 'paper'){
            result = 'You lose';
          }
          else if (computerMove === 'scissors'){
            result = 'You win';
          }
        }

        if(result === 'You win'){
          score.wins += 1;
        }
        else if(result === 'You lose'){
          score.losses += 1;
        }
        else{
          score.tie += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));
        updateScoreElement();

        document.querySelector('.js-result').innerHTML = 
        `${result}`;
        document.querySelector('.js-moves').innerHTML =
        `You
    <img class="move-icon" src="images/${playerMove}-emoji.png"/>
    <img class="move-icon" src="images/${computerMove}-emoji.png"/>
    Computer`;
        /*alert(`You picked ${playerMove}. Computer picked ${computerMove}. ${result}.
Wins: ${score.wins}, Losses: ${score.losses}, ties: ${score.tie}`);*/

    }

