var MainClass = new Class({
	
	initialize: function(){
	},

	ready: function(){
		this.showCalendar('#calendar');

		this.suggestor = new Suggestor(this);

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

});


var Main = new MainClass();

$(document).ready(function() {
	Main.ready();

}).bind(this);
