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
		// authorizeButton.style.visibility = 'hidden';
		makeApiCall();
	} else {
		authorizeButton.style.visibility = '';
		authorizeButton.onclick = handleAuthClick;
	}
}

function handleAuthClick(event) {
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, Main.calendarSetup);
	return false;
}

function makeApiCall() {
	gapi.client.load('calendar', 'v3', function() {
		var request = gapi.client.calendar.events.list({'calendarId': 'primary'});
		request.execute(function(resp) {
			if (resp.items) {
				for (var i = 0; i < resp.items.length; i++) {
					var li = document.createElement('li');
					li.appendChild(document.createTextNode(resp.items[i].summary));
					li.appendChild(document.createTextNode(resp.items[i].location));
					li.appendChild(document.createTextNode(resp.items[i].description));
					li.appendChild(document.createTextNode(resp.items[i].end.datetime));
					li.appendChild(document.createTextNode(resp.items[i].start.datetime));
					document.getElementById('output').appendChild(li);
					addEvent(resp.items[i].summary, resp.items[i].start.datetime, resp.items[i].end.datetime);
				}
			}
		});
	});
};

function addEvent(summary, startTime, endTime){
	var newEvent = {
		title: summary, // use the element's text as the event title
		editable: true, 
		start: startTime,
		end: endTime,
	};
	$('#calendar').fullCalendar( 'addEventSource', newEvent );
};