  var map;
  var geocoder;
  var bounds = new google.maps.LatLngBounds();
  var markersArray = [];

  var origin1 = new google.maps.LatLng(55.930, -3.118);
  var origin2 = '1040 N American St, Philadelphia, Pennsylvania, United States';
  var destinationA = '12 Kipsbergen Drive, Rhinebeck, United States';
  var destinationB = new google.maps.LatLng(50.087, 14.421);

  var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
  var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';
  var howlong;
(function() {

  howlong = (function() {

    init = function () {
      var opts = {
        center: new google.maps.LatLng(55.53, 9.4),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      //map = new google.maps.Map(document.getElementById('map-canvas'), opts);
      geocoder = new google.maps.Geocoder();      
    }

    calculateDistances = function (origin, destination) {
      var service = new google.maps.DistanceMatrixService(),
          origins = [],
          destinations = [];

      origins.push(origin);
      destinations.push(destination);
      service.getDistanceMatrix(
        {
          origins: origins,
          destinations: destinations,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, callback);
    }

    callback = function (response, status) {
      if (status != google.maps.DistanceMatrixStatus.OK) {        
        return "Error was: " + status;
      } else {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        var outputDiv = document.getElementById('outputDiv');
        outputDiv.innerHTML = '';
        //deleteOverlays();

        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          addMarker(origins[i], false);
          for (var j = 0; j < results.length; j++) {
           // addMarker(destinations[j], true);
           console.log(results);
            outputDiv.innerHTML += results[j].duration.text + ' (' + results[j].distance.text + ')';
          }
        }
        return results;
      }
    }

    addMarker = function (location, isDestination) {
      var icon;
      if (isDestination) {
        icon = destinationIcon;
      } else {
        icon = originIcon;
      }
      geocoder.geocode({'address': location}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          bounds.extend(results[0].geometry.location);
          map.fitBounds(bounds);
          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            icon: icon
          });
          markersArray.push(marker);
        } else {
          alert('Geocode was not successful for the following reason: '
            + status);
        }
      });
    }

    deleteOverlays = function () {
      for (var i = 0; i < markersArray.length; i++) {
        markersArray[i].setMap(null);
      }
      markersArray = [];
    }

    return {
      init: this.init,
      calculateDistances: this.calculateDistances,
      addMarker: this.addMarker,
      deleteOverlays: this.deleteOverlays
    }

  })();

})();



  google.maps.event.addDomListener(window, 'load', howlong.init);