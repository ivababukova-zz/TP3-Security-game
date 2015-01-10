Friend = function(currentX, currentY){

    //location
    this.currentX = currentX;
    this.currentY = currentY;

    this.isVisible = false;
    this.isCollidable = true;
    //speed attribute set to a default of 10.0
    this.speed = 10.0;
    // password paper set to null by default; will be assigned a clone of the actual object upon player's approval
    this.passwordNote = null;
    // permission to follow player; can be set to true after player interacts with the friend
    this.permission = false;

    this.followPlayer = function(Player){
        //upon the player moving, we need to check in what direction he's gone to and make the friend move after him
        // need to be careful so that he actually moves after the player, and doesn't just teleport near him.
    };

    // function to be called when player agrees to cooperate
    this.getApproval = function(note){
        // friend gets the object (needs changed to clone the object, not a direct reference to it)
        this.passwordNote = note;
        // permission is set to true, so that he can now follow the player around
        this.permission = true;
    };

    //method that alters friend's speed when the player's speed is altered; speed is the speed of the player
    this.changeSPeed = function(speed){
        this.speed = speed;
    }
};