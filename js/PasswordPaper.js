/**
 * Created by andi on 22/12/14.
 * Password Paper object constructor
 */

/**
 * This object is meant to be owned by the player. If the player drops it, it has to be added to the map, and become
 * pickable. The enemies should be able to pick it up as well. It should be transferable to the friend upon request; yet
 * only as a clone
 * */
PassworPaper = function(){

    // variable to keep track of visibility; set to true as a default
    this.isVisible = false;

    // variable to keep track of collidability; set to false as a default because it will be instantiated as belongig to player
    this.isCollidable = false;

    // it shouldn't have an "owner" per-se, as, if someone owns it, it will become an attribute of the object that will
    // an array to keep track of the passwords written down
    this.passwords = [];

    /* coordinates for the object; if it's not owned, it should appear on the map where it's dropped; if not, its
    default should be -1, -1, so that it's outside out canvas*/
    var currentX = -1;
    var currentY = -1;

    this.isVisible = function(){
        return this.isVisible === true;
    };

    this.isCollidable = function(){
        return this.isCollidable === true;
    };

    this.switchVisible = function(){

        this.isVisible = !this.isVisible;
    }

    this.switchCollidable = function(){

        this.isCollidable = !this.isCollidable;
    }

    this.writePassword = function (password) {

        if(typeof(password) === 'string') {
            this.passwords.push(password);
            return 1; // return 1 for a successful addition
        }
        return 0; // return 0 for a faulty addition, i.e. not a good type of object supplied
    };

    /* the password list should be viewable directly, as in it would be ideal if we could generate a view of the sheet of
     * paper for when the user wants to see it; if we want to do that, we could always just access the list of passwords
      * when generating them, without the need of a method*/

    /* this method should modify the object's coordinates; the place where it's called should be where the object is
     * removed from the owning object's possession, i.e. set it's paperPassword attribute to null */
    this.dropPaper = function ( droppedX, droppedY ){

        currentX = droppedX;
        currentY = droppedY;

        //  make the switch, if the appropriate fields are false
        if( !this.isCollidable && !this.isVisible) {
            this.switchCollidable();
            this.switchVisible();
        }
        // not sure if rendering or placing on the map should be done here
    };

    /* Should be picking up the paper be handled outside the object?
    * If so, then it should update the x, y coordinates to be -1, -1 when it's done
    * and it should set its visibility and collidability attributes to false*/

 };