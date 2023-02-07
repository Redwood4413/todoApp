// @ts-nocheck
const arrow = document.querySelector('.left-side-menu .arrow-wrapper') as HTMLDListElement;
const sideBar = document.querySelector('.left-side-menu') as HTMLDivElement;
const span = document.querySelectorAll('.left-side-menu span') as HTMLSpanElement;
const addNewTodo = document.querySelector('.left-side-menu .buttons .add-new') as HTMLDivElement;
const hamburgerButton = document.querySelector('.top-bar .hamburger-button') as HTMLDivElement;

addNewTodo.addEventListener('click', () => {
  const backgroundQuery = document.querySelector('.background') as HTMLDivElement;
  backgroundQuery.style.display = 'flex';
  backgroundQuery.style.opacity = '1';
});

const expand = () => {
  span.forEach((text: any) => {
    const textToggle = text;
    textToggle.style.display = 'flex';
  });
  arrow.setAttribute('hide', 'true');
  sideBar.setAttribute('expanded', 'true');
};

const collapse = () => {
  span.forEach((text: any) => {
    const textToggle = text;
    textToggle.style.display = 'none';
  });
  arrow.setAttribute('hide', 'false');
  sideBar.setAttribute('expanded', 'false');
};

const listenClicks = () => {
  document.addEventListener('click', function listen(e: MouseEvent) {
    // @ts-ignore
    if (!sideBar.contains(e.target) && !hamburgerButton.contains(e.target)) {
      document.removeEventListener('click', listen);
      collapse();
    }
  });

  return (sideBar.getAttribute('expanded') === 'false')
    ? expand()
    : collapse();
};

hamburgerButton.addEventListener('click', listenClicks);
arrow.addEventListener('click', listenClicks);

export default { listenClicks };
