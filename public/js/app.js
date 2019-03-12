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
filterSelection("all");
function filterSelection(c) {
  var x, i;
  x = document.getElementsByClassName("song-tile");
  if (c == "all") c = "";
  for (i = 0; i < x.length; i++) {
    w3RemoveClass(x[i], "show");
    if (x[i].className.indexOf(c) > -1) w3AddClass(x[i], "show");
  }
}

function w3AddClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      element.className += " " + arr2[i];
    }
  }
}

function w3RemoveClass(element, name) {
  var i, arr1, arr2;
  arr1 = element.className.split(" ");
  arr2 = name.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  element.className = arr1.join(" ");
}

// Add active class to the current button (highlight it)
var btns = document.getElementsByClassName("btn");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
