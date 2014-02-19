var Locator = new Class({
	
	initialize: function(){
		this.timesForPlaces = {
			store: {
				textKey: 'store',
				minTime: 30
			}
		};

	},

	showNearbyPlaces: function(startPos, radius){
		that = this;
		this.startLatLng = new google.maps.LatLng(startPos.getX(), startPos.getY());

		this.mapOptions = {
	        zoom: 15,
	        center: that.startLatLng,
	        mapTypeId: google.maps.MapTypeId.ROADMAP
	    };

    	this.map = new google.maps.Map(document.getElementById('gmap_canvas'), this.mapOptions);

	    this.request = {
		    location: that.startLatLng,
		    radius: radius,
		    types: ['store']
		};

		this.infowindow = new google.maps.InfoWindow();

		service = new google.maps.places.PlacesService(this.map);
  		service.nearbySearch(this.request,

  		function(results, status){
  			console.log(results);
			/*if (status == google.maps.places.PlacesServiceStatus.OK) {
			    for (var i = 0; i < results.length; i++) {
					var place = results[i];
					this.createMarker(results[i]);
			    }
			}*/

		});

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

	twoPointsDuration: function(pointA, pointB, callback){
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
		},

		function(response, status){
			if (status != google.maps.DistanceMatrixStatus.OK) {
			    alert('Error was: ' + status);
			    return null;

			} else {
				if(this instanceof Solver){
					this.addResult(response.rows[0].elements[0].duration.value);
				}
			}
		}.bind(this));


	},

	findAllPossiblePlaces: function(data, typeOfPlace){
		var freeTimeBetweenEvents = function(){
			this.storedData.freeTime = this.storedData.init[1].getTime()-this.storedData.init[0].getTime()-this.results[0]/60;
			this.addResult(null);
		};

		var timeBetween = Math.abs(data[1].getTime() - data[0].getTime());
		var midpoint = new Vec2((data[0].getX()+data[1].getX())/2, (data[0].getY()+data[1].getY())/2);
		
		var action = new Solver(data);
		action.addFunction(this.twoPointsDuration, [data[0].getLocation(), data[1].getLocation()]);
		action.addFunction(freeTimeBetweenEvents, []);
		action.addFunction(this.showNearbyPlaces, [midpoint, timeBetween*WALKINGSPEEDMETERSPERMINUTE]);
		action.run();


		//zjistit radius a lokalizovat vsechny mozne mista kam jit
		//seradit - to ale v jine metode


	},







});