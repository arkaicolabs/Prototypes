const splash=document.getElementById('splash');
const video=document.getElementById('introVideo');
const app=document.getElementById('app');
let revealed=false;
let fallbackTimer;
function revealApp(){if(revealed)return;revealed=true;clearTimeout(fallbackTimer);video?.pause();splash?.remove();app?.classList.remove('hidden');}
function startIntro(){
  if(!video){revealApp();return;}
  video.muted=true;
  video.defaultMuted=true;
  video.playsInline=true;
  video.controls=false;
  try{video.currentTime=0;}catch{}
  const attempt=video.play();
  if(attempt&&typeof attempt.catch==='function'){
    attempt.catch(()=>revealApp());
  }
}
video?.addEventListener('ended',revealApp,{once:true});
video?.addEventListener('error',revealApp,{once:true});
video?.addEventListener('canplay',startIntro,{once:true});
startIntro();
fallbackTimer=setTimeout(revealApp,1400);
document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
