// @ts-nocheck
export {};
const todos = document.querySelectorAll('.lists .list .todos')!;

const createGrid = () => {
  const columns = Math.floor(document.body.clientWidth / 192);

  todos.forEach((todo) => {
    todo.style.setProperty('--columns', '7');
  });

  if (columns > 7) return;

  const columnsStr = columns.toString();
  todos.forEach((todo) => {
    todo.style.setProperty('--columns', columnsStr);
  });
};

const todoWrappers = document.querySelectorAll('.list .todos');

todoWrappers.forEach((todoList) => {
  todoList.addEventListener('mousemove', (e: any) => {
    const { target: myTarget } = e;
    if (myTarget === e.currentTarget) return;

    const rect = myTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    myTarget.style.setProperty('--mouse-x', `${x}px`);
    myTarget.style.setProperty('--mouse-y', `${y}px`);
  });
});

window.addEventListener('load', createGrid);
window.addEventListener('resize', createGrid);
