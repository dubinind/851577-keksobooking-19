'use strict';

(function () {
  var ENTER_KEY = 'Enter';

  var mapPinMain = document.querySelector('.map__pin--main');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

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

  var renderPin = function (ad) {
    var pinElement = pin.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = window.util.TITLE_ELEMENTS;
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';

    return pinElement;
  };

  mapPinMain.addEventListener('keydown', onMapPinKeyDown);
  mapPinMain.addEventListener('mousedown', onMapPinMouseDown);

  window.pin = {
    renderPin: renderPin
  };
})();
