import displayAlert from './alerts';

const textAreaQuery = document.querySelector("textarea[id='description']") as HTMLTextAreaElement;

let tagArray: string[] = [];
const tagInput = document.querySelector("input[id='tags']") as HTMLInputElement;
const tagsQuery = document.querySelector('.tags') as HTMLDivElement;
const form = document.querySelector('.todo-wrapper form') as HTMLFormElement;
const todoWrapper = document.querySelector('.todo-wrapper') as HTMLDivElement;

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
    displayAlert(`Tag "${tagStr}" already exists.`);
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

const clearButton = document.querySelector("form .buttons button[type='button'") as HTMLButtonElement;

clearButton.addEventListener('click', () => {
  const title = document.querySelector(".todo-wrapper form input[id='title'") as HTMLInputElement;
  title.value = '';
  textAreaQuery.value = '';
  tagArray = [];
});

tagInput.addEventListener('input', getTagFromInput);
tagInput.addEventListener('keydown', deleteTagByKeyboard);

textAreaQuery.addEventListener('input', function autoResize() {
  this.style.height = `${this.scrollHeight}px`;
});
