'use strict';

(function () {
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

  var removeClass = function (element, className) {
    element.classList.remove(className);
  };
  var addClass = function (element, className) {
    element.classList.add(className);
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomArrElement: getRandomArrElement,
    getElements: getElements,
    removeClass: removeClass,
    addClass: addClass
  };
})();
