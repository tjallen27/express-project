window.onload = function() {
  let playBtn = document.getElementsByClassName("play");
  let pauseBtn = document.getElementsByClassName("pause");

  if (playBtn.length > 0) {
    for (let i = 0; i < playBtn.length; i++) {
      playBtn[i].addEventListener("click", function() {
        playBtn[i].classList.add("hide");
        pauseBtn[i].classList.remove("hide");
      });
      pauseBtn[i].addEventListener("click", function() {
        pauseBtn[i].classList.add("hide");
        playBtn[i].classList.remove("hide");
      });
    }
  }
};
