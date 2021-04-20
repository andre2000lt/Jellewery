'use strict';

(function () {
  var faqQuestions = document.querySelectorAll('.faq__question');
  if (faqQuestions) {
    faqQuestions.forEach(function (question, i) {
      var closedAreas = [1, 2, 3];
      if (closedAreas.indexOf(i) !== -1) {
        question.classList.remove('faq__question--active');
        question.nextElementSibling.classList.remove('faq__answer--visible');
      }
    });
  }

  var filterCategoryNames = document.querySelectorAll('.filter__category-name');
  if (filterCategoryNames) {
    filterCategoryNames.forEach(function (name, i) {
      var closedAreas = [1, 2];
      if (closedAreas.indexOf(i) !== -1) {
        name.classList.remove('filter__category-name--active');
        name.nextElementSibling.classList.remove('filter__category-content--visible');
      }
    });
  }
})();
