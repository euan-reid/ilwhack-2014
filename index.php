<?php
	session_start();

	require_once "../src/apiClient.php";
	require_once "../src/contrib/apiCalendarService.php";

	$apiClient = new apiClient();
	$apiClient->setUseObjects(true);
	$service = new apiCalendarService($apiClient);

	if (isset($_SESSION['oauth_access_token'])) {
		$apiClient->setAccessToken($_SESSION['oauth_access_token']);
	} else {
		$token = $apiClient->authenticate();
		$_SESSION['oauth_access_token'] = $token;
	}
?>

<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="UTF-8">
		<title>LifeCal</title>

		<!--Script-->
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js"></script>
		<script type="text/javascript" src="/script/main.js"></script>

		<!--CSS-->
		<link media="all" rel="stylesheet" type="text/css" href="/css/style.css">
	</head>
	<body>
		<a onclick="javascript:window.open('http://www.youtube.com/watch?v=wyz_2DEah4o', '_blank');">Cue the music</a>
		<h1>In 2014 our crack developer unit has been sent to Appleton Tower to create a project to commit. Today, still searching for a project, we survive as coders of fortune. If you have a problem, if no one else can help, and if you have pizza, then you can hire the AT Team.</h1>
	</body>
</html>
