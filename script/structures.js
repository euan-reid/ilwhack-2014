var Vec2 = new Class({
	initialize: function(x, y){
		this.setX(x);
		this.setY(y);

	},

	getX: function(){
		return this.x;
	},

	getY: function(){
		return this.y;
	},

	setX: function(x){
		if(isFinite(x))
			this.x = x;
	},

	setY: function(y){
		if(isFinite(y))
			this.y = y;
	},

})

var LocTime = new Class({
	initialize: function(location, time){
		this.setLocation(location);
		this.setTime(time);
	},

	getLocation: function(){
		return this.location;
	},

	getX: function(){
		return this.location.x;
	},

	getY: function(){
		return this.location.y;
	},

	getTime: function(){
		return this.time;
	},

	setLocation: function(location){
		if(location instanceof Vec2)
			this.location = new Vec2(location.getX(), location.getY());
		else
			this.location = null;
	},
	setX: function(x){
		if(isFinite(x))
			this.location.x = x;
		else
			this.location.x = null;
	},

	setY: function(y){
		if(isFinite(y))
			this.location.y = y;
		else
			this.location.y = null;
	},

	setTime: function(time){
		if(time)
			this.time = time;
		else
			this.time = null;
	},

});


var Solver = Class({
	initialize: function(main, storedData, callbackFunction){
		this.main = main;
		this.storedData = { init: storedData };
		this.callbackFunction = callbackFunction;
		this.results = [];

		this.iter = 0;

		this.setOfFunctions = new Array();
		this.setOfArgs = new Array();
	},

	addFunction: function(fun, arguments){
		this.setOfFunctions.push(fun);
		this.setOfArgs.push(arguments);
	},

	addResult: function(result){
		//console.log('result');
		this.results[this.iter] = result;

		++this.iter;
		this.run();
	},

	run: function(){
		if(this.iter < this.setOfFunctions.length){

			this.setOfFunctions[this.iter].apply(this, this.setOfArgs[this.iter]);
		} else {
			this.callbackFunction.apply(this.main, [this.results]);
		}

	},




});