<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>UI Demo</title>
<style>
:root{
 --accent:#7b2cff;
 --bg:#0b0814;
 --panel:#120d1f;
 --glow:0 0 25px var(--accent);
}
*{box-sizing:border-box}
body{
 margin:0;
 background:#05030a;
 font-family:Segoe UI,Arial;
 color:#fff;
 overflow:hidden;
}

/* ===== INJECT SCREEN ===== */
#inject{
 position:fixed;inset:0;
 background:#05030a;
 display:flex;
 align-items:center;
 justify-content:center;
 z-index:10;
}
#injectBox{
 width:360px;
}
#injectTitle{
 font-size:22px;
 font-weight:900;
 color:var(--accent);
}
#injectStatus{
 color:#aaa;
 margin:8px 0;
}
#injectBarBg{
 height:10px;
 background:#1a1230;
 border-radius:10px;
 overflow:hidden;
}
#injectBar{
 height:100%;
 width:0%;
 background:var(--accent);
 transition:width .2s;
}

/* ===== UI ===== */
#ui{
 position:fixed;
 top:80px;
 left:40px;
 width:460px;
 height:520px;
 background:var(--bg);
 border-radius:18px;
 box-shadow:var(--glow);
 display:none;
 overflow:hidden;
}

/* HEADER */
#header{
 height:50px;
 background:linear-gradient(90deg,#1a1033,#2c1460);
 display:flex;
 align-items:center;
 padding:0 14px;
 cursor:move;
}
#logo{
 font-weight:900;
 font-size:18px;
}
#winBtns{
 margin-left:auto;
 color:#aaa;
}

/* BODY */
#body{
 display:flex;
 height:calc(100% - 50px);
}

/* SIDEBAR */
#sidebar{
 width:130px;
 background:#120d1f;
 padding:10px;
 overflow-y:auto;
}
.tab{
 padding:8px;
 border-radius:10px;
 margin-bottom:6px;
 background:#1c1433;
 cursor:pointer;
}
.tab:hover{
 box-shadow:0 0 10px var(--accent);
}

/* CONTENT */
#content{
 flex:1;
 padding:14px;
 overflow-y:auto;
}

/* CONTROLS */
h3{color:var(--accent)}
label{display:block;margin-bottom:10px}
input[type=range]{width:100%}
select{
 width:100%;
 background:#1c1433;
 color:#fff;
 border:none;
 padding:6px;
 border-radius:6px;
}

/* ANIMATION */
@keyframes bgMove{
 0%{background-position:0% 50%}
 50%{background-position:100% 50%}
 100%{background-position:0% 50%}
}
</style>
</head>
<body>

<!-- INJECT -->
<div id="inject">
 <div id="injectBox">
  <div id="injectTitle">Injecting UI Demo</div>
  <div id="injectStatus">Initializing modules…</div>
  <div id="injectBarBg">
   <div id="injectBar"></div>
  </div>
 </div>
</div>

<!-- UI -->
<div id="ui">
 <div id="header">
  <div id="logo">UI DEMO</div>
  <div id="winBtns">● ● ●</div>
 </div>
 <div id="body">
  <div id="sidebar"></div>
  <div id="content"></div>
 </div>
</div>

<script>
/* ===== FAKE INJECT ===== */
let p=0;
const msgs=[
 "Loading driver…",
 "Resolving offsets…",
 "Mapping memory…",
 "Finalizing injection…"
];
const bar=document.getElementById("injectBar");
const stat=document.getElementById("injectStatus");
const injectInt=setInterval(()=>{
 p+=5;
 bar.style.width=p+"%";
 stat.textContent=msgs[Math.min(msgs.length-1,Math.floor(p/25))];
 if(p>=100){
  clearInterval(injectInt);
  document.getElementById("inject").style.display="none";
  document.getElementById("ui").style.display="block";
 }
},150);

/* ===== DRAG ===== */
const ui=document.getElementById("ui");
const header=document.getElementById("header");
let d=false,x=0,y=0;
header.onmousedown=e=>{d=true;x=e.clientX-ui.offsetLeft;y=e.clientY-ui.offsetTop};
document.onmouseup=()=>d=false;
document.onmousemove=e=>{if(d){ui.style.left=e.clientX-x+"px";ui.style.top=e.clientY-y+"px"}};

/* ===== TABS ===== */
const tabs=[
 "Visuals","Aimbot","Players","Weapons","Movement",
 "World","Misc","Presets","Settings","About"
];
const sidebar=document.getElementById("sidebar");
const content=document.getElementById("content");

function slider(n,a,b){
 return `${n}<input type="range" min="${a}" max="${b}"><br><br>`;
}
function toggle(n){
 return `<label><input type="checkbox"> ${n}</label>`;
}
function dropdown(n,o){
 return `${n}<select>${o.map(v=>`<option>${v}</option>`).join("")}</select><br><br>`;
}

function loadTab(t){
 content.innerHTML=`<h3>${t}</h3>`;
 if(t=="Visuals"){
  content.innerHTML+=toggle("ESP")+toggle("Boxes")+slider("Render Distance",0,500);
 }
 if(t=="Aimbot"){
  content.innerHTML+=dropdown("Mode",["Legit","Rage","Magic"]);
  content.innerHTML+=slider("FOV",0,180);
  content.innerHTML+=slider("Smooth",0,100);
 }
 if(t=="Movement"){
  content.innerHTML+=slider("Speed",1,10)+toggle("Auto Jump");
 }
 if(t=="Presets"){
  content.innerHTML+=dropdown("Preset",["Legit","Semi-Rage","Rage","Stream Safe","Custom"]);
 }
 if(t=="Settings"){
  content.innerHTML+=toggle("Animated Background")+slider("Glow Strength",0,100);
 }
 if(t=="About"){
  content.innerHTML+=`
   <p>Ultimate Fake Fortnite Injector UI</p>
   <p>Visual demo only</p>
   <p>No games harmed</p>
  `;
 }
}

tabs.forEach(t=>{
 const b=document.createElement("div");
 b.className="tab";
 b.textContent=t;
 b.onclick=()=>loadTab(t);
 sidebar.appendChild(b);
});
loadTab("Visuals");
</script>

</body>
</html>
