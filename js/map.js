'use strict';

(function () {
  var ESC_KEY = 'Escape';

  var mapBlock = document.querySelector('.map');
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsElements = [];

  var closePopupMouseDown = function (evt) {
    var popup = document.querySelector('.popup');
    if (evt.button === 0) {
      mapBlock.removeChild(popup);
    }
  };

  var onPopupCloseMouseDown = function () {
    var popup = document.querySelector('.popup');
    var popupCloseButton = popup.querySelector('.popup__close');
    popupCloseButton.addEventListener('mousedown', closePopupMouseDown);
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

  var renderPin = function (ad) {
    var pinElement = pin.cloneNode(true);

    pinElement.querySelector('img').src = ad.author.avatar;
    pinElement.querySelector('img').alt = window.util.TITLE_ELEMENTS;
    pinElement.style.left = ad.location.x + 'px';
    pinElement.style.top = ad.location.y + 'px';

    return pinElement;
  };

  var renderPins = function (offersData) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < offersData.length; i++) {
      var pinEl = renderPin(offersData[i]);
      pinsElements.push(pinEl);
      fragment.appendChild(pinEl);
    }

    window.data.mapPins.appendChild(fragment);
  };

  var renderCardPopup = function (i) {
    window.card.renderCard(window.data.offers[i]);
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

  window.form.setInactiveState();
  window.map = {
    mapBlock: mapBlock,
    renderPins: renderPins,
    openCardPopup: openCardPopup,
  };
})();
