const characterBlock = `
    <div id="character" style="display: inline-block">
        <div class="char-head"></div>
        <div class="char-body"></div>
        <div class="legs">
            <div data-left-leg class="l-leg"></div>
            <div data-right-left class="r-leg"></div>
        </div>
    </div>
    <div data-stick class="stick"></div>
    </div>
`

class Character {
    constructor(block) {
        this.position = 0;
        this.width = 20;
        this.score = 0;
        this.showCharacter(block);
    }
    showCharacter(block) {
        let ele = document.createElement('div');
        ele.className = 'character';
        ele.innerHTML = characterBlock;
        this.ele = ele;
        this.calculateCharacterInitialPosition(block);
    }
    getLeftLeg() {
        return document.querySelector('[data-left-leg');
    }
    getRightLeg() {
        return document.querySelector('[data-right-leg]');
    }
    getStick() {
        return document.querySelector('[data-stick]');
    }
    getCharacter() {
        return document.querySelector('#character');
    }
    calculateCharacterInitialPosition(block) {
        this.endpoint = parseInt(block.width) - this.width;
        this.ele.querySelector('#character').style.left = `${this.endpoint}px`;
        setTimeout(() => { this.getStick().style.left = `${this.endpoint}px`},100);
    }
    moveCharacter(stickLength, blockGap, nextBlockWidth, callBack, interval) {

        let movePosition;
        if (stickLength >= blockGap && stickLength < blockGap+nextBlockWidth) {
            movePosition = blockGap + nextBlockWidth;
        } else if ( stickLength > blockGap + nextBlockWidth) {
            movePosition = blockGap + nextBlockWidth + 1;
            this.fall = true;
        } else if (stickLength < blockGap) {
            movePosition = stickLength;
            this.fall = true;
        }
        let character = this.ele.querySelector('#character');

        character.style.transition = 'all 2s ease';
        let leftMove = parseFloat(character.style.left) + movePosition;
        character.style.left = `${leftMove}px`;

        if (this.fall) {
            character.style.transform = 'rotate(45deg)';
            alert(`Game Over!! \n\n Score:${this.score}`);
            let highScore = parseInt(window.localStorage.getItem('score')) || 0;
            if (highScore < this.score) {
                window.localStorage.setItem('score', `${this.score}`);
                clearInterval(interval);
            }
            window.location.reload();
        }
        this.score+=1;

        setTimeout(()=> { 
            let stick = this.getStick(); 
            stick.style.visibility = 'hidden'; 
            stick.style.left = `${nextBlockWidth -20}px`;
            this.setScore();
            callBack(nextBlockWidth, character);
        }, 2000);
    }
    setScore() {
        document.querySelector('#current-score').innerHTML = `Score ${this.score}`;
    }
}