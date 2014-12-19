Policy = function( minLength, minNums, minPunct, minSpeChar, colour){
    // the attributes of the policy object should be the specifications for how passwords should look like
    //minimum length of a password
    this.minLength = minLength;
    // maximum length of a password set to a default of 15; should be changed
    this.maxLength = 15;
    // minimum number of numbers
    this.minNums = minNums;
    // minimum number of punctuation signs
    this.minPunct = minPunct;
    // minimum number of special characters, i.e. @, #, %, ^, &, *, ~
    this.minSpeChar = minSpeChar;
    // colour corresponding to the policy
    this.colour = colour;

    // there was no need for methods, as the attributes are set to public
};