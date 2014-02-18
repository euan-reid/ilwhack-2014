<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="UTF-8">
		<title>LifeCal</title>
		<link rel="icon" type="image/png" href="/imagery/LifeCal-ident.png" />

		<!--CSS-->
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.4/fullcalendar.css">
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.4/fullcalendar.print.css">

		<!--Script-->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.4/fullcalendar.min.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=true"></script>
		<script src="/script/gconf.js"></script>
		<script src="https://apis.google.com/js/client.js?onload=OnLoadCallback"></script>
		<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>
		<script src="/script/main.js"></script>
		<script src="/script/locator.js"></script>
		<script src="/script/vec2.js"></script>
		
	</head>
	<body>
		<img id="banner" src="/imagery/LifeCal logo.svg" />
		<div id="calendar"></div>

		<div id='output' class=''></div>
		<div id='testing'>
			<button id="authorize-button" style="visibility: hidden">Authorize</button>
		</div>
		
	</body>
</html>
