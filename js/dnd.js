'use strict';
(function () {
  var IMG_AFTER_HEIGHT = 22;
  var IMG_HEIGHT = 62;
  var IMG_WIDTH = 62;
  var MIN_Y = 130;
  var MAX_Y = 630;
  var pinCenterX = Math.floor(IMG_WIDTH / 2);
  var pinShiftAfterY = IMG_HEIGHT + IMG_AFTER_HEIGHT;
  var mapBlock = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var addressPin = document.querySelector('#address');
  var limits = {
    top: MIN_Y,
    right: mapBlock.clientWidth - IMG_WIDTH,
    bottom: MAX_Y,
    left: mapBlock.clientLeft
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords.x = moveEvt.clientX;
      startCoords.y = moveEvt.clientY;

      var pinTop = mapPinMain.offsetTop;
      var pinLeft = mapPinMain.offsetLeft;
      if (pinTop < limits.top) {
        mapPinMain.style.top = limits.top + 'px';
      } else if (pinTop > limits.bottom) {
        mapPinMain.style.top = limits.bottom + 'px';
      } else {
        mapPinMain.style.top = (pinTop - shift.y) + 'px';
      }

      if (pinLeft < limits.left) {
        mapPinMain.style.left = limits.left + 'px';
      } else if (pinLeft > limits.right) {
        mapPinMain.style.left = limits.right + 'px';
      } else {
        mapPinMain.style.left = (pinLeft - shift.x) + 'px';
      }
      addressPin.value = (pinLeft - shift.x + pinCenterX) + ', ' + (pinTop - shift.y + pinShiftAfterY);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
