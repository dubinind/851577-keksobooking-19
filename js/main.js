'use strict';

var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var CHECKTIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
// var RUS_TYPES = {
//   palace: 'Дворец',
//   flat: 'Квартира',
//   house: 'Дом',
//   bungalo: 'Бунгало'
// };
var MIN_Y = 130;
var MAX_Y = 630;
var OFFERS_AMOUNT = 8;
var PIN_X_OFFSET = 20;
var PIN_Y_OFFSET = 40;
var TITLE_ELEMENTS = ['Дом на берегу озера', 'Квартира в центре города', 'Аппартаменты на окраине'];
var DESCRIPTON_OFFERS = ['Уют и комфорт во всём!', 'Недорого и со вкусом', 'Джакузи и бассейн прямо в номере'];
var ENTER_KEY = 'Enter';
var IMG_WIDTH = 62;
var IMG_HEIGHT = 62;
var IMG_AFTER_HEIGHT = 22;


var mapBlock = document.querySelector('.map');
// var card = document.querySelector('#card').content.querySelector('.map__card');
var mapPins = document.querySelector('.map__pins');
var pin = document.querySelector('#pin').content.querySelector('.map__pin');
// var mapFiltersContainer = document.querySelector('.map__filters-container');
var mapPinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var mapFilter = document.querySelector('.map__filters');
var mapFeatures = document.querySelector('.map__features');
var formInputs = document.querySelectorAll('fieldset');
var formSelects = mapFilter.querySelectorAll('select');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var capacity = adForm.querySelector('#capacity');
var roomNumber = adForm.querySelector('#room_number');
var buttonSubmit = adForm.querySelector('.ad-form__submit');
var formType = adForm.querySelector('#type');
var pinLocationX = Number(mapPinMain.style.top.replace('px', ''));
var pinLocationY = Number(mapPinMain.style.left.replace('px', ''));
var pinCenterX = Math.floor(IMG_WIDTH / 2);
var pinCenterY = Math.floor(IMG_HEIGHT / 2);
var pinLocX = pinLocationX + pinCenterX;
var pinLocY = pinLocationY + pinCenterY;
var pinAfterY = pinLocationY + IMG_HEIGHT + IMG_AFTER_HEIGHT;
var adPrice = adForm.querySelector('#price');

var roomsValidationRules = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0']
};


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

var getRandomTitle = function () {
  return getRandomArrElement(TITLE_ELEMENTS);
};

var getRandomDescription = function () {
  return getRandomArrElement(DESCRIPTON_OFFERS);
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
      title: getRandomTitle(),
      address: location.x + ', ' + location.y,
      price: getRandomNumber(10, 1000),
      type: getRandomArrElement(TYPES),
      rooms: getRandomNumber(1, 5),
      guests: getRandomNumber(1, 12),
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

var removeClass = function (element, className) {
  element.classList.remove(className);
};
var addClass = function (element, className) {
  element.classList.add(className);
};

// var renderFeatures = function (offerFeatures) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < offerFeatures.length; i++) {
//     var featureElement = document.createElement('li');
//     featureElement.classList.add('popup__feature');
//     featureElement.classList.add('popup__feature--' + offerFeatures[i]);
//     fragment.appendChild(featureElement);
//   }
//   return fragment;
// };

// var renderPhotos = function (offerPhotos) {
//   var fragment = document.createDocumentFragment();
//   for (var i = 0; i < offerPhotos.length; i++) {
//     var photoElement = document.createElement('img');
//     photoElement.src = offerPhotos[i];
//     photoElement.width = '45';
//     photoElement.height = '40';
//     photoElement.alt = 'Фотография жилья';
//     photoElement.classList.add('popup__photo');
//     fragment.appendChild(photoElement);
//   }
//   return fragment;
// };

// var renderOffer = function (ad) {
//   var offerElement = card.cloneNode(true);
//   var popupFeatures = offerElement.querySelector('.popup__features');
//   var popupPhotos = offerElement.querySelector('.popup__photos');
//   offerElement.querySelector('.popup__avatar').src = ad.author.avatar;
//   offerElement.querySelector('.popup__avatar').alt = ad.offer.title;
//   offerElement.querySelector('.popup__title').textContent = ad.offer.title;
//   offerElement.querySelector('.popup__text--address').textContent = ad.offer.address;
//   offerElement.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
//   offerElement.querySelector('.popup__type').textContent = RUS_TYPES[ad.offer.type];
//   offerElement.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комната для ' + ad.offer.guests + ' гостей';
//   offerElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
//   popupFeatures.innerHTML = '';
//   popupFeatures.appendChild(renderFeatures(ad.offer.features));
//   offerElement.querySelector('.popup__description').textContent = ad.offer.description;
//   popupPhotos.innerHTML = '';
//   popupPhotos.appendChild(renderPhotos(ad.offer.photos));

//   return offerElement;
// };

// var renderCard = function (offer) {
//   var cardElement = renderOffer(offer);
//   mapBlock.insertBefore(cardElement, mapFiltersContainer);
// };

var renderPin = function (ad) {
  var pinElement = pin.cloneNode(true);

  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = TITLE_ELEMENTS;
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';

  return pinElement;
};

var renderPins = function (offers) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < offers.length; i++) {
    fragment.appendChild(renderPin(offers[i]));
  }

  mapPins.appendChild(fragment);
  // renderCard(offers[0]);
};

var setFormDisabled = function (arr) {
  arr.forEach(function (element) {
    element.disabled = true;
  });
};

var setFormEnabled = function (arr) {
  arr.forEach(function (element) {
    element.disabled = false;
  });
};

var setInactiveState = function () {
  addClass(adForm, 'ad-form--disabled');
  mapFilter.setAttribute('disabled', 'disabled');
  mapFeatures.setAttribute('disabled', 'disabled');
  document.querySelector('#address').value = pinLocX + ' ' + pinLocY;
  setFormDisabled(formInputs);
  setFormDisabled(formSelects);
};


var setActiveState = function () {
  removeClass(mapBlock, 'map--faded');
  removeClass(adForm, 'ad-form--disabled');
  mapFilter.removeAttribute('disabled', 'disabled');
  mapFeatures.removeAttribute('disabled', 'disabled');
  document.querySelector('#address').value = pinLocX + ' ' + pinAfterY;
  setFormEnabled(formInputs);
  setFormEnabled(formSelects);
  renderPins(getOffersArray());
};

var onMapPinMouseDown = function (evt) {
  if (evt.button === 0) {
    setActiveState();
    mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
    mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
  }
};

var onMapPinKeyDown = function (evt) {
  if (evt.key === ENTER_KEY) {
    setActiveState();
    mapPinMain.removeEventListener('keydown', onMapPinKeyDown);
    mapPinMain.removeEventListener('mousedown', onMapPinMouseDown);
  }
};

var onFormTypeChange = function (evt) {
  var adType = evt.target.value;
  if (adType === 'bungalo') {
    adPrice.min = 0;
  } else if (adType === 'flat') {
    adPrice.min = 1000;
  } else if (adType === 'house') {
    adPrice.min = 5000;
  } else {
    adPrice.min = 10000;
  }
};

var onAdFormChange = function (evt) {
  if (evt.target === timein || evt.target === timeout) {
    timein.value = evt.target.value;
    timeout.value = evt.target.value;
  }
};

var onButtonSubmitClick = function (evt) {
  evt.preventDefault();
  var rooms = roomNumber.value;
  var guests = capacity.value;
  if (roomsValidationRules[rooms].indexOf(guests) === -1) {
    capacity.setCustomValidity('Не верное значение');
    capacity.reportValidity();
  } else {
    capacity.setCustomValidity('');
    adForm.submit();
  }
};

formType.addEventListener('change', onFormTypeChange);

adForm.addEventListener('change', onAdFormChange);

buttonSubmit.addEventListener('click', onButtonSubmitClick);

mapPinMain.addEventListener('keydown', onMapPinKeyDown);
mapPinMain.addEventListener('mousedown', onMapPinMouseDown);
setInactiveState();
