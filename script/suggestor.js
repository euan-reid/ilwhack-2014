var Suggestor = new Class({
	initialize: function(main){
		this.main = main;

		setTimeout(function(){
			console.log(this.getCallendarEvents());


			var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();
			var from = new Date(y, m, d, 10, 00);
			var to = new Date(y, m, d, 12, 00);
			this.giveSuggestion(from, to , 'LC');

			var from = new Date(y, m, d, 13, 30);
			var to = new Date(y, m, d, 15, 00);
			this.giveSuggestion(from, to , 'LC');
		}.bind(this), 1000);
	},

	findSuggestions: function(){
		var locator = new Locator();

		data = new Array(
			new LocTime(new Vec2(55.962807, -3.186773), 70),
			new LocTime(new Vec2(55.943294, -3.187548), 150)
		);
		locator.giveSuggestion_findAllPossiblePlaces(data, 'store');
	},

	getCallendarEvents: function(){
		var events = $('#calendar').fullCalendar('clientEvents');
		return events;
	},

	giveSuggestion: function(from, to, title){
		var source = [
				{
					title: title,
					start: from,
					end: to,
					allDay: false,
					editable: false,
					color: '#fff',
					backgroundColor: '#009fe3',
					timeFormat: ''
				}
		];

		$('#calendar').fullCalendar( 'addEventSource', source )
	},







});