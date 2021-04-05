'use strict';


var swiper1 = new Swiper('.product-slider__container', {
  // Включение(необязательно) / выключение слайдера
  init: true,

  navigation: {
    nextEl: '.product-slider__button--next',
    prevEl: '.product-slider__button--prev',
  },

  // Отступ между слайдами
  spaceBetween: 30,
  // Задержка при переходе слайда
  speed: 300,

  a11y: {
    prevSlideMessage: 'Previous slide',
    nextSlideMessage: 'Next slide',
  },

  breakpoints: {
    // when window width is >= 768px
    320: {
      slidesPerView: 2,
      slidesPerGroup: 2,

      pagination: {
        el: '.product-slider__pagination',
        type: 'fraction',
        renderFraction: function (currentClass, totalClass) {
          return '<span class="' + currentClass + '"></span>' + ' of &nbsp' +
            '<span class="' + totalClass + '"></span>';
        }
      },


    },
    768: {
      slidesPerView: 2,
      slidesPerGroup: 2,

      pagination: {
        el: '.product-slider__pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },

      },
    },
    // when window width is >= 1024px
    1024: {
      slidesPerView: 4,
      slidesPerGroup: 4,

      pagination: {
        el: '.product-slider__pagination',
        type: 'bullets',
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + '</span>';
        },

      },
    }
  }
});

