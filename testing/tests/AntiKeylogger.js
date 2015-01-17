/**
* Created by kowalsska on 17/01/2014
* Tests for AntiKeylogger.js
*/

define([
    'intern!object',
    'intern/chai!assert',
    'app/AntiKeylogger'
], function (registerSuite, assert, AntiKeylogger) {

	registerSuite({

		name:'AntiKeylogger',

		AntiKeyLogger: function(){

			var object = new AntiKeyLogger(0,0);
			console.log(object.isVisible.toString());

			assert.strictEqual(object.currentX, 0, 'Assigning parameter value to the variable is not correct');
			assert.strictEqual(object.currentY, 0, 'Assigning parameter value to the variable is not correct');


			object.isVisible === true;
			assert.isTrue(this.isVisible, 'Wrong assertion');
		}
	}
	)

});