// import data from '../todos/todos.json';
import imgDelete from '../icons/close-icon.svg';
import imgDone from '../icons/completed-icon.svg';

const todos = document.querySelector('.lists .list .todos') as HTMLDivElement;

interface TodoObject {
  id: number;
  title: string;
  text: string;
  createdAt: string;
  tags: string[];
  state: {
    createdAt: string;
  }
}

const displayTodo = (todoObject: TodoObject) => {
  // if (isComplete) return;
  console.log(todoObject);
  const todoDiv = document.createElement('div');
  todoDiv.setAttribute('class', 'todo');
  todoDiv.setAttribute('title', 'Show todo');
  todoDiv.innerHTML = `
      <div class="buttons">
        <div class="button" title="Move to Bin">
          <img src="${imgDelete}">
        </div>
        <div class="button" title="Mark as Done">
          <img src="${imgDone}">
        </div>
      </div>
      <h2>${todoObject.title}</h2>
      <span class="text">${todoObject.text}</span>
      <div class="tags">
        ${todoObject.tags.map((tag: string) => `<span>${tag}</span>`).join('')}
      </div>
      <span class="date">${todoObject.state.createdAt}</span>
    `;
  return todos.append(todoDiv);
};

window.addEventListener('load', () => {
  // @ts-ignore
  const parsedJSON = JSON.parse(localStorage.getItem('todos'));
  if (!parsedJSON) return;
  console.log(parsedJSON);
  parsedJSON.todos.forEach((todo: TodoObject) => {
    displayTodo(todo);
  });
});

export default displayTodo;
