export {};

const title = document.querySelector('title') as HTMLTitleElement;
// @ts-ignore
if (__APP_VERSION__) title.innerHTML += ` // v.${__APP_VERSION__}`;
