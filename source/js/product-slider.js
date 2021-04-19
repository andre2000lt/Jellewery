'use strict';

(function () {
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
})();


(function () {

  /* Swiper
**************************************************************/
  var init = false;
  var swiper2 = Swiper;

  /* Which media query
  **************************************************************/
  function swiperMode() {
    var mobile = window.matchMedia('(min-width: 0px) and (max-width: 767px)');
    var tablet = window.matchMedia('(min-width: 768px)');

    var swiperContainer = document.querySelector('.product-card__image-wrapper');
    var swiperWrapper = document.querySelector('.product-card__image-list');
    var swiperSlides = document.querySelectorAll('.product-card__image');

    function toggleSwiperClasses() {
      if (swiperContainer) {
        swiperContainer.classList.toggle('swiper-container');
      } else {
        return false;
      }

      if (swiperWrapper) {
        swiperWrapper.classList.toggle('swiper-wrapper');
      } else {
        return false;
      }

      if (swiperSlides) {
        swiperSlides.forEach(function (slide) {
          slide.classList.toggle('swiper-slide');
        });
      } else {
        return false;
      }

      return true;
    }

    // Enable (for mobile)
    if ((mobile.matches) && (!init)) {
      if (toggleSwiperClasses()) {
        init = true;

        swiper2 = new Swiper('.product-card__image-wrapper', {
          // Включение(необязательно) / выключение слайдера
          speed: 300,

          slidesPerView: 1,
          slidesPerGroup: 1,

          pagination: {
            el: '.product-card__pagination',
            type: 'fraction',
            renderFraction: function (currentClass, totalClass) {
              return '<span class="' + currentClass + '"></span>' + ' of &nbsp' +
                '<span class="' + totalClass + '"></span>';
            }
          },
        });
      }

    } else if ((tablet.matches) && (init)) {
      if (toggleSwiperClasses()) {
        swiper2.destroy();
        init = false;
      }
    }
  }

  window.addEventListener('load', function () {
    swiperMode();
  });

  window.addEventListener('resize', function () {
    swiperMode();
  });

})();
