var MainClass = new Class({
	
	initialize: function(){
	},

	ready: function(){
		this.showCalendar('#calendar');

		this.suggestor = new Suggestor(this);

		this.drawSpiderGraph('#spidergraph');

		/*$(function() {
			$( "#dialog" ).dialog();
		});*/

			/*$('#popupBox').bPopup({
            fadeSpeed: 'slow',
            followSpeed: 1500,
            //modal: false
        });*/
	},

	showPopUp: function(){
		$( "#popUpDialog" ).html("<input type='button' value='yes'>");

		$(function() {
			$( "#popUpDialog" ).dialog();
		});
	},

	makeEventReal: function(event){
		var source = [
				{
					title: event.title,
					start: event.start,
					end: event.end,
					allDay: false,
					editable: false,
					textColor: '#000',
					backgroundColor: '#fff',
					timeFormat: '',
					suggestion: false
				}
		];

		$('#calendar').fullCalendar( 'removeEvents', event._id );
		$('#calendar').fullCalendar( 'addEventSource', source );
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
				console.log(event);

		        if(event.suggestion == true){
		        	this.showPopUp();

		        	//$('#calendar').fullCalendar('updateEvent', event);
		        }

		    }.bind(this),

		});
	},
	
	drawSpiderGraph: function(diva){
		$(diva).spidergraph({
			'fields': ['live','work','play','rest'],
			'gridcolor': 'rgba(20,20,20,0)'
		});
		/*$(diva).spidergraph('addlayer', { 
			'strokecolor': 'rgba(230,230,230,0.8)',
			'fillcolor': 'rgba(0,0,0,0)',
			'data': [9, 14, 19, 13]
		});
		$(diva).spidergraph('addlayer', { 
			'strokecolor': 'rgba(0,0,0,0)',
			'fillcolor': 'rgba(0,0,230,0.6)',
			'data': [4, 9, 8, 1]
		});*/
	}

});


var Main = new MainClass();

$(document).ready(function() {
	Main.ready();

  	

}).bind(this);
