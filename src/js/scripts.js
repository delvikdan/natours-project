'use strict';

// Smooth scrolling to section on menu link click
document
  .querySelector('.navigation__list')
  .addEventListener('click', function (e) {
    e.preventDefault();

    // Matching strategy
    if (e.target.classList.contains('navigation__link')) {
      const id = e.target.getAttribute('href');
      document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
      document.getElementById('navi-toggle').checked = false;
    }
  });

// Smooth scroling on button click
document.querySelector('.header .btn').addEventListener('click', function (e) {
  e.preventDefault();
  document
    .querySelector('#popular-tours')
    .scrollIntoView({ behavior: 'smooth' });
});
