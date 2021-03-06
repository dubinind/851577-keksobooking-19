'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  // var OFFERS_AMOUNT = 8;

  var mapBlock = document.querySelector('.map');
  var mapFeatures = document.querySelector('.map__features');
  var formInputs = document.querySelectorAll('fieldset');
  var mapFilter = document.querySelector('.map__filters');
  var formSelects = mapFilter.querySelectorAll('select');
  var adForm = document.querySelector('.ad-form');
  var formType = adForm.querySelector('#type');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var addressPin = document.querySelector('#address');
  var IMG_AFTER_HEIGHT = 22;
  var IMG_WIDTH = 62;
  var IMG_HEIGHT = 62;
  var pinCenterX = Math.floor(IMG_WIDTH / 2);
  var pinCenterY = Math.floor(IMG_HEIGHT / 2);
  var pinLocationX = Number(mapPinMain.style.left.replace('px', ''));
  var pinLocationY = Number(mapPinMain.style.top.replace('px', ''));
  var pinLocX = pinLocationX + pinCenterX;
  var pinLocY = pinLocationY + pinCenterY;
  var pinAfterY = pinLocationY + IMG_HEIGHT + IMG_AFTER_HEIGHT;
  var pinsElements = [];
  var offers = window.data.offers;

  var onClosePopupMouseDown = function (evt) {
    var popup = document.querySelector('.popup');
    if (evt.button === 0) {
      mapBlock.removeChild(popup);
    }
  };

  var onPopupCloseMouseDown = function () {
    var popup = document.querySelector('.popup');
    var popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('mousedown', onClosePopupMouseDown);
  };

  var closePopupKeyDown = function (evt) {
    var popup = document.querySelector('.popup');
    if (evt.key === ESC_KEY) {
      mapBlock.removeChild(popup);
    }
  };

  var onPopupCloseKeyDown = function () {
    document.addEventListener('keydown', closePopupKeyDown);
  };

  var renderPins = function (offersData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offersData.length; i++) {
      var pinEl = window.pin.renderPin(offersData[i]);
      pinsElements.push(pinEl);
      fragment.appendChild(pinEl);
    }

    mapPins.appendChild(fragment);
  };

  var renderCardPopup = function (i) {
    window.card.renderCard(offers[i]);
    onPopupCloseMouseDown();
    onPopupCloseKeyDown();
  };

  var openCardPopup = function (evt) {
    var target;
    if (evt.target.tagName === 'IMG' && evt.target.parentElement.classList.contains('map__pin') &&
      !evt.target.parentElement.classList.contains('map__pin--main')) {
      target = evt.target.parentElement;

    } else if (evt.target.classList.contains('map__pin') &&
      !evt.target.classList.contains('map__pin--main')) {
      target = evt.target;
    }
    if (target) {
      var popup = document.querySelector('.popup');
      var indexOffer = pinsElements.indexOf(target);
      if (popup) {
        mapBlock.removeChild(popup);
      }
      if (indexOffer !== -1) {
        renderCardPopup(indexOffer);
      }
    }
  };

  var setInactiveState = function () {
    window.util.addClass(adForm, 'ad-form--disabled');
    mapFilter.setAttribute('disabled', 'disabled');
    mapFeatures.setAttribute('disabled', 'disabled');
    addressPin.value = pinLocX + ', ' + pinLocY;
    window.form.setFormDisabled(formInputs);
    window.form.setFormDisabled(formSelects);
    window.form.syncPrice(formType.value);
  };

  var onPinKeyDown = function (evt) {
    if (evt.key !== ENTER_KEY) {
      return;
    }
    openCardPopup(evt);

  };

  var onPinMouseDown = function (evt) {
    if (evt.button !== 0) {
      return;
    }
    openCardPopup(evt);
  };

  var setActiveState = function () {
    window.util.removeClass(mapBlock, 'map--faded');
    window.util.removeClass(adForm, 'ad-form--disabled');
    mapFilter.removeAttribute('disabled', 'disabled');
    mapFeatures.removeAttribute('disabled', 'disabled');
    addressPin.value = pinLocX + ', ' + pinAfterY;
    window.form.setFormEnabled(formInputs);
    window.form.setFormEnabled(formSelects);
    renderPins(offers);
    mapPins.addEventListener('mousedown', onPinMouseDown);
    mapPins.addEventListener('keydown', onPinKeyDown);
  };

  setInactiveState();

  window.map = {
    setActiveState: setActiveState
  };
})();
