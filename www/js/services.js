angular.module('starter.services', [])

.factory('$toast', ['$cordovaToast', function($cordovaToast) {
  return {
    showShortBottom: function(message) {
      try {
        $cordovaToast.showShortBottom(message)
          .then(function(success) {
            // success
          }, function (error) {
            // error
        });
      } catch (err) {
        alert(message);
      }
    },

    showShortCenter: function(message) {
      try {
        $cordovaToast.showShortCenter(message)
          .then(function(success) {
            // success
          }, function (error) {
            // error
        });
      } catch (err) {
        alert(message);
      }
    }
  }
}]);