'use strict';
(function () {
  var offers = [];
  var successHandler = function (offer) {
    for (var i = 0; i < offer.length; i++) {
      offers.push(offer[i]);
    }
    return offers;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load(successHandler, errorHandler);

  window.data = {
    offers: offers
  };
})();
