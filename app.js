/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, dice_save;
init();


document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';

document.getElementById('dice-1').style.display = 'none';
document.getElementById('dice-2').style.display = 'none';

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if (gamePlaying) {
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        //var dice = 6;
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
        /*
        if(dice_save === 6 && dice === 6){
            scores[activePlayer] === 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }
        */
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += (dice1 + dice2);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer()
        }
        /*dice_save = dice;*/
    } 

});

document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // add current score to global score
        scores[activePlayer] += roundScore;
        //update UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer]
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 20;
        }
        //check if player won the game
        if (scores[activePlayer] >= input) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active')
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner')
            gamePlaying = false;
        } else {
            //nextPlayer
            nextPlayer()
        }
    }
    

})

document.querySelector('.btn-new').addEventListener('click', init)

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}



function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}