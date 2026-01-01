(function () {
  if (window.FortniteMenuLoaded) return;
  window.FortniteMenuLoaded = true;

  /* ================= STYLES ================= */
  const style = document.createElement("style");
  style.textContent = `
  #fmBtn{
    position:fixed;right:20px;bottom:80px;
    background:#ff7a00;color:#fff;
    padding:14px 16px;border-radius:50%;
    font:bold 18px Arial;z-index:999999;
    cursor:pointer;box-shadow:0 0 20px #000
  }
  #fm{
    position:fixed;top:50%;left:50%;
    transform:translate(-50%,-50%);
    width:460px;max-width:95vw;
    background:#0b0e14;color:#fff;
    font:14px Arial;border-radius:10px;
    z-index:999999;box-shadow:0 0 40px #000
  }
  #fmHeader{
    background:#111827;padding:10px;
    cursor:move;display:flex;
    justify-content:space-between;
    font-weight:bold
  }
  #fmTabs{
    display:flex;flex-wrap:wrap;
    background:#0f172a
  }
  .fmTab{
    flex:1 1 25%;
    text-align:center;padding:8px;
    color:#aaa;cursor:pointer
  }
  .fmTab.active{
    background:#ff7a00;color:#fff
  }
  .fmContent{
    display:none;padding:10px;
    max-height:340px;overflow:auto
  }
  .fmContent.active{display:block}
  .opt{margin:6px 0}
  .opt input[type=range]{width:100%}
  .rageTitle{
    color:#ff3b3b;font-weight:bold;
    text-align:center;margin-bottom:8px
  }
  .credits{
    text-align:center;color:#ff7a00;
    font-size:16px;margin-top:40px
  }
  `;
  document.head.appendChild(style);

  /* ================= BUTTON ================= */
  const btn = document.createElement("div");
  btn.id = "fmBtn";
  btn.textContent = "≡";
  document.body.appendChild(btn);

  /* ================= MENU ================= */
  const menu = document.createElement("div");
  menu.id = "fm";
  menu.innerHTML = `
  <div id="fmHeader">
    <span>FORTNITE MENU (UI ONLY)</span>
    <span id="fmClose">✕</span>
  </div>

  <div id="fmTabs">
    <div class="fmTab active">AIM</div>
    <div class="fmTab">PLAYER</div>
    <div class="fmTab">VISUALS</div>
    <div class="fmTab">WEAPON</div>
    <div class="fmTab">RAGE</div>
    <div class="fmTab">WORLD</div>
    <div class="fmTab">CONFIG</div>
    <div class="fmTab">CREDITS</div>
  </div>

  <div id="fmContents">
    <div class="fmContent active">
      <div class="opt"><input type="checkbox"> Aimbot</div>
      <div class="opt"><input type="checkbox"> Silent Aim</div>
      <div class="opt"><input type="checkbox"> Aim Lock</div>
      <div class="opt"><input type="checkbox"> Aim Snap</div>
      <div class="opt">FOV <input type="range" min="0" max="360"></div>
      <div class="opt">Smooth <input type="range" min="0" max="100"></div>
      <div class="opt">Prediction <input type="range" min="0" max="100"></div>
    </div>

    <div class="fmContent">
      <div class="opt"><input type="checkbox"> God Mode</div>
      <div class="opt"><input type="checkbox"> Speed Hack</div>
      <div class="opt">Speed <input type="range" min="1" max="10"></div>
      <div class="opt"><input type="checkbox"> Fly</div>
      <div class="opt"><input type="checkbox"> No Clip</div>
      <div class="opt">Jump Height <input type="range" min="1" max="10"></div>
    </div>

    <div class="fmContent">
      <div class="opt"><input type="checkbox"> Box ESP</div>
      <div class="opt"><input type="checkbox"> Skeleton ESP</div>
      <div class="opt"><input type="checkbox"> Tracers</div>
      <div class="opt"><input type="checkbox"> Wall ESP</div>
      <div class="opt"><input type="checkbox"> Health Bar</div>
      <div class="opt">ESP Distance <input type="range" min="0" max="1000"></div>
    </div>

    <div class="fmContent">
      <div class="opt"><input type="checkbox"> Rapid Fire</div>
      <div class="opt"><input type="checkbox"> No Recoil</div>
      <div class="opt"><input type="checkbox"> No Spread</div>
      <div class="opt"><input type="checkbox"> Instant Reload</div>
      <div class="opt">Fire Rate <input type="range" min="1" max="20"></div>
    </div>

    <div class="fmContent">
      <div class="rageTitle">⚠ RAGE FEATURES ⚠</div>
      <div class="opt"><input type="checkbox"> Rage Aimbot</div>
      <div class="opt"><input type="checkbox"> Spinbot 360°</div>
      <div class="opt"><input type="checkbox"> Instant Kill</div>
      <div class="opt"><input type="checkbox"> Hitbox Expander</div>
      <div class="opt">Hitbox Size <input type="range" min="1" max="10"></div>
      <div class="opt"><input type="checkbox"> Shoot Through Walls</div>
      <div class="opt"><input type="checkbox"> Max Damage</div>
      <div class="opt"><input type="checkbox"> Server Desync</div>
    </div>

    <div class="fmContent">
      <div class="opt"><input type="checkbox"> Loot ESP</div>
      <div class="opt"><input type="checkbox"> Chest ESP</div>
      <div class="opt"><input type="checkbox"> Vehicle ESP</div>
      <div class="opt"><input type="checkbox"> Storm Prediction</div>
    </div>

    <div class="fmContent">
      <div class="opt"><input type="checkbox"> Save Config</div>
      <div class="opt"><input type="checkbox"> Load Config</div>
      <div class="opt"><input type="checkbox"> Reset All</div>
    </div>

    <div class="fmContent">
      <div class="credits">
        Made by<br>
        <b>@RobloxScripter12</b><br>
        on YouTube
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(menu);

  /* ================= TABS ================= */
  const tabs = menu.querySelectorAll(".fmTab");
  const pages = menu.querySelectorAll(".fmContent");
  tabs.forEach((t, i) => {
    t.onclick = () => {
      tabs.forEach(x => x.classList.remove("active"));
      pages.forEach(x => x.classList.remove("active"));
      t.classList.add("active");
      pages[i].classList.add("active");
    };
  });

  /* ================= DRAG ================= */
  let drag = false, ox = 0, oy = 0;
  const header = menu.querySelector("#fmHeader");
  header.onmousedown = e => {
    drag = true;
    ox = e.clientX - menu.offsetLeft;
    oy = e.clientY - menu.offsetTop;
  };
  document.onmousemove = e => {
    if (drag) {
      menu.style.left = e.clientX - ox + "px";
      menu.style.top = e.clientY - oy + "px";
      menu.style.transform = "none";
    }
  };
  document.onmouseup = () => drag = false;

  /* ================= OPEN / CLOSE ================= */
  menu.querySelector("#fmClose").onclick = () => menu.style.display = "none";
  btn.onclick = () => menu.style.display = "block";
})();
      
