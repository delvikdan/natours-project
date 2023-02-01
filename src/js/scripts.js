'use strict';

document
  .querySelector('.navigation__list')
  .addEventListener('click', function (e) {
    e.preventDefault();
    //
    // Matching strategy
    if (e.target.classList.contains('navigation__item')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
    }
  });
