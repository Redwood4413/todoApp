import './scss/style.scss';
import './scss/init.scss';
import './scss/cursorShadow.scss';
import './version';
import dropdownList from './dropdownList.js';
import cursorShadow from './animations/cursorShadow';

const headerList = document.querySelectorAll('.header-list')!;
const todoWrapper = document.querySelectorAll('.todo');

headerList.forEach((header) => {
  header.addEventListener('click', dropdownList);
});

window.addEventListener('mousemove', cursorShadow);
