class Canvas {
    constructor() {
        this.height = '500px';
        this.width = `${window.innerWidth -150}px`;
        this.canvas = '';
        this.stickLength = 0;
        this.currentBlock = 0;
        this.buildCanvas();
        this.initializeStick();
        this.loadScore();
    }
    buildCanvas() {
        let canvas = document.createElement('div');
        canvas.id = "canvas";
        canvas.style.height = this.height;
        canvas.style.width = this.width;
        canvas.style.backgroundColor = 'aquablue';
        this.canvas = canvas;
    }
    run() {
        this.blocks = [];
        let blockWidth = 0;

        while (blockWidth <= parseInt(this.width)) {
            blockWidth += this.createBlock();
        }
        this.createCharacter();
        document.querySelector('#game-canvas').appendChild(this.canvas);
    }
    createCharacter(block) {
        this.char = new Character(this.blocks[0]);
        document.querySelector('#game-canvas').appendChild(this.char.ele);
    }
    createBlock() {
        let blockEle = new Block();
        blockEle.setMargin();
        this.blocks.push(blockEle); 
        this.canvas.appendChild(blockEle.block);
        return parseInt(blockEle.width) + blockEle.getMargin();;
    }
    initializeStick() {
        let isMoving = false;
        let eventStarted = false;
        let blockGap;
        let nextBlockWidth;
        document.addEventListener('keydown', (event) => {
            if (event.code.toLowerCase() === 'arrowup' && !isMoving && window.isAlertClosed) {
                eventStarted = true;
                let stick;
                this.char ? stick = this.char.getStick() : '';
                stick ? stick.style.visibility = 'visible' : '';
                nextBlockWidth = parseFloat(this.blocks[this.currentBlock + 1].width);
                blockGap = parseInt(this.blocks[this.currentBlock].getMargin());
                if (this.stickLength <= (blockGap + nextBlockWidth)) {
                    this.stickLength += 1;
                    stick ? stick.style.height = `${this.stickLength}px` : '';
                } else {
                    this.stickLength = 0;
                    this.char.moveCharacter(this.char.width + nextBlockWidth, 0, 0, () => {}, this.interval);
                    isMoving = true;
                    stick.classList.add('rotate-90');
                    setTimeout(()=> { isMoving = false; stick.classList.remove('rotate-90')}, 2000);
                }
            }
        });
        document.addEventListener('keyup', (event) => {
            if (eventStarted && event.code.toLocaleLowerCase() === 'arrowup' && window.isAlertClosed) {
                eventStarted = false;
                nextBlockWidth = parseInt(this.blocks[this.currentBlock + 1].width);
                blockGap = parseFloat(this.blocks[this.currentBlock].getMargin());
                let stick = this.char.getStick();
                stick.classList.add('rotate-90');
                this.char.moveCharacter(this.stickLength, blockGap, nextBlockWidth, this.removeBlock.bind(this));
                this.stickLength = 0;
                isMoving = true;
                setTimeout(() => {
                    this.stickLength = 0;
                    stick.style.height = 0;
                    isMoving = false;
                    stick.classList.remove('rotate-90');
                    this.createBlock();
                }, 2000);
                this.currentBlock+=1;
            }
        });
    }
    removeBlock(position, character) {
        setTimeout(() => {
            character.style.transition = 'none';
            character.style.left = `${position - 20}px`;
            document.querySelector('#canvas').children[0].remove();
            this.moveBackground();
        }, 100);
    }
    moveBackground() {
        this.interval = setInterval(() => {
            this.canvas.style.backgroundPositionX = `${parseFloat(this.canvas.style.backgroundPositionX || 0) + 1}px`;
        }, 100);
    }
    loadScore() {
        let highscore = parseInt(window.localStorage.getItem('score')) || 0;
        const highScore = `
                <span>High score: ${highscore}</span><br>
                <span id="current-score">Score: 0</span>
        `;
        let el = document.createElement('div');
        el.className = 'high-score';
        el.innerHTML = highScore;
        document.querySelector('#game-canvas').appendChild(el);
    }
}