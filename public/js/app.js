document.onreadystatechange = function() {
  var state = document.readyState;
  if (state == "complete") {
    document.getElementById("interactive");
    document.getElementById("loader").classList.add("fade-out");
  }
};
window.onload = function() {
  let playBtn = document.getElementsByClassName("play");
  let pauseBtn = document.getElementsByClassName("pause");
  let trackImage = document.getElementsByClassName("track-image");
  if (playBtn.length > 0) {
    for (let i = 0; i < playBtn.length; i++) {
      playBtn[i].addEventListener("click", function() {
        playBtn[i].classList.add("hide");
        trackImage[i].classList.add("wobble");
        pauseBtn[i].classList.remove("hide");
      });
      pauseBtn[i].addEventListener("click", function() {
        pauseBtn[i].classList.add("hide");
        playBtn[i].classList.remove("hide");
        trackImage[i].classList.remove("wobble");
      });
    }
  }
};
