var clientId = '182653051318';
var apiKey = 'AIzaSyCojj5ZHvVx1njVabv5TfE1zETZlAKaQTA';
var scopes = 'https://www.googleapis.com/auth/calendar';

var WALKINGSPEEDMETERSPERMINUTE = 83.3;

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
	gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, handleAuthResult);
	return false;
}

function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.calendarList.list();
    // request.execute(function(resp) {var heading = document.createElement('h4'); heading.appendChild(document.createTextNode(resp.kind)); document.getElementById('output').appendChild(heading);});
	request.execute(function(response){
		console.log(response);
	})
  });
}
