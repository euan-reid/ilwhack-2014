var Suggestor = new Class({
	initialize: function(main){
		this.main = main;

		setTimeout(function(){
			//this.findSuggestions();
			this.giveSugestionsBasedOnFreeTimes();


			/*var date = new Date();
			var d = date.getDate();
			var m = date.getMonth();
			var y = date.getFullYear();

			var from = new Date(y, m, d, 13, 30);
			var to = new Date(y, m, d, 15, 00);
			this.giveSuggestion(from, to , 'LC');*/
		}.bind(this), 5000);
	},

	findSuggestions: function(data){
		var locator = new Locator(this);

		if(!data[0].location.x){
			var eventData = {
						from: data[0].getTime(),
						to: data[1].getTime(),
						title: "Suggestion",
						location: null,
						reference: "",
						photoUrl: "",
						rating: 1
					};

			this.giveSuggestion(eventData);

		} else {
			locator.giveSuggestion_findAllPossiblePlaces(data, 'store');
		}
	},

	getCallendarEvents: function(){
		var events = $('#calendar').fullCalendar('clientEvents');
		return events;
	},

	giveSuggestion: function(eventData){
		var source = [
				{
					title: eventData.title,
					start: eventData.from,
					end: eventData.to,
					allDay: false,
					editable: false,
					color: '#fff',
					backgroundColor: '#009fe3',
					timeFormat: '',
					location: eventData.location,
					reference: eventData.reference,
					photoUrl: eventData.photoUrl,
					rating: eventData.rating,
					suggestion: true
				}
		];

		$('#calendar').fullCalendar( 'addEventSource', source )
	},

	giveSugestionsBasedOnFreeTimes: function(){
		var events = this.getCallendarEvents();
		console.log('EVENTS:');
		console.log(events);

		events = this.findLonglatForNamesLocations(events);

	},

	findLonglatForNamesLocations: function(events){
		var locator = new Locator(this);
		
		var findLonglatForNamesLocationsCallback = function(pass){
			console.log('HUJAH');
			this.fixLocations(events, pass);
		}.bind(this);

		var action = new Solver(this, events, findLonglatForNamesLocationsCallback);

		$.each(events, function( index, value ) {
			action.addFunction(locator.findProperLocationByName, [value.location]);

		}.bind(this));

		action.run();

	},

	fixLocations: function(events, longlatLocations){
		var arr = new Array();

		console.log('FIX locations');

		$.each(events, function( index, value ) {

			if(longlatLocations[index] == null)
				value.location = null;
			else
				value.location = new Array(longlatLocations[index].getX(), longlatLocations[index].getY());
			arr.push(value);

		}.bind(this));

		this.giveSugestionsBasedOnFreeTimesWithLonglatLocations(arr);
		
	},

	giveSugestionsBasedOnFreeTimesWithLonglatLocations: function(events){
		var lastEvent = null;

		console.log('LOCATIONS:');
		console.log(events);

		$.each(events, function( index, value ) {

			if(lastEvent != null){
				this.findTypeOfSuggestion(lastEvent, value);
			}

			lastEvent = value;

		}.bind(this));
	},

	

	findTypeOfSuggestion: function(firstEvent, secondEvent){
		if(!firstEvent.location || !secondEvent.location)
			return;

		var from = new Date(firstEvent.end);
		var to = new Date(secondEvent.start);
		var timeDifference = this.getTimeInMinutesFromMiliseconds(to-from);

		console.log('trying...' + timeDifference);
		if(timeDifference > 0 && timeDifference <= 120){
			console.log('YEAH');
			var data = new Array(
				new LocTime(new Vec2(firstEvent.location[0], firstEvent.location[1]), from),
				new LocTime(new Vec2(secondEvent.location[0], secondEvent.location[1]), to)
			);

			this.findSuggestions(data);
		}
		
		


	},

	getTimeInMinutesFromMiliseconds: function(time){
		return time/(60*1000);
	},







});