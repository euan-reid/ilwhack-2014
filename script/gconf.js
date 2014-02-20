var clientId = '400024507226-jgpklj9ofen2avmfjnk0aekpsvncr54h.apps.googleusercontent.com';
var apiKey = 'AIzaSyB33EV0puEFY73thEKJFch-04qI8-85Fvg';
var scopes = 'https://www.googleapis.com/auth/calendar';

var WALKINGSPEEDMETERSPERMINUTE = 83.3;

if (typeof (Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}

function handleClientLoad() {
	gapi.client.setApiKey(apiKey);
	window.setTimeout(checkAuth,1);
}

function checkAuth() {
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, handleAuthResult);
}

function handleAuthResult(authResult) {
	var authorizeButton = document.getElementById('banner');
	if (authResult && !authResult.error) {
		setInterval(loadCalendarIds, 60000);

		function callbackMaker (fetchCall) {
			function callback (resp) {
				if (resp && !resp.error) {
					for (var i = 0; i < resp.items.length; i++) {
						calendarIds[resp.items[i].summary] = resp.items[i].id;
					}
					fetchCall();
				} else {
					console.log("Couldn't load calendars");
					console.log(resp);
				}
			}
			return callback;
		}

		loadCalendarIds(callbackMaker(Main.fetchRemoteCalendarEvents));
	} else {
		authorizeButton.onclick = handleAuthClick;
	}
}

function loadCalendarIds(callback) {
	callback = callback ? callback : function (resp) {
			if (resp && !resp.error) {
				for (var i = 0; i < resp.items.length; i++) {
					calendarIds[resp.items[i].summary] = resp.items[i].id;
				}
			} else {
				console.log("Couldn't load calendars");
				console.log(resp);
			}
		};
	gapi.client.load('calendar', 'v3', function () {
		var request = gapi.client.calendar.calendarList.list({"minAccessRole": "reader"});
		request.execute(callback);
	});
}

function getCalendar(calendar) {
	return gapi.client.calendar.calendars.get(calendarIds[calendar]);
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, Main.calendarSetup);
	return false;
}

function addEvent(summary, startTime, endTime){
	var newEvent = [{
		title: summary, // use the element's text as the event title
		editable: true, 
		start: Date.parse(startTime),
		end: Date.parse(endTime),
	}];
	$('#calendar').fullCalendar( 'addEventSource', newEvent );
	$('#calendar').fullCalendar( 'renderEvent', newEvent , true );
};
