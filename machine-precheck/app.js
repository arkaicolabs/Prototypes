const splash=document.getElementById('splash');
const title=document.getElementById('splashTitle');
const canvas=document.getElementById('introCanvas');
const loader=document.getElementById('loader');
const app=document.getElementById('app');
const ctx=canvas?.getContext('2d',{alpha:false});
const SPRITE_URL='v8-sprite-60f.webp';
const FRAME_W=480,FRAME_H=320,COLS=10,FRAME_COUNT=60;
const CROP_X=50,CROP_Y=47,CROP_W=380,CROP_H=186;
const SOURCE_FPS=60;
const TITLE_HOLD=2000,TITLE_FADE=450,FLASH_FRAMES=32,FLASH_DURATION=(FLASH_FRAMES/SOURCE_FPS)*1000,GEAR_FADE=300,GEAR_HOLD=900,LOGIN_FADE=500;
const TOTAL=TITLE_HOLD+TITLE_FADE+FLASH_DURATION+GEAR_FADE+GEAR_HOLD+LOGIN_FADE;
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
  if(finished)return;finished=true;clearTimeout(fallbackTimer);
  splash?.remove();app?.classList.add('visible');
}
function beginCrossfade(){
  if(app.classList.contains('visible'))return;
  app.classList.remove('hidden');void app.offsetWidth;
  app.classList.add('visible');splash.classList.add('fade-out');
}
function run(img,now){
  if(startTime===null)startTime=now;
  const e=now-startTime;
  const flashStart=TITLE_HOLD+TITLE_FADE;
  const gearStart=flashStart+FLASH_DURATION;
  const gearHoldStart=gearStart+GEAR_FADE;
  const loginStart=gearHoldStart+GEAR_HOLD;

  if(e<TITLE_HOLD){
    // title only
  }else if(e<flashStart){
    title.classList.add('fade-out');
  }else if(e<gearStart){
    if(canvas.classList.contains('hidden')){title.classList.add('hidden');canvas.classList.remove('hidden');void canvas.offsetWidth;canvas.classList.add('visible');}
    const fe=e-flashStart;
    const frame=Math.min(FLASH_FRAMES-1,Math.floor((fe/1000)*SOURCE_FPS));
    if(frame!==lastFrame){lastFrame=frame;drawFrame(img,frame);}
  }else if(e<gearHoldStart){
    canvas.classList.remove('visible');
    if(loader.classList.contains('hidden')){loader.classList.remove('hidden');void loader.offsetWidth;loader.classList.add('visible');}
  }else if(e<loginStart){
    canvas.classList.add('hidden');loader.classList.add('visible');
  }else if(e<TOTAL){
    beginCrossfade();
  }else{finish();return;}
  requestAnimationFrame(t=>run(img,t));
}
if(canvas&&ctx){
  sizeCanvas();
  const img=new Image();img.decoding='async';
  img.onload=()=>requestAnimationFrame(t=>run(img,t));
  img.onerror=finish;img.src=SPRITE_URL+'?v=14';
  fallbackTimer=setTimeout(finish,TOTAL+1200);
}else finish();

document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=14').catch(()=>{}));}