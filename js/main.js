'use strict';
// создать массивы(константы)
// функция рандомного числа
// функция случайного элемента массива
// функция перемешивания массива
// функция случайного количества элементов перемешаного массива
// функция для аватара img/avatars/user{{xx}}.png где х от 01 до 08 где нет повторов
// функция создания 1 объекта
// функция создания массива из 8 объектов


// Константы
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var CHECKTIMES = ['12:00', '13:00', '14:00'];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var MIN_Y = 130;
var MAX_Y = 630;
var OFFERS_AMOUNT = 8;
var PIN_X_OFFSET = 20;
var PIN_Y_OFFSET = 40;

// Переменные
var titleElement = 'Дом на берегу озера';
var descriptionOffer = 'Уют и комфорт во всём!';
var mapClass = document.querySelector('.map');
var card = document.querySelector('#card');
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');

// Функции


var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomArrElement = function (array) {
  return array[getRandomNumber(0, array.length)];
};

var mixArray = function (array) {
  var mixedArray = array.slice();
  for (var i = 0; i < mixedArray.length; i++) {
    var swapIndex = Math.floor(Math.random() * mixedArray.length);
    var value = mixedArray[swapIndex];

    mixedArray[swapIndex] = mixedArray[i];
    mixedArray[i] = value;
  }

  return mixedArray;
};

var getElements = function (array, min, max) {
  var elements = [];
  var mixedElements = mixArray(array);
  for (var elementNumber = 0; elementNumber < Math.floor(Math.random() * (max - min) + min); elementNumber++) {
    elements[elementNumber] = mixedElements[elementNumber];
  }
  return elements;
};

var getAvatar = function (number) {
  return 'img/avatars/user0' + number + '.png';
};

var getRandomFeatures = function () {
  return getElements(FEATURES, 1, FEATURES.length);
};

var getRandomPhotos = function () {
  return getElements(PHOTOS, 1, PHOTOS.length);
};

var getRandomCheckTime = function () {
  return getRandomArrElement(CHECKTIMES);
};

var getRandomLocation = function () {
  var minX = mapPins.clientLeft;
  var maxX = mapPins.clientWidth + minX;
  return {
    x: getRandomNumber(minX, maxX) - PIN_X_OFFSET,
    y: getRandomNumber(MIN_Y, MAX_Y) - PIN_Y_OFFSET
  };
};

var getOffer = function (number) {
  var location = getRandomLocation();
  return {
    author: {
      avatar: getAvatar(number)
    },
    offer: {
      title: titleElement,
      address: location.x + ', ' + location.y,
      price: getRandomNumber(10, 1000),
      type: getRandomArrElement(TYPE),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 12),
      checkin: getRandomCheckTime(),
      checkout: getRandomCheckTime(),
      features: getRandomFeatures(),
      description: descriptionOffer,
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

var removeClass = function (element, className) {
  element.classList.remove(className);
};

removeClass(mapClass, 'map--faded');

var renderOffer = function (ad) {
  var offerElement = card.cloneNode(true);

  offerElement.querySelector('.popup__avatar').src = ad.author.avatar;
  offerElement.querySelector('.popup__avatar').alt = titleElement;
  offerElement.querySelector('.popup__title').textContent = ad.offer.title;
  offerElement.querySelector('.popup__text--address').textContent = ad.offer.address;
  offerElement.querySelector('.popup__text--price').textContent = ad.offer.price;
  offerElement.querySelector('.popup__type').textContent = ad.offer.type;
  offerElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + 'комната для ' + ad.offer.guests + ' гостей';
  offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
  offerElement.querySelector('.popup__features').textContent = ad.offer.features;
  offerElement.querySelector('.popup__description').textContent = ad.offer.description;
  offerElement.querySelector('.popup__photos').textContent = ad.offer.photos;

  return offerElement;
};

var renderPin = function (ad) {
  var pinElement = pin.cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = titleElement;
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';

  return pinElement;

};

var renderOffers = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    // fragment.appendChild(renderOffer(offers[i]));
    fragment.appendChild(renderPin(offers[i]));

  }
  mapPins.appendChild(fragment);
};

renderOffers(getOffersArray());
