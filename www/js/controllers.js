angular.module('starter.controllers', [])

.controller('MapCtrl', function($scope, $ionicLoading, $compile, $ionicModal, $state) {

    var userMarker;

    function initializeMap() {
      var myLatlng = new google.maps.LatLng(43.07493,-89.381388);

      var mapOptions = {
        center: myLatlng,
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      var map = new google.maps.Map(document.getElementById("mainmap"),
          mapOptions);

      $scope.map = map;
      $scope.centerOnMe();
    };

    ionic.Platform.ready(initializeMap);

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
          alert('Unable to get location: ' + error.message);
        });
    };

    $scope.newCase = function() {
        $scope.modalNewCase.show();
    };

})
.controller('NewSiteCtrl', function() {
  /* New Trash Site Actions */
});
