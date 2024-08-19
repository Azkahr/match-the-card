import './style.css'
import { Game } from './Game/game'
import { cardClick, startGame } from './Game/Input/input';

startGame()

let game = new Game();

game.init();

// make it globally accessible
window.cardClick = cardClick;