'use strict';

(function () {
  var buttons = document.querySelectorAll('.js-accordion-button');
  if (buttons) {
    buttons.forEach(function (button) {
      button.addEventListener('click', function () {
        var nextElement = button.nextElementSibling;
        var buttonClass = button.className.split(' ')[0];
        var nextElementClass = nextElement.className.split(' ')[0];
        var activeClass = buttonClass + '--active';
        var visibleClass = nextElementClass + '--visible';

        button.classList.toggle(activeClass);
        nextElement.classList.toggle(visibleClass);
      });
    });
  }

})();
