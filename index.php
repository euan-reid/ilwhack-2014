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
<html>
	<head>
		<title>LifeCal</title>
		<link rel="stylesheet" type="text/css" href="/style.css">
	</head>
	<body>
		
	</body>
</html>
