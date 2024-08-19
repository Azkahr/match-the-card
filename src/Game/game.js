import sfx from '../asset/audio/correct-6033.mp3'

export class Game {
    constructor() {
        this.rows = 4;
        this.cols = 4;
        this.images = this.loadImages();
        this.flippedCards = document.getElementsByClassName('open');
        this.matchedCards = document.getElementsByClassName('matched');
    }

    loadImages() {
        // eslint-disable-next-line no-undef
        const imageContext = require.context('../asset/icons', false, /\.(png|jpe?g|svg)$/);
        return imageContext.keys().map(imageContext);
    }
    
    init() {
        this.initBoard()
    }

    // TODO: finish game
    finish() {
        console.log('finish');
    }

    // TODO: generate the board
    initBoard() {
        const board = document.querySelector('.board');
        const template = document.getElementById('flip-card-template').content;
        const totalCards = this.rows * this.cols;

        // set the CSS grid template dynamically
        board.style.gridTemplateColumns = `repeat(${this.cols}, 100px)`;

        // clear the board before generating new cards
        board.innerHTML = '';

        // prepare image pairs
        const imagePairs = this.getImagePairs(totalCards / 2);
        
        // shuffle image pairs
        const shuffledImages = this.shuffleArray([...imagePairs, ...imagePairs]);
        
        for (let i = 0; i < totalCards; i++) {
            // clone the template and append to the board
            const clone = document.importNode(template, true);
            
            this.fillBoard(clone, shuffledImages[i], board);
        }
    }
    
    // TODO: fill the card with according image
    fillBoard(card, imageUrl, board) {
        card.querySelector('.flip-card-back img').src = imageUrl;

        card.querySelector('.flip-card').setAttribute('onclick', 'cardClick(this)');
        
        card.querySelector('.flip-card').setAttribute('data-image', imageUrl);
        
        board.appendChild(card);
    }

    getImagePairs(count) {
        return this.images.slice(0, count).map(image => image);
    }

    // TODO: shuffle image
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    // TODO: card matched
    cardMatched() {
        let audio = new Audio(sfx);

        if (this.flippedCards.length < 2) return;

        const allEqual = arr => arr.every(val => val === arr[0]);

        let flipped = [];

        Array.from(this.flippedCards).forEach(function(card) {
            flipped.push(card.dataset.image);
        });

        if (!allEqual(flipped)) {
            setTimeout(() => {
                this.resetFlipped()
            }, 500);

            return;
        }
        
        Array.from(this.flippedCards).forEach(function(card) {
            card.classList.add('matched');
        });

        audio.play();

        this.resetFlipped();

        if(this.isWin()) this.finish();
    }

    // TODO: flip the card
    flipCard(event) {
        event.classList.add('open');

        // when two cards are flipped, check if they match
        if (this.countFlipped() === 2) this.cardMatched();
    }

    // TODO: count matched card
    isWin() {
        return this.matchedCards.length == this.rows * this.cols;
    }
    
    // TODO: calculate flipped card
    countFlipped() {
        return this.flippedCards.length;
    }
    
    // TODO: reset flipped
    resetFlipped() {
        Array.from(this.flippedCards).forEach(function(card) {
            card.classList.remove('open');
        });
    }
}