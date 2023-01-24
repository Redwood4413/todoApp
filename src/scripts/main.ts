import '../scss/style.scss';
import '../scss/init.scss';
import '../scss/cursorShadow.scss';
import '../scss/addNewTodo.scss';
import './version';
import './addNewTodo';
import dropdownList from './dropdownList.js';

const headerList = document.querySelectorAll('.header-list')!;
const backgroundQuery = document.querySelector('.background') as HTMLDivElement;

headerList.forEach((header) => {
  header.addEventListener('click', dropdownList);
});

// Listener which removes "Add new todo" window
backgroundQuery.addEventListener('click', (e: MouseEvent) => {
  if (e.target !== backgroundQuery) return;

  backgroundQuery.style.opacity = '0';
  setTimeout(() => {
    backgroundQuery.remove();
  }, 300);
});
