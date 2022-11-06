function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startRef = document.querySelector('[data-start]');
const stopRef = document.querySelector('[data-stop]');

let timerId;
startRef.addEventListener('click', function (evt) {
  timerId = setInterval(setDocumentColor, 1000);
  evt.target.disabled = true;
  console.log(timerId);
});

stopRef.addEventListener('click', function (evt) {
  clearInterval(timerId);
  startRef.disabled = false;
});

function setDocumentColor() {
  const color = getRandomHexColor();
  document.body.style.backgroundColor = color;
}
