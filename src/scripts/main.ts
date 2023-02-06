import '../scss/style.scss';
import './version';
import './addNewTodo';
import './leftSideMenu';
import './dropdownList';
import './todoGrid';
import './displayTodos';

const addNewTodo = document.querySelector('.lists .list .todos .todo') as HTMLDivElement;

addNewTodo.addEventListener('click', () => {
  const backgroundQuery = document.querySelector('.background') as HTMLDivElement;
  backgroundQuery.style.display = 'flex';
  backgroundQuery.style.opacity = '1';
});
