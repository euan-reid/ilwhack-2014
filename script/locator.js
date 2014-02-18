var Locator = new Class({
	
	initialize: function(){
		
	},

	showNearbyPlaces: function(){
		that = this;
		this.myLatlng = new google.maps.LatLng(40.7143528,-74.0059731);

		this.myOptions = {
	        zoom: 15,
	        center: that.myLatlng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

    	this.map = new google.maps.Map(document.getElementById('gmap_canvas'), this.myOptions);

	    this.request = {
		    location: that.myLatlng,
		    radius: '500',
		    types: ['store']
		};

		this.infowindow = new google.maps.InfoWindow();

		service = new google.maps.places.PlacesService(this.map);
  		service.nearbySearch(this.request, this.callback.bind(this));

	},

	callback: function(results, status){
		if (status == google.maps.places.PlacesServiceStatus.OK) {
		    for (var i = 0; i < results.length; i++) {
				var place = results[i];
				this.createMarker(results[i]);
		    }
		}


	},

	createMarker: function(place){
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: this.map,
			position: place.geometry.location
		});

		that = this;
		google.maps.event.addListener(marker, 'click', function() {
			that.infowindow.setContent(place.name);
			that.infowindow.open(that.map, this);
		});

	},

	twoPointsDuration: function(pointA, pointB){
		var origin = new google.maps.LatLng(pointA.getX(), pointA.getY());
		var destination = new google.maps.LatLng(pointB.getX(), pointB.getY());

		var service = new google.maps.DistanceMatrixService();
		service.getDistanceMatrix(
		  {
		    origins: [origin],
		    destinations: [destination],
		    travelMode: google.maps.TravelMode.WALKING,
		    unitSystem: google.maps.UnitSystem.METRIC,
		    durationInTraffic: true,
		  }, this.twoPointsDurationCallback.bind(this));


	},

	twoPointsDurationCallback: function(response, status){
		if (status != google.maps.DistanceMatrixStatus.OK) {
		    alert('Error was: ' + status);
		    return null;

		} else {
			try{
				duration = response.rows[0].elements[0].duration.text;
				$('#output').html("Duration From Edinburgh to Prague: " + duration);
			} catch(err) {
				console.log(err);
				return null;
			}
		}
		
	},







});