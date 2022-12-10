let img = new Image();
let next = 0;
img.src = 'images/Explorer.png';
img.onload = function() {
  init();
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

function init() {
  
  let time_delay = function()
  {
    ctx.drawImage(img, 64*next, 640, 64, 64, 0, 0, 64, 64);
  }
  for(let i = 0; i < 10; i++)
  {
    setTimeout(time_delay, 1000);
    next = i;
    
  }
  
}