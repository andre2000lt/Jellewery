'use strict';

(function () {
  var openWindowButtons = document.querySelectorAll('[data-modal-id]');
  var body = document.querySelector('body');
  var html = document.querySelector('html');
  var onModalPressTab;
  var onModalPressEsc;

  function showModal(modal) {
    modal.classList.add('modal--active');
    lockBodyOnModalOpen();

    closeFocusOnModal(modal);

    closeWindowByClick(modal);
  }

  function hideModal(modal) {
    modal.classList.remove('modal--active');
    unlockBodyOnModalClose();
    document.removeEventListener('keydown', onModalPressTab);
    document.removeEventListener('keydown', onModalPressEsc);
  }

  // Закрывает активное окно при клике на кнопки с классом js-close-window и ESC
  function closeWindowByClick(modal) {
    if (modal) {
      var onModalClick = function (evt) {
        var element = evt.target;

        if (element.classList.contains('js-close-window')) {
          hideModal(modal);
          modal.removeEventListener('click', onModalClick);
        }
      };

      onModalPressEsc = function (evt) {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          hideModal(modal);
        }
      };

      modal.addEventListener('click', onModalClick);
      document.addEventListener('keydown', onModalPressEsc);
    }
  }


  // Запераем фокус в модальном окне
  function closeFocusOnModal(modal) {
    var focusSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
      'select:not([disabled]):not([aria-hidden])',
      'textarea:not([disabled]):not([aria-hidden])',
      'button:not([disabled]):not([aria-hidden])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex^="-"])'
    ];

    var focusElements = modal.querySelectorAll(focusSelectors);
    // console.log(focusElements[0]);
    if (focusElements) {
      var focusedIndex = 0;
      var lastIndex = focusElements.length - 1;
      focusElements[0].focus();

      onModalPressTab = function (evt) {
        if (evt.keyCode === 9) {
          evt.preventDefault();
          // Shift + TAB
          if (evt.shiftKey) {
            if (focusedIndex > 0) {
              focusedIndex--;
            } else {
              focusedIndex = lastIndex;
            }
          } else { // TAB
            if (focusedIndex < lastIndex) {
              focusedIndex++;
            } else {
              focusedIndex = 0;
            }
          }

          focusElements[focusedIndex].focus();
        }
      };

      document.addEventListener('keydown', onModalPressTab);
    }
  } // End Of Function


  // Фиксируем страницу при открытии окна
  var lockBodyOnModalOpen = function () {
    var marginSize = window.innerWidth - html.clientWidth;
    body.classList.add('modal-opened');

    // ширина скроллбара равна разнице ширины окна и ширины документа (селектора html)
    if (marginSize) {
      html.style.marginRight = marginSize + 'px';
    }
  };

  // Снимаем фиксацию страницы при закрыкрытии окна
  var unlockBodyOnModalClose = function () {
    body.classList.remove('modal-opened');
    html.style.marginRight = '';
  };


  // При клике на любую кнопку с атрибутом data-modal-id -
  //  открываем окно с id указанным в data атрибуте кнопки
  openWindowButtons.forEach(function (elem) {
    elem.addEventListener('click', function (evt) {
      evt.preventDefault();

      var modalId = '#' + elem.dataset.modalId;
      var modal = document.querySelector(modalId);


      if (modal) {
        showModal(modal);
      }
    });
  });


})();
