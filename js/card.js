'use strict';

(function () {
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  var renderCard = function (offer) {
    var cardElement = window.data.renderOffer(offer);
    window.map.mapBlock.insertBefore(cardElement, mapFiltersContainer);
  };
  window.card = {
    renderCard: renderCard
  };
})();
