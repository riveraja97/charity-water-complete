:root{
  --brand-blue: #2e9df7;
  --brand-yellow: #ffc907;
  --brand-dark: #231f20;
  --bg: #cdeeff;
}

*{box-sizing:border-box}
html,body{height:100%;margin:0;font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,"Helvetica Neue",Arial;}
body{background:linear-gradient(180deg,#bfeaff 0%, #87d5ff 100%); color:var(--brand-dark); display:flex; flex-direction:column; align-items:center;}

header{width:100%; max-width:900px; margin-top:12px; text-align:center;}
h1{margin:8px 0; font-size:28px; color:var(--brand-dark); letter-spacing:2px;}
.hud{display:flex;justify-content:space-between; align-items:center; padding:6px 12px; background:rgba(255,255,255,0.9); border-radius:8px; margin-bottom:8px; box-shadow:0 2px 6px rgba(0,0,0,0.08);}
/* HUD items */
.hud > div{min-width:110px; text-align:center; font-weight:600; color:var(--brand-dark);}

/* canvas container */
main{width:100%; max-width:900px; display:flex; flex-direction:column; align-items:center; position:relative; margin-bottom:12px;}
canvas{background:linear-gradient(#87ceeb,#2e9df7); width:95%; max-width:880px; height:420px; border-radius:8px; border:3px solid var(--brand-dark); display:block; touch-action:none;}

/* Mobile controls */
#mobileControls{display:flex; gap:12px; margin-top:8px;}
.touch-btn{background:var(--brand-yellow); border:none; padding:12px 18px; font-size:16px; border-radius:8px; box-shadow:0 4px 8px rgba(0,0,0,0.15); cursor:pointer;}
.touch-btn:active{transform:translateY(2px)}

/* Menus */
.menu{position:fixed; left:50%; transform:translateX(-50%); top:12%; width:340px; max-width:92%; background:#fff; border-radius:12px; padding:18px; box-shadow:0 8px 30px rgba(0,0,0,0.15); border:3px solid var(--brand-dark); z-index:50; text-align:center;}
.menu h2, .menu h3{margin:6px 0 12px 0;}
.menu-buttons{display:flex;flex-direction:column; gap:10px; margin-top:6px;}
.menu .menu-buttons button{background:var(--brand-yellow); border:none; padding:10px; border-radius:8px; font-weight:700; cursor:pointer;}
.menu .menu-buttons button:hover{background:var(--brand-blue); color:#fff}

/* character list */
.char-list{display:flex; justify-content:center; gap:12px; margin-bottom:10px;}
.char-skin{width:64px; height:64px; border-radius:10px; border:3px solid var(--brand-dark); display:flex; align-items:center; justify-content:center; font-weight:700; cursor:pointer;}
.char-skin.locked{opacity:.45; filter:grayscale(.4); cursor:default; position:relative;}
.char-skin.locked::after{content:"🔒"; position:absolute; font-size:18px; right:6px; top:6px;}

/* overlay & toast */
.overlay{position:fixed; inset:0; background:rgba(0,0,0,0.35); z-index:40;}
.hidden{display:none;}
.toast{position:fixed; left:50%; transform:translateX(-50%); bottom:16px; background:rgba(255,255,255,0.95); padding:10px 14px; border-radius:8px; box-shadow:0 6px 18px rgba(0,0,0,0.18); border:2px solid var(--brand-dark); z-index:70; font-weight:700}

/* game over details */
#gameOver p{margin:6px 0}

/* small responsive tweaks */
.credit{font-size:12px;color:#555;margin-top:8px}
footer{width:100%; max-width:900px; text-align:center; margin:12px auto 30px; color:var(--brand-dark);}
.desktop-only{display:block}
.mobile-only{display:none}

/* responsive */
@media(max-width:768px){
  canvas{height:56vh;}
  .desktop-only{display:none}
  .mobile-only{display:block}
  .menu{top:6%}
}

/* small UI effects used by script (hit flash) */
.flash { animation: flashAnim 400ms linear; }
@keyframes flashAnim { 0%{opacity:0.15} 50%{opacity:1} 100%{opacity:0.15} }
