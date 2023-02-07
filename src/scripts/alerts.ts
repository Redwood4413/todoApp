const displayTagAlert = (alertMessage: string, bgColor: '#2c9609' | '#d11717') => {
  const alertBox = document.querySelector('.alert-box') as HTMLDivElement;
  const alert = document.createElement('div') as HTMLDivElement;
  const span = document.createElement('span') as HTMLSpanElement;
  span.setAttribute('id', 'close');
  alert.setAttribute('class', 'alert');

  alert.innerHTML = `<span>${alertMessage}</span>`;
  alert.style.backgroundColor = bgColor;
  alert.appendChild(span);
  alertBox.append(alert);

  // Listener, which allows to hide clicked alert
  span.addEventListener('click', () => {
    const stopToRight = [
      { transform: 'translateX(-50%)' },
      { transform: 'translateX(100%)' },
    ];
    const timing = {
      duration: 200,
      iterations: 1,
    };
    setTimeout(() => {
      alert.remove();
    }, 200);
    alert.animate(stopToRight, timing);
  });
  setTimeout(() => {
    alert.remove();
  }, 3500);
};

export default displayTagAlert;
