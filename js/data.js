'use strict';

(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var CHECKTIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var RUS_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var MIN_Y = 130;
  var MAX_Y = 630;
  var OFFERS_AMOUNT = 8;
  var PIN_X_OFFSET = 20;
  var PIN_Y_OFFSET = 40;
  var TITLE_ELEMENTS = ['Дом на берегу озера', 'Квартира в центре города', 'Аппартаменты на окраине'];
  var DESCRIPTON_OFFERS = ['Уют и комфорт во всём!', 'Недорого и со вкусом', 'Джакузи и бассейн прямо в номере'];

  var card = document.querySelector('#card').content.querySelector('.map__card');
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

  var getOffersArray = function () {
    var offersArray = [];
    for (var i = 1; i <= OFFERS_AMOUNT; i++) {
      offersArray.push(getOffer(i));
    }
    return offersArray;
  };

  var offers = getOffersArray();

  var renderFeatures = function (offerFeatures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerFeatures.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + offerFeatures[i]);
      fragment.appendChild(featureElement);
    }
    return fragment;
  };

  var renderPhotos = function (offerPhotos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offerPhotos.length; i++) {
      var photoElement = document.createElement('img');
      photoElement.src = offerPhotos[i];
      photoElement.width = '45';
      photoElement.height = '40';
      photoElement.alt = 'Фотография жилья';
      photoElement.classList.add('popup__photo');
      fragment.appendChild(photoElement);
    }
    return fragment;
  };

  var renderOffer = function (ad) {
    var offerElement = card.cloneNode(true);
    var popupFeatures = offerElement.querySelector('.popup__features');
    var popupPhotos = offerElement.querySelector('.popup__photos');
    offerElement.querySelector('.popup__avatar').src = ad.author.avatar;
    offerElement.querySelector('.popup__avatar').alt = ad.offer.title;
    offerElement.querySelector('.popup__title').textContent = ad.offer.title;
    offerElement.querySelector('.popup__text--address').textContent = ad.offer.address;
    offerElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    offerElement.querySelector('.popup__type').textContent = RUS_TYPES[ad.offer.type];
    offerElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комната для ' + ad.offer.guests + ' гостей';
    offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
    popupFeatures.innerHTML = '';
    popupFeatures.appendChild(renderFeatures(ad.offer.features));
    offerElement.querySelector('.popup__description').textContent = ad.offer.description;
    popupPhotos.innerHTML = '';
    popupPhotos.appendChild(renderPhotos(ad.offer.photos));

    return offerElement;
  };
  window.data = {
    offers: offers,
    renderOffer: renderOffer,
    mapPins: mapPins
  };
})();
