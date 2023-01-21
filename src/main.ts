import './style.scss';
import './init.scss';
import './version';
import dropdownList from './dropdownList.js';

const headerList = document.querySelectorAll('.header-list')!;

headerList.forEach((header) => {
  header.addEventListener('click', dropdownList);
});
