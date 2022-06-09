let upload = document.getElementById('upload');
let audio = document.getElementById('audio');
let previous = document.getElementById('previous');
let play = document.getElementById('play');
let pause = document.getElementById('pause');
let next = document.getElementById('next');
let range = document.getElementById('range');
let volume = document.getElementById('volume');
let interFace = document.querySelector('.interface');
let uploadParent = document.querySelector('.upload');
let timeNow = document.querySelector('.now');
let Alltime = document.querySelector('.all');
let high = document.querySelector('.high');
let silence = document.querySelector('.silence');

upload.onchange = function () {
       uploadParent.style.display = 'none';
       interFace.style.display = 'block';
       let file = new FileReader();
       file.readAsDataURL(upload.files[0]);
       file.onload = function () {
              audio.src = file.result;
              audio.onloadedmetadata = function () {
                     Alltime.innerHTML = timeConvert(audio.duration);
              };
       };
};

play.onclick = function () {
       play.classList.add('hide');
       pause.classList.remove('hide');
       audio.play();
};

pause.onclick = function () {
       pause.classList.add('hide');
       play.classList.remove('hide');
       audio.pause();
};

let timeConvert = function (time) {
       let minutes = Math.floor(time / 60);
       minutes < 10 ? (minutes = `0${minutes}`) : minutes;
       let seconds = Math.floor(time % 60);
       seconds < 10 ? (seconds = `0${seconds}`) : seconds;
       return `${minutes}:${seconds}`;
};

setInterval(() => {
       timeNow.innerHTML = timeConvert(audio.currentTime);
       range.value = (audio.currentTime / audio.duration) * 100;
}, 1000);

range.oninput = function () {
       audio.currentTime = (range.value * audio.duration) / 100;
};

volume.oninput = function () {
       audio.volume = volume.value;
       if (volume.value == 0) {
              high.classList.add('hide');
              silence.classList.remove('hide');
       } else {
              silence.classList.add('hide');
              high.classList.remove('hide');
       }
};
