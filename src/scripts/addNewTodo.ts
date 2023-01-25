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
  span.innerHTML = 'x';
  div.setAttribute('class', 'tag');
  div.innerHTML = `#${tag}`;
  div.append(span);
  tagsQuery.append(div);
};
const getTag = () => {
  let tagStr: string = tagInput.value;

  if (tagStr.charAt(tagStr.length - 1) === ',') {
    tagStr = tagStr.slice(0, -1);
    tagArray.push(tagStr);
    console.log(tagArray);
    tagStr = '';
    tagInput.value = tagStr;
    displayTag(tagArray[tagArray.length - 1]);
  }
};

tagInput.addEventListener('input', getTag);
