/**
 * Created by andi on 22/12/14.
 */

/**
 * This object is meant to be owned and used by the Player. When placing objects of this type on the map, make sure
 * they belong to the same group as the other pickable objects that only the player can pick up.*/

AntiVirus = function( currentX, currentY ){

    // coordinates
    this.currentX = currentX;
    this.currentY = currentY;

    //visibility ; default is true; assumed it will be placed directly on map
    this.isVisible = true;

    //collidability; default true; assumed it will be placed directly on map
    this.isCollidable = true;

    /*Owner is not a necessary attribute; it can have only one owner: the payer, and he will have a bag where he'll
     * store objects he can pick up. */

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

    // the function responsible for usage of the object on a given room
    this.use = function (room){

        if(typeof (room) === 'object')
            if(room.hasOwnProperty('isInfected')){
                room.switchInfected();         //huzzah! door is healed
                return 1;                       // let the caller know too
            }
        return 0; // otherwise return 0
    }
};