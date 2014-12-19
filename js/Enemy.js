/**
 * Created by andi on 19/12/14.
 */
Enemy = function( currentX, currentY){

    // x,y coordinates
    this.currentX = currentX;
    this.currentY = currentY;

    // visibility - set to true?
    this.isVisible = true;
    //collidable set to true
    this.isCollidable = true;
    // speed of the enemy - set to 10.0 by default
    this.speed = 10.0;
    // variable that'll keep track of whether the object is slowed down by firewall
    this.isSlowed = false;
    // logger chance - set to 0.1 by default - set to private as not used outside of object
    var loggerChance = 0.1;
    // room infection chance set to 0.1 by default -  set to private as not used outside of object
    var infectChance = 0.1;


    // get coordinates method omitted as the attributes are public
    // move function handled by engine or not?
    // switchVisible not omitted as the attribute is public
    // same for collision
    // same for speed
    // animation run by engine

    //method used to infect door; set to private as it is called by the breakDoor method upon breaking a door
    var putKeyLogger = function(door){
        // in door implementation, we need to have a method to switch infection on or off
    };

    //method used to infect rooms; set to private as it is called by the breakDoor method upon breaking a door
    var infect = function(room){
        //same goes for room here
    };

    this.breakDoor = function (door){
        // test for door proximity when calling this function; door should be tied to the room, i.e. the room you're passing to

        //test password power on this door
        var passwordStrength = 10;
        //make enemy wait for a set amount of time, according to the strength of the password
        //would be neat if we could implement a waiting bar for when this happens

        // calculated according to passwordStrength
        var timeRemaining = 100;

        while(timeRemaining > 0){
            // wait - look up wait function in Phaser
            timeRemaining--;
        }

        // now let's see if either the door or the room get infected; arguable if we need two separate chances for each
        var infectionChance = Math.random();

        if( infectionChance <= loggerChance) {
            putKeyLogger(door);
        }

        if( infectionChance <= infectionChance) {
            infect(room);
        }
    }
}