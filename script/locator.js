var Locator = new Class({
	
	initialize: function(main){
		this.main = main;

		this.timesForPlaces = {
			store: {
				textKey: 'store',
				minTime: 30
			}
		};

	},

	findProperLocationByName: function(locationName){
		if(!locationName || locationName == ""){
			this.addResult(null);
			return;
		}

		//console.log('cache:');
		//console.log(this.storedData.locCache);

		/*if(this.storedData.locCache){
			$.each(this.storedData.locCache, function( index, value ) {
				if(locationName == value.name){
					console.log(">> SKIPPED <<");
					//this.addResult(new Vec2( value.location.getX(), value.location.getY()));
					//return;
				}

			}.bind(this));
		}*/

		console.log(locationName);


		var geocoder = new google.maps.Geocoder();
		geocoder.geocode( { 'address': locationName}, function(results, status) {
		  if (status == google.maps.GeocoderStatus.OK)
		  {
		  		console.log(results[0].geometry.location);
		  		this.storedData.locCache.push({
		  			name: locationName,
		  			location: new Vec2(results[0].geometry.location.d, results[0].geometry.location.e)
		  		});
		  		this.addResult(new Vec2(results[0].geometry.location.d, results[0].geometry.location.e));
		  		return;
		  		
		  } else {
		  		console.log('Error in finding the location by name...');
		  }
		}.bind(this));
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
		    types: ['food']
		};

		this.infowindow = new google.maps.InfoWindow();

		service = new google.maps.places.PlacesService(this.map);
  		service.nearbySearch(this.request,

  		function(results, status){
  			if (status == google.maps.places.PlacesServiceStatus.OK) {
  				this.addResult(results);
  			} else {
  				this.addResult(null);
  			}
			
		}.bind(this));

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

	twoPointsDistanceHaversine: function(pointA, pointB){
		latA = pointA.getX();
		latB = pointB.getX();
		longA = pointA.getY();
		longB = pointB.getY();

		var a = Math.sin((latA - latB).toRad()/ 2) * Math.sin((latA - latB).toRad() / 2) +
			Math.cos(latB.toRad()) * Math.cos(latB.toRad()) *
			Math.sin((longA - longB).toRad() / 2) * Math.sin((longA - longB).toRad() / 2);
		
		var d = 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))*1000;

		return d;
	},

	giveSuggestion_findAllPossiblePlaces: function(data, typeOfPlace){
		var freeTimeBetweenEvents = function(){
			var timeDifference = this.main.getTimeInMinutesFromMiliseconds(this.storedData.init[1].getTime()-this.storedData.init[0].getTime());
			this.storedData.freeTime = timeDifference-this.results[0]/60;
			this.addResult(null);
		};

		var callbackFn = function(pass){
			this.giveSuggestion_findAllPossiblePlacesCallback(data, pass);

		};

		var timeBetween = Math.abs(this.getTimeInMinutesFromMiliseconds(data[1].getTime() - data[0].getTime()));
		var midpoint = new Vec2((data[0].getX()+data[1].getX())/2, (data[0].getY()+data[1].getY())/2);
		
		var action = new Solver(this, data, callbackFn);
		action.addFunction(this.twoPointsDuration, [data[0].getLocation(), data[1].getLocation()]);
		action.addFunction(freeTimeBetweenEvents, []);
		console.log('distance: ' + (timeBetween)*WALKINGSPEEDMETERSPERMINUTE);
		action.addFunction(this.showNearbyPlaces, [midpoint, 250]);
		action.run();

	},

	giveSuggestion_findAllPossiblePlacesCallback: function(previousData, data){
		var suggestedPlace = this.findBestPlaceByRating(data[2]);
		console.log(suggestedPlace);
		var location = new Vec2(suggestedPlace.geometry.location.d, suggestedPlace.geometry.location.e);
		var photoUrl = suggestedPlace.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
		var eventData = {
			from: previousData[0].getTime(),
			to: previousData[1].getTime(),
			title: suggestedPlace.name,
			location: location,
			reference: suggestedPlace.reference,
			photoUrl: photoUrl,
			rating: suggestedPlace.rating
		};

		this.main.giveSuggestion(eventData);
	},

	findBestPlaceByRating: function(places){
		var maxRating = 1;
		var bestPlace = null;
		$.each(places, function( index, value ) {
			if(value.rating > maxRating){
				maxRating = value.rating;
				bestPlace = value;
			}
		});

		if(bestPlace !== null && bestPlace !== undefined)
			return bestPlace;
		else if(places.length > 0)
			return places[0];
		else
			return null;

	},

	getTimeInMinutesFromMiliseconds: function(time){
		return time/(60*1000);
	},







});