const splash=document.getElementById('splash');
const canvas=document.getElementById('introCanvas');
const loader=document.getElementById('loader');
const app=document.getElementById('app');
const ctx=canvas?.getContext('2d',{alpha:false});
const SPRITE_URL='v8-sprite-60f.webp';
const FRAME_W=480,FRAME_H=320,COLS=10,FRAME_COUNT=60;
const CROP_X=50,CROP_Y=47,CROP_W=380,CROP_H=186;
const SOURCE_FPS=60,PLAY_FRAMES=32;
const FLASH_DURATION=(PLAY_FRAMES/SOURCE_FPS)*1000;
const GEAR_FADE=267,GEAR_HOLD=700,LOGIN_FADE=500;
const TOTAL=FLASH_DURATION+GEAR_FADE+GEAR_HOLD+LOGIN_FADE;
let startTime=null,lastFrame=-1,finished=false,fallbackTimer;

function sizeCanvas(){
  if(!canvas)return;
  const cssW=Math.min(window.innerWidth*.72,320),cssH=cssW*(CROP_H/CROP_W),dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);
}
function drawFrame(img,n){
  if(!ctx||!canvas)return;
  const baseX=(n%COLS)*FRAME_W,baseY=Math.floor(n/COLS)*FRAME_H;
  ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,baseX+CROP_X,baseY+CROP_Y,CROP_W,CROP_H,0,0,canvas.width,canvas.height);
}
function finish(){
  if(finished)return;
  finished=true;
  clearTimeout(fallbackTimer);
  splash?.remove();
  app?.classList.add('visible');
}
function beginCrossfade(){
  if(app.classList.contains('visible'))return;
  app.classList.remove('hidden');
  void app.offsetWidth;
  app.classList.add('visible');
  splash.classList.add('fade-out');
}
function run(img,now){
  if(startTime===null)startTime=now;
  const elapsed=now-startTime;
  if(elapsed<FLASH_DURATION){
    const frame=Math.min(PLAY_FRAMES-1,Math.floor((elapsed/1000)*SOURCE_FPS));
    if(frame!==lastFrame){lastFrame=frame;drawFrame(img,frame);}
  }else if(elapsed<FLASH_DURATION+GEAR_FADE){
    if(loader.classList.contains('hidden')){
      loader.classList.remove('hidden');
      requestAnimationFrame(()=>loader.classList.add('fade-in'));
    }
    canvas.classList.add('fade-out');
  }else if(elapsed<FLASH_DURATION+GEAR_FADE+GEAR_HOLD){
    canvas.classList.add('hidden');
    loader.classList.add('fade-in');
  }else if(elapsed<TOTAL){
    beginCrossfade();
  }else{
    finish();return;
  }
  requestAnimationFrame(t=>run(img,t));
}
if(canvas&&ctx){
  sizeCanvas();
  const img=new Image();
  img.decoding='async';
  img.onload=()=>{drawFrame(img,0);requestAnimationFrame(t=>run(img,t));};
  img.onerror=finish;
  img.src=SPRITE_URL+'?v=9';
  fallbackTimer=setTimeout(finish,3200);
}else finish();

document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=13').catch(()=>{}));}