var MainClass = new Class({
	
	initialize: function(){
	},

	ready: function(){
		this.locationTest = new Locator();

		//var pointA = new Vec2(55.953252, -3.188267);
		//var pointB = new Vec2(50.075538, 14.437800);

		//var pointA = new Vec2(55.95451,-3.194275);
		//var pointB = new Vec2(55.950137,-3.207836);
		//console.log(this.locationTest.twoPointsDistanceHaversine(pointA, pointB));

		this.showCalendar();

		data = new Array(
			new LocTime(new Vec2(55.962807, -3.186773), 70),
			new LocTime(new Vec2(55.943294, -3.187548), 150)
		);

		this.locationTest.giveSuggestion_findAllPossiblePlaces(data, 'store');
	},

	showCalendar: function(){
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
			},
			titleFormat: {
				month: 'MMMM yyyy',
				week: "d [ MMM]{ '&#8212;' [ d MMM]} yyyy",
				day: 'dddd, MMM d, yyyy'
			},
			firstDay: 1,
			aspectRatio: 1.9,
			defaultView: 'agendaWeek',
			editable: true,
			eventSources: 
				[
					// source with no options
					'https://www.google.com/calendar/feeds/en_gb.uk%23holiday%40group.v.calendar.google.com/public/basic',
					// source WITH options
					// {
						// url: "http://www.google.com/your_feed_url3/",
						// className: 'nice-event'
					// }
					[
						{
							title: 'All Day Event',
							start: new Date(y, m, 1)
						},
						{
							title: 'Long Event',
							start: new Date(y, m, d-5),
							end: new Date(y, m, d-2)
						},
						{
							id: 999,
							title: 'Repeating Event',
							start: new Date(y, m, d-3, 16, 0),
							allDay: false
						},
						{
							id: 999,
							title: 'Repeating Event',
							start: new Date(y, m, d+4, 16, 0),
							allDay: false
						},
						{
							title: 'Meeting',
							start: new Date(y, m, d, 10, 30),
							allDay: false
						},
						{
							title: 'Lunch',
							start: new Date(y, m, d, 12, 0),
							end: new Date(y, m, d, 14, 0),
							allDay: false
						},
						{
							title: 'Birthday Party',
							start: new Date(y, m, d+1, 19, 0),
							end: new Date(y, m, d+1, 22, 30),
							allDay: false
						},
						{
							title: 'Click for Google',
							start: new Date(y, m, 28),
							end: new Date(y, m, 29),
							url: 'http://google.com/'
						}
					]
				]

		});
	},

});


var Main = new MainClass();

$(document).ready(function() {
	Main.ready();

}).bind(this);
