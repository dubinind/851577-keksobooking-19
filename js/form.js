'use strict';

(function () {

  var adForm = document.querySelector('.ad-form');
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
    syncPrice: syncPrice,
    setFormEnabled: setFormEnabled,
    setFormDisabled: setFormDisabled
  };
})();
