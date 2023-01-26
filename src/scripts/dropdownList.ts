export default function dropdownList(event: MouseEvent) {
  const clickedHeader = event.currentTarget;

  if (!clickedHeader) return;

  const id: string = clickedHeader.getAttribute('id');
  const todos = document.querySelector(`.todos[id='${id}']`);
  const arrowSVG = document.querySelector(`svg[id='${id}']`);

  navigator.vibrate(30);
  arrowSVG?.toggleAttribute('rotated');
  todos?.toggleAttribute('collapsed');
  todos?.toggleAttribute('expanded');
}
