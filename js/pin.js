'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var mapPinMain = document.querySelector('.map__pin--main');

  var onMapPinMouseDown = function (evt) {
    if (evt.button === 0) {
      window.form.setActiveState();
      mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
      mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
    }
  };

  var onMapPinKeyDown = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.form.setActiveState();
      mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
      mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
    }
  };

  var onPinKeyDown = function (evt) {
    if (evt.key === ENTER_KEY) {
      window.map.openCardPopup(evt);
    }
  };

  var onPinMouseDown = function (evt) {
    if (evt.button !== 0) {
      return;
    }
    window.map.openCardPopup(evt);
  };

  mapPinMain.addEventListener('keydown', onMapPinKeyDown);
  mapPinMain.addEventListener('mousedown', onMapPinMouseDown);

  window.pin = {
    mapPinMain: mapPinMain,
    onPinKeyDown: onPinKeyDown,
    onPinMouseDown: onPinMouseDown
  };
})();
