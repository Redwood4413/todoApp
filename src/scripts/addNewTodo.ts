// @ts-nocheck
import displayAlert from './alerts';
import displayTodo from './displayTodos';

let tagArray: string[] = [];

const form = document.querySelector('.background .todo-wrapper form') as HTMLFormElement;
const titleInput = document.querySelector(".todo-wrapper form input[id='title'") as HTMLInputElement;
const textAreaQuery = document.querySelector("textarea[id='description']") as HTMLTextAreaElement;
const tagInput = document.querySelector("input[id='tags']") as HTMLInputElement;
const tagsQuery = document.querySelector('.tags') as HTMLDivElement;

// localStorage.removeItem('todos');

interface TodoObject {
  id: number;
  title: string;
  text: string;
  tags: string[];
  state: {
    isComplete: boolean;
    pendingDelete: boolean;
    createdAt: string;
  }
}

const inputValidation = (): boolean => {
  if (!titleInput.value) {
    displayAlert('Title can\'t be empty.', '#d11717');
    return false;
  }
  if (!textAreaQuery.value) {
    displayAlert('Description can\'t be empty.', '#d11717');
    return false;
  }
  return true;
};
const clearInputs = () => {
  titleInput.value = '';
  textAreaQuery.value = '';
  tagInput.value = '';
  tagArray = [];

  const tagsToDelete = document.querySelectorAll('form .tags .tag');
  tagsToDelete.forEach((el) => {
    el.remove();
  });
};

const createNewTodo = (e: any) => {
  e.preventDefault();

  if (!inputValidation()) return;
  let parsedJSON = JSON.parse(localStorage.getItem('todos'));

  const now = new Date();
  const dateString = now.toLocaleDateString();
  const timeString = now.toLocaleTimeString();

  let id: number = 0;
  if (parsedJSON) id = parsedJSON.todos.length;

  const newTodo: TodoObject = {
    id,
    title: titleInput.value,
    text: textAreaQuery.value,
    tags: tagArray,
    state: {
      isComplete: false,
      pendingDelete: false,
      createdAt: `${timeString} ${dateString}`,
    },
  };

  if (!parsedJSON) {
    parsedJSON = { todos: [newTodo] };
  } else {
    parsedJSON.todos.push(newTodo);
  }

  displayTodo(newTodo);
  localStorage.setItem('todos', JSON.stringify(parsedJSON));

  clearInputs();
  displayAlert('Your todo has been added.', '#2c9609');
};

form.addEventListener('submit', createNewTodo);

const displayTag = (tag: string) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  div.setAttribute('class', 'tag');
  div.innerHTML = `#${tag}`;
  div.append(span);
  tagsQuery.append(div);

  // deleting tags by mouse click
  span.addEventListener('click', () => {
    div.remove();
    const index = tagArray.indexOf(tag);
    tagArray.splice(index, 1);
  });
};

const getTagFromInput = () => {
  let tagStr: string = tagInput.value;
  if (tagStr.charAt(tagStr.length - 1) !== ',') return;
  if (tagStr.length === 1) return;

  tagStr = tagStr.slice(0, -1);
  tagStr = tagStr.trim();

  // prevent typing multiple comma inside input and multiple tags
  if (tagArray.includes(tagStr)) {
    tagInput.value = tagInput.value.slice(0, -1);
    displayAlert(`Tag "${tagStr}" already exists.`, '#d11717');
    return;
  }

  if (tagArray.length > 10) {
    tagInput.value = tagInput.value.slice(0, -1);
    displayAlert(`Number of tags can't be greater than ${tagArray.length}`, '#d11717');
    return;
  }

  tagArray.push(tagStr);
  tagStr = '';

  tagInput.value = tagStr;
  displayTag(tagArray[tagArray.length - 1]);
};

const deleteTagByKeyboard = (event: KeyboardEvent) => {
  if (event.key !== 'Backspace') return;

  const tagStr: string = tagInput.value;

  if (tagArray.length === 0) return;
  if (tagStr.length !== 0) return;
  if (!tagsQuery.lastChild) return;
  // @ts-ignore
  const cleanTag = tagsQuery.lastChild.innerHTML.slice(1, -12);
  tagArray.pop();

  tagsQuery.removeChild(tagsQuery.lastChild);

  tagInput.value = cleanTag;
};

const backgroundQuery = document.querySelector('.background') as HTMLDivElement;
const closeIcon = document.querySelector('.todo-wrapper .header .close') as HTMLDivElement;

const closeTodoWindow = (e: MouseEvent) => {
  if (e.target !== backgroundQuery && e.target !== closeIcon) return;
  backgroundQuery.style.opacity = '0';
  setTimeout(() => {
    backgroundQuery.style.display = 'none';
  }, 300);
};

backgroundQuery.addEventListener('mousedown', closeTodoWindow);

const resetButton = document.querySelector("form .buttons button[type='button'") as HTMLButtonElement;

resetButton.addEventListener('click', clearInputs);
tagInput.addEventListener('input', getTagFromInput);
tagInput.addEventListener('keydown', deleteTagByKeyboard);

textAreaQuery.addEventListener('input', function autoResize() {
  this.style.height = `${this.scrollHeight}px`;
});
