import displayAlert from './alerts';

const textAreaQuery = document.querySelector("textarea[id='description']") as HTMLTextAreaElement;

textAreaQuery.addEventListener('input', function autoResize() {
  this.style.height = `${this.scrollHeight}px`;
});

const tagArray: string[] = [];
const tagInput = document.querySelector("input[id='tags']") as HTMLInputElement;
const tagsQuery = document.querySelector('.tags') as HTMLDivElement;

const displayTag = (tag: string) => {
  const div = document.createElement('div');
  const span = document.createElement('span');
  div.setAttribute('class', 'tag');
  div.innerHTML = `#${tag}`;
  div.append(span);
  tagsQuery.append(div);
};
function getTag() {
  let tagStr: string = tagInput.value;
  if (tagStr.charAt(tagStr.length - 1) !== ',') return;
  if (tagStr.length === 1) return;

  tagStr = tagStr.slice(0, -1);

  for (let i = 0; i < tagArray.length; i += 1) {
    if (tagArray[i] === tagStr) {
      // prevent typing multiple comma
      tagInput.value = tagInput.value.slice(0, -1);
      displayAlert(tagStr, `Tag "${tagStr}" already exists.`);
      return;
    }
  }

  tagArray.push(tagStr);
  tagStr = '';

  tagInput.value = tagStr;
  displayTag(tagArray[tagArray.length - 1]);
}

const deleteTagByKeyboard = (event: KeyboardEvent) => {
  if (event.key !== 'Backspace') return;

  const tagStr: string = tagInput.value;

  if (tagArray.length === 0) return;
  if (tagStr.length !== 0) return;
  if (!tagsQuery.lastChild) return;

  const cleanTag = tagsQuery.lastChild.innerHTML.slice(1, -12);
  tagArray.pop();
  tagsQuery.removeChild(tagsQuery.lastChild);
  tagInput.value = cleanTag;
};

const clearButton = document.querySelector("form buttons button[type='clear'") as HTMLButtonElement;
console.log(clearButton);
tagInput.addEventListener('input', getTag);
tagInput.addEventListener('keydown', deleteTagByKeyboard);
