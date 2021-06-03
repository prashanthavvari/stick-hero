var isAlertClosed = false; //var such that all files can access this variable
let game = new Canvas();
game.run();

function closeAlert() {
  document.querySelector('#alert').remove();
  isAlertClosed = true;
}
