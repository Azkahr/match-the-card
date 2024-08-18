import { Game } from "../game";

export function cardClick(event) {
    let game = new Game();
    
    game.flipCard(event);
}