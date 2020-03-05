'use strict';

(function () {
  var RUS_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var mapBlock = document.querySelector('.map');
  var mapFiltersContainer = mapBlock.querySelector('.map__filters-container');
  var card = document.querySelector('#card').content.querySelector('.map__card');

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

  var renderCard = function (offer) {
    var cardElement = renderOffer(offer);
    mapBlock.insertBefore(cardElement, mapFiltersContainer);
  };
  window.card = {
    renderCard: renderCard
  };
})();
