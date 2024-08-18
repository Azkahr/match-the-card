import './style.css'
import { Game } from './Game/game'
import { cardClick } from './Game/Input/input';

let game = new Game();

game.init();

// make it globally accessible
window.cardClick = cardClick;