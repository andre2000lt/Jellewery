// LOCALE STORAGE
'use strict';

(function () {
  window.storage = {
    getValue: function (field, itemName) {
      var isStorageSupport = true;
      var storageItem = '';

      try {
        storageItem = localStorage.getItem(itemName);
      } catch (err) {
        isStorageSupport = false;
      }

      if (isStorageSupport) {
        field.value = storageItem;
      }
    },

    saveValue: function (field, itemName) {
      localStorage.setItem(itemName, field.value);
    }
  };

  var forms = document.querySelectorAll('form');

  forms.forEach(function (form) {
    var fields = document.querySelectorAll('[data-local-stor]');

    if (fields) {
      fields.forEach(function (field) {
        var itemName = field.dataset.localStor;
        window.storage.getValue(field, itemName);
      });

      form.addEventListener('submit', function () {

        fields.forEach(function (field) {
          var itemName = field.dataset.localStor;
          window.storage.saveValue(field, itemName);
        });
      });
    }
  });
})();
