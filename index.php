<!DOCTYPE html>
<html lang="en" dir="ltr">
	<head>
		<meta charset="UTF-8">
		<title>LifeCal</title>
		<link rel="icon" type="image/png" href="/imagery/LifeCal-ident.png" />

		<!--CSS-->
		<link rel="stylesheet" type="text/css" href="/css/style.css">
		<link rel="stylesheet" type="text/css" href="/css/fullcalendar.css">
		<link rel="stylesheet" href="//code.jquery.com/ui/1.10.4/themes/smoothness/jquery-ui.css">
		<link rel="stylesheet" href="//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css" />
  
		<link rel="stylesheet" type="text/css" href="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.4/fullcalendar.css">

		<!--Script-->
		
		<script>
			var command = <?php if(isset($_GET['com']) == 'test') echo "'test'"; else echo "null"; ?>;
		</script>

		<!-- For +1 button -->
		<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>

		<!-- for bar.chart -->
		<script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/0.2.0/Chart.min.js"></script>

		<script src="//code.jquery.com/jquery-1.9.1.js"></script>
		<script src="//code.jquery.com/ui/1.10.4/jquery-ui.js"></script>
		<script src="//ajax.googleapis.com/ajax/libs/mootools/1.4.5/mootools-yui-compressed.js"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jstimezonedetect/1.0.4/jstz.min.js"></script>


		<script src="//cdnjs.cloudflare.com/ajax/libs/fullcalendar/1.6.4/fullcalendar.min.js"></script>
		<script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&sensor=false"></script>
		<script src="/script/other/spidergraph.js"></script>
		
		<script src="/script/main.js"></script>
		<script src="/script/gconf.js"></script>
		<script src="/script/locator.js"></script>
		<script src="/script/suggestor.js"></script>
		<script src="/script/structures.js"></script>

		<script src="https://apis.google.com/js/client.js?onload=handleClientLoad"></script>

		<script src="/script/other/raty.js"></script>

		
		<script>(function(d, s, id) {
  		var js, fjs = d.getElementsByTagName(s)[0];
  			if (d.getElementById(id)) return;
  			js = d.createElement(s); js.id = id;
  			js.src = "//connect.facebook.net/en_US/all.js#xfbml=1";
  			fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));</script>

	</head>
	<body>

		<div id='header'>
			<div id="banner">
				<img src="/imagery/LifeCal-logo.png" />
			</div>
			<!-- Using jQuery spidergraph  - https://github.com/jmstriegel/jquery.spidergraph/ -->
			<div id="graphbox"><div id="spidergraph"></div></div>
		</div>

		<div id="calendar"></div>

		<div id='output' class='output'></div>
		<div id='gmap_canvas' class='hidden'></div>


		<div id='popUpDialog' title="Event information"></div>
		<div id='popUpChart' title="Information"></div>

		<div class="g-plusone" data-size="tall" ></div>

		<div class="fb-like" data-href="https://developers.facebook.com/docs/plugins/" data-layout="standard" data-action="like" data-show-faces="false" data-share="true"></div>		

	</body>
</html>
