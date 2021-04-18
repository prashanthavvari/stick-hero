class Block {
    constructor() {
        this.height = '80px';
        this.width = `${Math.floor((Math.random() * 90) + 10) + 30}px`;
        this.backgroundColor = 'black';
        this.buildBlock();
    }
    buildBlock() {
        let element = document.createElement('div');
        element.style.backgroundColor = this.backgroundColor;
        element.style.height = this.height;
        element.style.width = this.width;
        this.block = element;
        //document.querySelector('.game-canvas-list').appendChild(element);
    }
    setMargin() {
        this.marginRight = Math.floor(Math.random() * 50 + 10);
        this.block.style.marginRight = `${this.marginRight}px`;
    }
    getMargin() {
        return parseInt(this.marginRight) || 10;
    }
}