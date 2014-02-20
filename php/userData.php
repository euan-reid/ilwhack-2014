<?php

$events = array();

	$eventsArray = array();
	$eventsArray['title'] = "Breakfast at Tiffany's";
    $eventsArray['start'] = "2014-02-20 08:00:00";
    $eventsArray['end'] = "2014-02-20 10:00:00";
    $eventsArray['location'] = array(55.953036,-3.191765);
    $events[] = $eventsArray;

    $eventsArray = array();
    $eventsArray['title'] = "Lunch with Bob";
    $eventsArray['start'] = "2014-02-20 12:00:00";
    $eventsArray['end'] = "2014-02-20 13:30:00";
    $eventsArray['location'] = array(55.948819,-3.187216);
    $events[] = $eventsArray;

    $eventsArray = array();
    $eventsArray['title'] = "Gym - pleasance";
    $eventsArray['start'] = "2014-02-20 15:00:00";
    $eventsArray['end'] = "2014-02-20 18:00:00";
    $eventsArray['location'] = array(55.946764,-3.181315);
    $events[] = $eventsArray;

    foreach($events as &$event){
	    $event['backgroundColor'] = '#fff';
	    $event['textColor'] = '#333';
	    //$event['url'] = '';
	    $event['allDay'] = false;
	    $event['editable'] = false;
	    $event['timeFormat'] = 'h(:mm)';
    }


echo json_encode($events);

?>