angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading) {

    var userMarker;

    $scope.centerOnMe = function() {
        if(!$scope.map) {
            return;
        }

        $ionicLoading.show({
            content: 'Getting current location...',
            showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
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
        }, function(error) {
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

    $scope.newCase = function() {
        $scope.modalNewCase.show();
    };

})
.controller('NewSiteCtrl', function() {
  /* New Trash Site Actions */
});
