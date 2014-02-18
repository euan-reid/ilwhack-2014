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

});