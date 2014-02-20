var MainClass = new Class({
	
	initialize: function(){
	},

	ready: function(){
		this.showCalendar('#calendar');

		var events = $('#calendar').fullCalendar('clientEvents');
		console.log(events);

		this.suggestor = new Suggestor(this);
		this.suggestor.findSuggestions();
		
		this.drawSpiderGraph('#spidergraph');

		/*console.log($('#calendar'));

		   $('#popupBox').bPopup({
            fadeSpeed: 'slow', 
            followSpeed: 1500, 
            modal: false
            //modalColor: 'white'
        });*/
	},

	showCalendar: function(div){
		var calendar = $(div).fullCalendar({
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
			aspectRatio: 1.6,
			defaultView: 'agendaWeek',
			
			selectable: true,
			selectHelper: true,
			/*select: function(start, end, allDay) {

				var title = prompt('Event Title:');
				if (title) {
					calendar.fullCalendar('renderEvent',
						{
							title: title,
							start: start,
							end: end,
							allDay: allDay
						},
						true // make the event "stick"
					);
				}
				calendar.fullCalendar('unselect');
			},*/
			editable: true,
			dropable: true,
			
			eventSources: 
				[
					{url: '/php/userData.php'}
				],

			eventClick: function(event, element) {

		        if(event.title == "lifecal")
		        	$('#calendar').fullCalendar('updateEvent', event);

		    },

		});
	},
	
	drawSpiderGraph: function(div){
		$(div).spidergraph({
			'fields': ['live','work','play','rest'],
			'gridcolor': 'rgba(20,20,20,1)'
		});
		$(div).spidergraph('addlayer', { 
			'strokecolor': 'rgba(230,204,0,0.8)',
			'fillcolor': 'rgba(230,204,0,0.6)',
			'data': [5, 4, 9, 8]
		});
		$(div).spidergraph('addlayer', { 
			'strokecolor': 'rgba(230,204,230,0.8)',
			'fillcolor': 'rgba(230,204,230,0.6)',
			'data': [4, 9, 8, 1]
		});
	},

});


var Main = new MainClass();

$(document).ready(function() {
	Main.ready();

}).bind(this);
