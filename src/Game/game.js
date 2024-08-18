export class Game {
    constructor() {
        this.images = this.loadImages();
        this.flippedCards = document.getElementsByClassName('open');
    }

    loadImages() {
        const imageContext = require.context('../asset/icons', false, /\.(png|jpe?g|svg)$/);
        return imageContext.keys().map(imageContext);
    }
    
    init() {
        this.initBoard(4, 4)
    }

    // TODO: generate the board
    initBoard(rows, cols) {
        const board = document.querySelector('.board');
        const template = document.getElementById('flip-card-template').content;
        const totalCards = rows * cols;

        // set the CSS grid template dynamically
        board.style.gridTemplateColumns = `repeat(${cols}, 100px)`;

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
    }

    // TODO: flip the card
    flipCard(event) {
        event.classList.add('open');

        // when two cards are flipped, check if they match
        if (this.countFlipped() === 2) this.cardMatched();

        // reset flipped cards if more than 2 cards are open
        if (this.countFlipped() > 2) this.resetFlipped();
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