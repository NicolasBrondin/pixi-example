var Game = function(){

    this.stage = new PIXI.Container();
    this.background;
    this.player;
    this.house;
    this.water;
    this.renderer;
    
    this.init = function(){
        
        //Create the renderer
        this.renderer = PIXI.autoDetectRenderer(850, 550);
        

        //Add the canvas to the HTML document
        document.body.appendChild(this.renderer.view);

        //Create a container object called the `stage`
        this.stage = new PIXI.Container();
        this.background;
        this.player;
        this.house;
        this.water;
    
        utils.load_file("data/house1.json", function(data){
            this.house = data;
            console.log(this.house);
        }.bind(this));

        PIXI.loader
        .add("img/background.png")
        .add("img/Character.png")
        .add("img/water-1.png")
        .add("img/water-2.png")
        .add("img/water-3.png")
        .load(this.loaded);
    };
    
    this.loaded = function(){
        
        //Create the `background` sprite from the texture
        this.background = new PIXI.Sprite( PIXI.loader.resources["img/background.png"].texture );

        //Create the `player` sprite from the texture
        this.player = new PIXI.Sprite( PIXI.loader.resources["img/Character.png"].texture );
        this.player.x = 25; this.player.y = 325; this.player.vx = 0; this.player.vy = 0;  this.player.r=0;
        this.player.anchor.x = 0.5; this.player.anchor.y = 0.5;

        this.water = new PIXI.extras.AnimatedSprite([
            PIXI.loader.resources["img/water-1.png"].texture,
            PIXI.loader.resources["img/water-2.png"].texture,
            PIXI.loader.resources["img/water-3.png"].texture
        ]);

        this.water.x = 150; this.water.y = 0; this.water.animationSpeed = 0.1;
        this.water.loop= true; this.water.play();
        
        this.stage.addChild(this.background);
        this.stage.addChild(this.player);
        this.stage.addChild(this.water);
        
        var left = new Keyboard(37),
            up = new Keyboard(38),
            right = new Keyboard(39),
            down = new Keyboard(40);
        
        //Left 
        left.press = function() {

            if(utils.toDeg(this.player.r) == -90){
                this.player.vx = -1;
            }
            
            this.player.r = utils.toRad(-90);
            this.player.vy = 0;

        }.bind(this);


        left.release = function() {
            if (!right.isDown && this.player.vy === 0) {
                this.player.vx = 0;
            }
        }.bind(this);

        //Up
        up.press = function() {
            
            this.player.vx = 0;
            if(utils.toDeg(this.player.r) == 0){
                this.player.vy = -1;
            }
            this.player.r = utils.toRad(0);

        }.bind(this);
        
        up.release = function() {
            if (!down.isDown && this.player.vx === 0) {
                this.player.vy = 0;
            }
        }.bind(this);

        //Right
        right.press = function() {
            if(utils.toDeg(this.player.r) == 90){
            this.player.vx = 1;
            }
            this.player.vy = 0;
            this.player.r = utils.toRad(90);

        }.bind(this);
        
        right.release = function() {
            if (!left.isDown && this.player.vy === 0) {
                this.player.vx = 0;
            }
        }.bind(this);

        //Down
        down.press = function() {
            if(utils.toDeg(this.player.r) == 180){
            this.player.vy = 1;
            }
            this.player.vx = 0;
            this.player.r = utils.toRad(180);
        }.bind(this);
        
        down.release = function() {
            if (!up.isDown && this.player.vx === 0) {
                this.player.vy = 0;
            }
        }.bind(this);

        //Start the game loop
        this.run();

    }.bind(this);
    
    this.run = function(dt){

        //Loop this function 60 times per second
        requestAnimationFrame(this.run);
        
        this.update(dt);
        //Render the stage
        this.render();

    }.bind(this);
    
    this.update = function(dt){

        var square = this.house.grid[Math.floor(this.player.y/50)][Math.floor(this.player.x/50)];

        //Check collision
        if( ( !square.walls.top     || this.player.vy >= 0 )  &&
            ( !square.walls.bottom  || this.player.vy <= 0 )  &&
            ( !square.walls.right   || this.player.vx <= 0 )  &&
            ( !square.walls.left    || this.player.vx >= 0 ) ) {

            this.player.x += this.player.vx*50;
            this.player.y += this.player.vy*50;

        }
        
        //Check shower animation
        if(square.shower){
            this.water.visible = true;
        } else {
            this.water.visible = false;
        }

        //Reset player velocity
        this.player.vx = 0;
        this.player.vy = 0;

        //Apply computed rotation
        this.player.rotation = this.player.r;

    };

    this.render = function(){
        this.renderer.render(this.stage);
    };
    
    this.init();
         
};