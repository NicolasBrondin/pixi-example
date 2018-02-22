var Keyboard = function (keyCode) {
    this.key = {
        code: keyCode,
        isDown: false,
        isUp: true,
        press: undefined,
        release: undefined
    };
    
    this.key.downHandler = function(event) {
        if (event.keyCode === this.key.code) {
            if (this.key.isUp && this.key.press) this.key.press();
            this.key.isDown = true;
            this.key.isUp = false;
        }
        event.preventDefault();
    }.bind(this);


    this.key.upHandler = function(event) {
        if (event.keyCode === this.key.code) {
            if (this.key.isDown && this.key.release) this.key.release();
            this.key.isDown = false;
            this.key.isUp = true;
        }
        event.preventDefault();
    }.bind(this);

    window.addEventListener("keydown", this.key.downHandler.bind(this.key), false);
    
    window.addEventListener("keyup", this.key.upHandler.bind(this.key), false);
    
    return this.key;
};