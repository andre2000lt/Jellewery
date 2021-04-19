// Валидация формы
'use strict';

(function () {

  // pattern - 'lengthReq, bigLettersReq, digitsReq, specialsReq'
  var countPasswordSymbols = function (password, lang, pattern) {
    var validSymbols = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM123456789!@#$%^&*()_-+=\|/.,:;[]{}';
    // var smallLetters = 'qwertyuiopasdfghjklzxcvbnm'; // Буквы в нижнем регистре
    var bigLetters = 'QWERTYUIOPLKJHGFDSAZXCVBNM'; // Буквы в верхнем регистре
    var digits = '0123456789'; // Цифр
    var specials = '!@#$%^&*()_-+=\|/.,:;[]{}';

    var lengthReq = 7;
    var bigLettersReq = 2;
    var digitsReq = 1;
    var specialsReq = 1;

    if (pattern) {
      pattern = pattern.replace(/\s+/g, '');
      var patternArr = pattern.split(',');

      lengthReq = patternArr[0];
      bigLettersReq = patternArr[1];
      digitsReq = patternArr[2];
      specialsReq = patternArr[3];
    }

    var check = {
      illegalMessage: {
        'ru': ['Только латинские буквы, цифры и спецсимволы: !@#$%^&*()_-+=\|/.,:;[]{}'],
        'en': ['Only Latin letters, numbers and special characters:! @ # $% ^ & * () _- + = \ | /.,:; [] {}']
      },
      tooShortMessage: {
        'ru': ['Не меньше ' + lengthReq + ' символов'],
        'en': ['At least ' + lengthReq + ' characters']
      },
      minBigLettersMessage: {
        'ru': ['Не меньше 1 заглавной буквы', 'Не меньше ' + bigLettersReq + ' заглавных букв'],
        'en': ['At least 1 capital letter', 'At least ' + bigLettersReq + ' capital letters']
      },
      minDigitsMessage: {
        'ru': ['Не меньше 1 цифры', 'Не меньше ' + digitsReq + ' цифр'],
        'en': ['At least 1 digit', 'At least ' + digitsReq + ' digits']
      },
      minSpecialsMessage: {
        'ru': ['Не меньше 1 спецсимвола', 'Не меньше ' + specialsReq + ' спецсимволов'],
        'en': ['At least 1 special character', 'At least ' + specialsReq + ' special character']
      }
    };

    var symbolsCount = 0;
    var bigLettersCount = 0;
    var digitsCount = 0;
    var specialsCount = 0;

    for (var i = 0; i < password.length; i++) {
      var symbol = password[i];

      if (!(validSymbols.indexOf(symbol) + 1)) {
        return check.illegalMessage[lang][0];
      }

      if (bigLetters.indexOf(symbol) + 1) {
        bigLettersCount++;
      } else if (digits.indexOf(symbol) + 1) {
        digitsCount++;
      } else if (specials.indexOf(symbol) + 1) {
        specialsCount++;
      }

      symbolsCount++;
    }

    if (symbolsCount < lengthReq) {
      return check.tooShortMessage[lang][0];
    }

    if (bigLettersCount < bigLettersReq) {
      if (bigLettersReq === 1) {
        return check.minBigLettersMessage[lang][0];
      } else {
        return check.minBigLettersMessage[lang][1];
      }
    }

    if (digitsCount < digitsReq) {
      if (digitsReq === 1) {
        return check.minDigitsMessage[lang][0];
      } else {
        return check.minDigitsMessage[lang][1];
      }
    }

    if (specialsCount < specialsReq) {
      if (specialsReq === 1) {
        return check.minSpecialsMessage[lang][0];
      } else {
        return check.minSpecialsMessage[lang][1];
      }
    }

    return false;
  };

  window.form = {
    checkPasssword: function (field, lang) {
      var pass = field.value;
      var pattern = (field.hasAttribute('data-pass-pattern')) ? field.dataset.passPattern : '';
      var messageLang = (lang) ? lang : 'en';

      var message = countPasswordSymbols(pass, messageLang, pattern);
      if (message) {
        field.setCustomValidity(message);
      } else {
        field.setCustomValidity('');
      }
    }
  };

  var fields = document.querySelectorAll('[required]');

  fields.forEach(function (field) {
    // Проверяем поля паролей c атрибутом 'data-pass-pattern'
    if (field.hasAttribute('data-pass-pattern')) {
      field.addEventListener('input', function () {
        window.form.checkPasssword(field, 'ru');
      });
    }

    field.addEventListener('blur', function () {
      if ((field.value.length !== 0) && (!field.checkValidity())) {
        field.classList.add('invalid-field');
      } else {
        field.classList.remove('invalid-field');
      }
    });

    field.addEventListener('focus', function () {
      field.classList.remove('invalid-field');
    });
  });
})();
