const splash=document.getElementById('splash');
const title=document.getElementById('splashTitle');
const canvas=document.getElementById('introCanvas');
const app=document.getElementById('app');
const ctx=canvas?.getContext('2d',{alpha:false});
const SPRITE_URL='v8-sprite-60f.webp';
const FRAME_W=480,FRAME_H=320,COLS=10;
const CROP_X=50,CROP_Y=47,CROP_W=380,CROP_H=186;
const TITLE_FADE=150,TITLE_HOLD=2000;
const FLASH_FRAMES=32,SOURCE_FPS=60,FLASH_DURATION=(FLASH_FRAMES/SOURCE_FPS)*1000;
const LOGIN_FADE=200,TOTAL=TITLE_FADE+TITLE_HOLD+FLASH_DURATION+LOGIN_FADE;
let start=null,last=-1,done=false,fallback;

function sizeCanvas(){
  const cssW=Math.min(innerWidth*.72,320),cssH=cssW*(CROP_H/CROP_W),dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=Math.round(cssW*dpr);canvas.height=Math.round(cssH*dpr);
}
function draw(img,n){
  const bx=(n%COLS)*FRAME_W,by=Math.floor(n/COLS)*FRAME_H;
  ctx.fillStyle='#000';ctx.fillRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img,bx+CROP_X,by+CROP_Y,CROP_W,CROP_H,0,0,canvas.width,canvas.height);
}
function finish(){
  if(done)return;done=true;clearTimeout(fallback);splash?.remove();app?.classList.add('visible');
}
function crossfade(){
  if(app.classList.contains('visible'))return;
  app.classList.remove('hidden');void app.offsetWidth;app.classList.add('visible');splash.classList.add('fade-out');
}
function run(img,now){
  if(start===null){start=now;requestAnimationFrame(()=>title.classList.add('visible'));}
  const e=now-start,flashStart=TITLE_FADE+TITLE_HOLD,loginStart=flashStart+FLASH_DURATION;
  if(e<flashStart){
    // title fade-in then hold
  }else if(e<loginStart){
    if(!title.classList.contains('hidden')){
      title.classList.add('cut-away');
      canvas.classList.remove('hidden');
      canvas.classList.add('cut-in','visible');
    }
    const fe=e-flashStart;
    const frame=Math.min(FLASH_FRAMES-1,Math.floor((fe/1000)*SOURCE_FPS));
    if(frame!==last){last=frame;draw(img,frame);}
  }else if(e<TOTAL){
    canvas.classList.remove('visible');crossfade();
  }else{finish();return;}
  requestAnimationFrame(t=>run(img,t));
}
if(canvas&&ctx){
  sizeCanvas();const img=new Image();img.decoding='async';
  img.onload=()=>requestAnimationFrame(t=>run(img,t));
  img.onerror=finish;img.src=SPRITE_URL+'?v=16';
  fallback=setTimeout(finish,TOTAL+1200);
}else finish();

document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js?v=16').catch(()=>{}));}