'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECKTIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var MIN_Y = 130;
  var MAX_Y = 630;
  var PIN_X_OFFSET = 20;
  var PIN_Y_OFFSET = 40;
  var TITLE_ELEMENTS = ['Дом на берегу озера', 'Квартира в центре города', 'Аппартаменты на окраине'];
  var DESCRIPTON_OFFERS = ['Уют и комфорт во всём!', 'Недорого и со вкусом', 'Джакузи и бассейн прямо в номере'];

  var mapPins = document.querySelector('.map__pins');

  var getRandomFeatures = function () {
    return window.util.getElements(FEATURES, 1, FEATURES.length);
  };

  var getRandomTitle = function () {
    return window.util.getRandomArrElement(TITLE_ELEMENTS);
  };

  var getRandomDescription = function () {
    return window.util.getRandomArrElement(DESCRIPTON_OFFERS);
  };

  var getRandomPhotos = function () {
    return window.util.getElements(PHOTOS, 1, PHOTOS.length);
  };

  var getRandomCheckTime = function () {
    return window.util.getRandomArrElement(CHECKTIMES);
  };

  var getRandomLocation = function () {
    var minX = mapPins.clientLeft;
    var maxX = mapPins.clientWidth + minX;
    return {
      x: window.util.getRandomNumber(minX, maxX) - PIN_X_OFFSET,
      y: window.util.getRandomNumber(MIN_Y, MAX_Y) - PIN_Y_OFFSET
    };
  };

  var getAvatar = function (number) {
    return 'img/avatars/user0' + number + '.png';
  };

  var getOffer = function (number) {
    var location = getRandomLocation();
    return {
      author: {
        avatar: getAvatar(number)
      },
      offer: {
        title: getRandomTitle(),
        address: location.x + ', ' + location.y,
        price: window.util.getRandomNumber(10, 1000),
        type: window.util.getRandomArrElement(TYPES),
        rooms: window.util.getRandomNumber(1, 5),
        guests: window.util.getRandomNumber(1, 12),
        checkin: getRandomCheckTime(),
        checkout: getRandomCheckTime(),
        features: getRandomFeatures(),
        description: getRandomDescription(),
        photos: getRandomPhotos()
      },
      location: {
        x: location.x,
        y: location.y
      }
    };
  };

  var getOffers = function (count) {
    var offers = [];
    for (var i = 1; i <= count; i++) {
      offers.push(getOffer(i));
    }
    return offers;
  };

  window.data = {
    getOffers: getOffers,
  };
})();
