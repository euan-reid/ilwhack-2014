var MainClass = new Class({
	
	initialize: function(){
		
	},

	ready: function(){
		this.locationTest = new Locator();
	}

});


var Main = new MainClass();

$(document).ready(function() {
	Main.ready();

}).bind(this);
