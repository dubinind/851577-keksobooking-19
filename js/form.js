'use strict';

(function () {
  var IMG_AFTER_HEIGHT = 22;
  var IMG_WIDTH = 62;
  var IMG_HEIGHT = 62;
  var pinCenterX = Math.floor(IMG_WIDTH / 2);
  var pinCenterY = Math.floor(IMG_HEIGHT / 2);
  var pinLocationX = Number(window.pin.mapPinMain.style.top.replace('px', ''));
  var pinLocationY = Number(window.pin.mapPinMain.style.left.replace('px', ''));
  var pinLocX = pinLocationX + pinCenterX;
  var pinLocY = pinLocationY + pinCenterY;
  var pinAfterY = pinLocationY + IMG_HEIGHT + IMG_AFTER_HEIGHT;

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
  var adPrice = adForm.querySelector('#price');
  var roomsValidationRules = {
    '1': ['1'],
    '2': ['1', '2'],
    '3': ['1', '2', '3'],
    '100': ['0']
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
    window.util.addClass(adForm, 'ad-form--disabled');
    mapFilter.setAttribute('disabled', 'disabled');
    mapFeatures.setAttribute('disabled', 'disabled');
    document.querySelector('#address').value = pinLocX + ' ' + pinLocY;
    setFormDisabled(formInputs);
    setFormDisabled(formSelects);
    syncPrice(formType.value);
  };

  var setActiveState = function () {
    window.util.removeClass(window.map.mapBlock, 'map--faded');
    window.util.removeClass(adForm, 'ad-form--disabled');
    mapFilter.removeAttribute('disabled', 'disabled');
    mapFeatures.removeAttribute('disabled', 'disabled');
    document.querySelector('#address').value = pinLocX + ' ' + pinAfterY;
    setFormEnabled(formInputs);
    setFormEnabled(formSelects);
    window.map.renderPins(window.data.offers);
    window.data.mapPins.addEventListener('mousedown', window.pin.onPinMouseDown);
    window.data.mapPins.addEventListener('keydown', window.pin.onPinKeyDown);
  };

  var syncPrice = function (adType) {
    if (adType === 'bungalo') {
      adPrice.min = 0;
      adPrice.placeholder = 0;
    } else if (adType === 'flat') {
      adPrice.min = 1000;
      adPrice.placeholder = 1000;
    } else if (adType === 'house') {
      adPrice.min = 5000;
      adPrice.placeholder = 5000;
    } else {
      adPrice.min = 10000;
      adPrice.placeholder = 10000;
    }
  };

  var onFormTypeChange = function (evt) {
    syncPrice(evt.target.value);
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

  buttonSubmit.addEventListener('click', onButtonSubmitClick);
  formType.addEventListener('change', onFormTypeChange);
  adForm.addEventListener('change', onAdFormChange);
  window.form = {
    setInactiveState: setInactiveState,
    setActiveState: setActiveState
  };
})();
