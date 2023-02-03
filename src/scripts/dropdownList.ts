const lists = document.querySelector('.main .lists') as HTMLDivElement;

function dropdownList(e: any) {
  const click = e.target;

  if (!click.matches('.header-list')) return;
  const clickedTodos = click.nextElementSibling;
  navigator.vibrate(25);

  const img = e.target.querySelector('img');

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  if (clickedTodos.getAttribute('expanded') === 'true') {
    clickedTodos.setAttribute('expanded', 'false');
    img.removeAttribute('rotated');
  } else {
    clickedTodos.setAttribute('expanded', 'true');
    img.setAttribute('rotated', '');
  }
}

lists.addEventListener('click', dropdownList);

export default { dropdownList };
