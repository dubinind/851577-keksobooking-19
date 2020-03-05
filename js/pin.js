'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var mapPinMain = document.querySelector('.map__pin--main');

  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.map.setActiveState();
      mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
      mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
    }
  };

  var onMapPinKeyDown = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.map.setActiveState();
      mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
      mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
    }
  };

  mapPinMain.addEventListener('keydown', onMapPinKeyDown);
  mapPinMain.addEventListener('mousedown', onMapPinMouseDown);
})();
