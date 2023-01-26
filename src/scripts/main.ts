import '../scss/style.scss';
import './version';
import './addNewTodo';
import dropdownList from './dropdownList.js';

const headerList = document.querySelectorAll('.header-list')!;
const backgroundQuery = document.querySelector('.background') as HTMLDivElement;

headerList.forEach((header) => {
  // @ts-ignore
  header.addEventListener('click', dropdownList);
});

// Listener which removes "Add new todo" window
backgroundQuery.addEventListener('mousedown', (e: MouseEvent) => {
  if (e.target !== backgroundQuery) return;

  backgroundQuery.style.opacity = '0';
  setTimeout(() => {
    backgroundQuery.remove();
  }, 300);
});
