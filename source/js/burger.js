'use strict';

(function () {
  var body = document.querySelector('body');
  var burger = document.querySelector('.burger');
  var headerNav = document.querySelector('.header__nav');
  var logo = document.querySelector('.header__logo');
  var cart = document.querySelector('.header__cart');
  var headerTop = document.querySelector('.header__top');

  if (burger && headerNav) {
    headerNav.classList.add('header__nav--hidden');
    headerNav.classList.add('header__nav--fullscreen');

    burger.addEventListener('click', function () {
      headerNav.classList.toggle('header__nav--hidden');
      burger.classList.toggle('burger--white');

      if (logo) {
        logo.classList.toggle('header__logo--white');
      }

      if (cart) {
        cart.classList.toggle('header__cart--white');
      }

      if (headerTop) {
        headerTop.classList.toggle('header__top--brown');
      }

      body.classList.toggle('modal-opened');
    });
  }
})();
