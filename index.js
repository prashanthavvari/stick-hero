
window.onload = () => {
  var isAlertClosed = window.localStorage.getItem('isVisited') || false; //var such that all files can access this variable
  isAlertClosed && closeAlert();
  let game = new Canvas();
  game.run();
}

function closeAlert() {
  document.querySelector('#alert').remove();
  window.localStorage.setItem('isVisited', true);
  isAlertClosed = true;
}
