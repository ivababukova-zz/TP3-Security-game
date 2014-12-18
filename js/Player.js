Player = function(){

    //var currentSprite = path to sprite / name of sprite
    // rolled back to x,y coordinates as using a Coordinate object might mean extra complexity
    var currentX = 50;
    var currentY = 50;
    /* player's item bag - initialised to null; should be set to null when an object is used
     - modelled as a multi-dimensional array to support having more than one type of an object*/
    this.bag = [ [null],
        [null],
        [null]];
    // is visible attribute -  not too sure about use
    this.isVisible = true;
    // is collidable attribute - not sure about use
    this.isCollidable = true;
    // speed attribute - set to 10.0 as a default - might need adjusting according to world
    this.speed = 10.0;
    // the probability of loosing the sheet with passwords
    this.loseNoteChance = 0.25;
    //the actual note
    var note = new Object();

    // getter methods
    this.getX = function() {
        return currentX;
    }

    this.getY = function() {
        return currentY;
    }

    // move method is unnecessary and will/should be handled in the update() function
    // change the speed of the player
    this.changeSpeed = function(toSpeed) {
        this.speed = toSpeed;
    }

    //run animation is handled by the game engine
    /*use item from bag on a specified target - will call the object's "use()" method
     due to small number of objects, will use a swtich case to handle usage*/
    this.useItem = function ( item ){

        switch(item){
            case 'antivirus':
                if(this.bag[0][this.bag[0].length -1] != null)
                    this.bag[0][this.bag[0].length -1].use();  //antivirus will hold position 0
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'anti-keylogger':
                if(this.bag[1][this.bag[1].length -1] != null)
                    this.bag[1][this.bag[1].length -1].use();
                break;

            case 'firewall':
                if(this.bag[2][this.bag[2].length -1] != null)
                    this.bag[2][this.bag[2].length -1].use();
                break;
        }
    }

    //method to add an item to the player's bag; assume item is a string saying what type of item we're adding
    this.addItem = function(item){
        switch(item){
            case 'antivirus':
                this.bag[0].push(item);  //antivirus will hold position 0
                //do nothing if the player doesn't have the object; potentially play a sound to let him know what's going awn.
                break;

            case 'anti-keylogger':
                this.bag[1].push(item); // "item" here will be replaced with an instantiation of the appropriate object
                break;

            case 'firewall':
                this.bag[2].push(item);
                break;
        }
    }

    //method to interact with the friend; should test for proximity of friend when calling this method
    this.interactWithFriend = function(friend){
        // interact with the friend
    }

    // method to be called everytime the user moves (or at every update) that simulates losing the note object
    this.loseNote = function(){

        if(note.size > 0 ) {              // if there's anything worth losing, i.e. if the note is not empty
            var chance = Math.random();
            if(chance > this.loseNoteChance) {
                console.log("lqlqlqlqlq");
            }
            //lose the note, i.e. drop it
        }
    }