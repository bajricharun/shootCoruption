function myMove() {
  var maxSize = screen.height;
  var elem = document.getElementById("img1");
  var pos = 0;
  var id = setInterval(frame, 1);
  function frame() {
    if (pos == maxSize) {
      alert("Dodara je pobjegao.");
      clearInterval(id);
    } else {
      pos++;

      elem.style.top = pos + "px";
    }
  }
}
