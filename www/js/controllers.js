angular.module('starter.controllers', ['ngCordova'])

.controller('MapCtrl', function($scope, $ionicLoading, $cordovaGeolocation) {

    var userMarker;

    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        var posOptions = { timeout: 10000, enableHighAccuracy: false };
        $cordovaGeolocation.getCurrentPosition(posOptions)
            .then(function(pos) {
                if(userMarker != null) {
                    userMarker.setMap(null);
                }
                var userLocation = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);

                $scope.map.setCenter(userLocation);

                userMarker = new google.maps.Marker({
                    position: userLocation,
                    map: $scope.map,
                    title: 'User Location',
                    draggable: true,
                    icon: {
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 5,
                        strokeColor: '#800808',
                        strokeWeight: 1,
                        fillColor: 'red',
                        fillOpacity: 1.0
                    }
                });

                $ionicLoading.hide();

          }, function(err) {
                $ionicLoading.hide();
                alert('Unable to get location: ' + error.message);
          });

    };

    ionic.Platform.ready(function () {
        var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        $scope.map = new google.maps.Map(document.getElementById("mainmap"),
            mapOptions);
        $scope.centerOnMe();
    });

})
.controller('NewSiteCtrl', function($scope, $ionicHistory, $toast, $timeout) {
  /* New Trash Site Actions */
  $scope.submitReport = function() {
    $toast.showShortBottom("Submitting your report...");
    $ionicHistory.goBack();

    $timeout(function() {
         $toast.showShortBottom("Your report has been successfully submitted.");
      }, 5000);


  };
});
