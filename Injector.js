(function () {
  if (window.InjectorMenuLoaded) return;
  window.InjectorMenuLoaded = true;

  /* ========== STYLE ========== */
  const css = document.createElement("style");
  css.textContent = `
  #injBtn{
    position:fixed;right:20px;bottom:90px;
    background:#ff5a00;color:#fff;
    padding:14px;border-radius:50%;
    font-size:20px;cursor:pointer;
    z-index:999999
  }

  #injector{
    position:fixed;top:50%;left:50%;
    transform:translate(-50%,-50%);
    width:900px;height:520px;
    background:#0d0f14;
    color:#fff;font-family:Arial;
    border-radius:12px;
    box-shadow:0 0 60px #000;
    display:flex;
    z-index:999999
  }

  #sidebar{
    width:220px;
    background:#11131a;
    border-right:1px solid #1f2330;
    display:flex;flex-direction:column
  }

  #sidebar h2{
    text-align:center;
    padding:14px;
    background:#0b0d12;
    color:#ff5a00;
    margin:0
  }

  .nav{
    padding:12px 18px;
    color:#aaa;
    cursor:pointer
  }
  .nav.active{
    background:#ff5a00;
    color:#fff
  }

  #main{
    flex:1;
    padding:16px;
    overflow:auto
  }

  .page{display:none}
  .page.active{display:block}

  .section{
    background:#11131a;
    border:1px solid #1f2330;
    border-radius:8px;
    padding:12px;
    margin-bottom:12px
  }

  .section h3{
    margin:0 0 8px 0;
    color:#ff5a00
  }

  .opt{margin:6px 0}
  input[type=range]{width:100%}

  .rage{
    border:1px solid #ff3333;
    box-shadow:0 0 20px #ff333344
  }

  .credits{
    text-align:center;
    margin-top:100px;
    font-size:20px;
    color:#ff5a00
  }
  `;
  document.head.appendChild(css);

  /* ========== BUTTON ========== */
  const btn = document.createElement("div");
  btn.id = "injBtn";
  btn.textContent = "☰";
  document.body.appendChild(btn);

  /* ========== MENU ========== */
  const ui = document.createElement("div");
  ui.id = "injector";
  ui.innerHTML = `
  <div id="sidebar">
    <h2>FORTNITE</h2>
    <div class="nav active">Aimbot</div>
    <div class="nav">Player</div>
    <div class="nav">Visuals</div>
    <div class="nav">Weapons</div>
    <div class="nav">Rage</div>
    <div class="nav">World</div>
    <div class="nav">Configs</div>
    <div class="nav">Credits</div>
  </div>

  <div id="main">
    <div class="page active">
      <div class="section">
        <h3>Aimbot</h3>
        <div class="opt"><input type="checkbox"> Enable Aimbot</div>
        <div class="opt"><input type="checkbox"> Silent Aim</div>
        <div class="opt"><input type="checkbox"> Aim Lock</div>
        <div class="opt">FOV <input type="range"></div>
        <div class="opt">Smooth <input type="range"></div>
      </div>
    </div>

    <div class="page">
      <div class="section">
        <h3>Player</h3>
        <div class="opt"><input type="checkbox"> God Mode</div>
        <div class="opt"><input type="checkbox"> Fly</div>
        <div class="opt"><input type="checkbox"> No Clip</div>
        <div class="opt">Speed <input type="range"></div>
        <div class="opt">Jump <input type="range"></div>
      </div>
    </div>

    <div class="page">
      <div class="section">
        <h3>ESP</h3>
        <div class="opt"><input type="checkbox"> Box ESP</div>
        <div class="opt"><input type="checkbox"> Skeleton</div>
        <div class="opt"><input type="checkbox"> Tracers</div>
        <div class="opt"><input type="checkbox"> Health Bars</div>
      </div>
    </div>

    <div class="page">
      <div class="section">
        <h3>Weapon Mods</h3>
        <div class="opt"><input type="checkbox"> No Recoil</div>
        <div class="opt"><input type="checkbox"> Rapid Fire</div>
        <div class="opt"><input type="checkbox"> Instant Reload</div>
        <div class="opt">Fire Rate <input type="range"></div>
      </div>
    </div>

    <div class="page">
      <div class="section rage">
        <h3>⚠ RAGE ⚠</h3>
        <div class="opt"><input type="checkbox"> Rage Aimbot</div>
        <div class="opt"><input type="checkbox"> Spinbot</div>
        <div class="opt"><input type="checkbox"> Hitbox Expander</div>
        <div class="opt"><input type="checkbox"> Shoot Through Walls</div>
        <div class="opt">Hitbox Size <input type="range"></div>
      </div>
    </div>

    <div class="page">
      <div class="section">
        <h3>World</h3>
        <div class="opt"><input type="checkbox"> Loot ESP</div>
        <div class="opt"><input type="checkbox"> Storm Info</div>
        <div class="opt"><input type="checkbox"> Vehicle ESP</div>
      </div>
    </div>

    <div class="page">
      <div class="section">
        <h3>Configs</h3>
        <div class="opt"><input type="checkbox"> Save Config</div>
        <div class="opt"><input type="checkbox"> Load Config</div>
        <div class="opt"><input type="checkbox"> Reset</div>
      </div>
    </div>

    <div class="page">
      <div class="credits">
        Made by<br>
        <b>@RobloxScripter12</b><br>
        YouTube
      </div>
    </div>
  </div>
  `;
  document.body.appendChild(ui);

  /* ========== NAV ========== */
  const navs = ui.querySelectorAll(".nav");
  const pages = ui.querySelectorAll(".page");
  navs.forEach((n,i)=>{
    n.onclick=()=>{
      navs.forEach(x=>x.classList.remove("active"));
      pages.forEach(x=>x.classList.remove("active"));
      n.classList.add("active");
      pages[i].classList.add("active");
    };
  });

  /* ========== TOGGLE ========== */
  ui.style.display="none";
  btn.onclick=()=>ui.style.display="flex";
})();
    
