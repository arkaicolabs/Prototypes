const splash=document.getElementById('splash');
const canvas=document.getElementById('introCanvas');
const app=document.getElementById('app');
const ctx=canvas?.getContext('2d',{alpha:false});
const SPRITE_URL='v8-sprite-60f.webp';
const FRAME_W=480,FRAME_H=320,COLS=10,FRAME_COUNT=60,FLASH_DURATION=1000,SPLASH_DURATION=2000;
let revealed=false,startTime=null,lastFrame=-1,fallbackTimer;

function revealApp(){
  if(revealed)return;
  revealed=true;
  clearTimeout(fallbackTimer);
  splash?.remove();
  app?.classList.remove('hidden');
}
function resizeCanvas(){
  if(!canvas)return;
  const dpr=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.max(1,Math.round(window.innerWidth*dpr));
  canvas.height=Math.max(1,Math.round(window.innerHeight*dpr));
}
function drawFrame(img,n){
  if(!ctx||!canvas)return;
  const sx=(n%COLS)*FRAME_W,sy=Math.floor(n/COLS)*FRAME_H;
  const cw=canvas.width,ch=canvas.height;
  const scale=Math.min(cw/FRAME_W,ch/FRAME_H);
  const dw=FRAME_W*scale,dh=FRAME_H*scale,dx=(cw-dw)/2,dy=(ch-dh)/2;
  ctx.fillStyle='#000';ctx.fillRect(0,0,cw,ch);
  ctx.drawImage(img,sx,sy,FRAME_W,FRAME_H,dx,dy,dw,dh);
}
function run(img,now){
  if(revealed)return;
  if(startTime===null)startTime=now;
  const elapsed=now-startTime;
  const flashElapsed=Math.min(elapsed,FLASH_DURATION-0.001);
  const frame=Math.min(FRAME_COUNT-1,Math.floor((flashElapsed/FLASH_DURATION)*FRAME_COUNT));
  if(frame!==lastFrame){lastFrame=frame;drawFrame(img,frame);}
  if(elapsed<SPLASH_DURATION)requestAnimationFrame(t=>run(img,t));
  else revealApp();
}
if(canvas&&ctx){
  resizeCanvas();
  const img=new Image();
  img.decoding='async';
  img.onload=()=>{drawFrame(img,0);requestAnimationFrame(t=>run(img,t));};
  img.onerror=revealApp;
  img.src=SPRITE_URL+'?v=3';
  window.addEventListener('resize',()=>{resizeCanvas();if(img.complete&&lastFrame>=0)drawFrame(img,lastFrame);});
  fallbackTimer=setTimeout(revealApp,2500);
}else revealApp();

document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=5').catch(()=>{}));}
