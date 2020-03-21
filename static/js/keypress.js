function gun() {
  const arrow = document.getElementById("arrow");
  const gun = document.getElementById("gun");
  onmousemove = function(e) {
    gun.style.top = e.clientY + "px";
    arrow.style.top = e.clientY + "px";
  };
}

function shoot() {
  const arrow = document.getElementById("arrow");
  arrow.style.display = "block";
  var pos = 0;
  var maxSize = screen.width;
  var id = setInterval(frame, 0.5);
  function frame() {
    if (pos == maxSize) {
      arrow.style.display = "none";
      arrow.style.left = "20px";
      clearInterval(id);
    } else {
      pos++;

      arrow.style.borderTopLeftRadius = pos + "px";
    }
  }
}
