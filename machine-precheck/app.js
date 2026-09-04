const splash=document.getElementById('splash');
const video=document.getElementById('introVideo');
const app=document.getElementById('app');
let revealed=false;
function revealApp(){if(revealed)return;revealed=true;splash?.remove();app?.classList.remove('hidden');}
video?.addEventListener('ended',revealApp,{once:true});
video?.addEventListener('error',revealApp,{once:true});
setTimeout(revealApp,1150);
document.getElementById('signinForm')?.addEventListener('submit',e=>{e.preventDefault();document.getElementById('signin')?.classList.add('hidden');document.getElementById('home')?.classList.remove('hidden');});
document.getElementById('scanBtn')?.addEventListener('click',()=>alert('QR scanning is intentionally not connected in this prototype.'));
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));}
