import '../scss/style.scss';
import './version';
import './addNewTodo';
import './leftSideMenu';
import dropdownList from './dropdownList.js';

const headerList = document.querySelectorAll('.header-list')!;

headerList.forEach((header: Element) => {
  // @ts-ignore
  header.addEventListener('click', dropdownList);
});
