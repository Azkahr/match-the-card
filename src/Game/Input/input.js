import { Game } from "../game";

export function startGame() {
    const start = document.getElementById('start-game');
    const overlay = document.querySelector('.overlay');
    
    start.addEventListener('click', function(e) {
        overlay.remove()
    })
}

export function cardClick(event) {
    let game = new Game();
    
    game.flipCard(event);
}