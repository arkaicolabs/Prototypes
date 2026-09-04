const splash=document.getElementById('splash');
const canvas=document.getElementById('introCanvas');
const loader=document.getElementById('loader');
const app=document.getElementById('app');
const ctx=canvas?.getContext('2d',{alpha:false});
const SPRITE_URL='v8-sprite-60f.webp';
const FRAME_W=480,FRAME_H=320,COLS=10,FRAME_COUNT=60;
const FLASH_DURATION=1000,LOADER_DURATION=600,FADE_DURATION=400,TOTAL=FLASH_DURATION+LOADER_DURATION+FADE_DURATION;
let startTime=null,lastFrame=-1,finished=false,fallbackTimer;

function sizeCanvas(){
  if(!canvas)return;
  const cssW=Math.min(window.innerWidth*.68,300),cssH=cssW*(2/3),dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);
}
function drawFrame(img,n){
  if(!ctx||!canvas)return;
  const sx=(n%COLS)*FRAME_W,sy=Math.floor(n/COLS)*FRAME_H,cw=canvas.width,ch=canvas.height;
  const scale=Math.min(cw/FRAME_W,ch/FRAME_H),dw=FRAME_W*scale,dh=FRAME_H*scale;
  ctx.fillStyle='#000';ctx.fillRect(0,0,cw,ch);
  ctx.drawImage(img,sx,sy,FRAME_W,FRAME_H,(cw-dw)/2,(ch-dh)/2,dw,dh);
}
function finish(){
  if(finished)return;finished=true;clearTimeout(fallbackTimer);
  splash?.remove();app?.classList.remove('hidden','pre-fade');
}
function run(img,now){
  if(startTime===null)startTime=now;
  const elapsed=now-startTime;
  if(elapsed<FLASH_DURATION){
    const frame=Math.min(FRAME_COUNT-1,Math.floor((elapsed/FLASH_DURATION)*FRAME_COUNT));
    if(frame!==lastFrame){lastFrame=frame;drawFrame(img,frame);}
  }else if(elapsed<FLASH_DURATION+LOADER_DURATION){
    if(!canvas.classList.contains('hidden')){canvas.classList.add('hidden');loader.classList.remove('hidden');}
  }else if(elapsed<TOTAL){
    if(!splash.classList.contains('fade-out')){
      app.classList.remove('hidden');app.classList.add('pre-fade');
      requestAnimationFrame(()=>{splash.classList.add('fade-out');app.classList.remove('pre-fade');});
    }
  }else{finish();return;}
  requestAnimationFrame(t=>run(img,t));
}
if(canvas&&ctx){
  sizeCanvas();
  const img=new Image();img.decoding='async';
  img.onload=()=>{drawFrame(img,0);requestAnimationFrame(t=>run(img,t));};
  img.onerror=finish;img.src=SPRITE_URL+'?v=8';
  fallbackTimer=setTimeout(finish,3000);
}else finish();

document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=8').catch(()=>{}));}