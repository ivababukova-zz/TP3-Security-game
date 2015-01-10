/**
 * Created by andi on 22/12/14.
 */
/**
 * This object is meant to be used by the user. Its function is to slow down/kill enemies.
 * As opposed to other objects, it has two different states on the map: static, pickable object, and static actual
 * wall of fire.
 * */

// assumed instantiation on the map
Firewall = function(currentX, currentY){

    // coordinates
    this.currentX = currentX;
    this.currentY = currentY;

    //visibility ; default is true; assumed it will be placed directly on map
    this.isVisible = true;

    //collidability; default true; assumed it will be placed directly on map
    this.isCollidable = true;

    // a number of seconds the firewall is active; set to a default of 30
    var activeTime = 30;

    /* Is active is not necessary, because it will ever be in each state once, or it might never be used. It's either
    * inactive in the player's bag, or it's active on the screen, after the player use()ses it.*/
    this.isVisible = function(){
        return this.isVisible === true;
    };

    this.isCollidable = function(){
        return this.isCollidable === true;
    };

    // getCoordinates is not necessary as the coordinates attribute are public

    this.switchVisible = function(){
        this.isVisible = !this.isVisible;
    };
    this.switchCollidable = function(){

        this.isCollidable = !this.isCollidable;
    };

    // the use function
    this.use = function (useX, useY){

        // first off, we update its coordinates on the map
        this.currentX = useX;
        this.currentY = useY;

        // set it to visible and collidable; this function can't be called again on the object, so it's safe to assume
        //that both attributes are set to false
        this.switchCollidable();
        this.switchVisible();


        // then... we need to load up the new sprite

        // it needs to spread out on the length of the room; how to determine which direction to expand in
        // upon use, a new group needs to be created to simulate collision
    }
};