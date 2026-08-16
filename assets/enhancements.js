document.addEventListener('DOMContentLoaded', () => {
  const css = `
    .quick{gap:12px!important}.quick button{transition:transform .25s,box-shadow .25s,background .25s}.langbtn{display:grid;place-items:center;width:42px;min-width:42px;padding:0;background:linear-gradient(145deg,#ffffff35,#ffffff0d)!important;box-shadow:inset 0 1px 0 #fff5}.langbtn:hover{transform:rotate(12deg) scale(1.1);background:#fff!important}.login{display:inline-flex;align-items:center;gap:8px;position:relative;overflow:hidden;box-shadow:0 7px 17px #0003}.login:before{content:'';position:absolute;width:32px;height:120%;background:#fff7;transform:translateX(-54px) skewX(-24deg);transition:.45s}.login:hover:before{transform:translateX(130px) skewX(-24deg)}.login:hover{transform:translateY(-3px);box-shadow:0 11px 21px #0004}.profile{position:relative}.profile-button{display:flex;align-items:center;gap:8px;background:#fff;color:var(--ink);padding:5px 12px 5px 5px;font-size:10px;font-weight:700;box-shadow:0 7px 17px #0003}.avatar{width:29px;height:29px;border-radius:50%;display:grid;place-items:center;background:var(--acid);font-size:10px}.profile-menu{display:none;position:absolute;right:0;top:48px;width:177px;padding:8px;background:white;color:var(--ink);box-shadow:0 14px 30px #001b1d3c}.profile-menu.show{display:block;animation:profileIn .2s both}.profile-menu b,.profile-menu span{display:block;padding:8px;font-size:11px}.profile-menu span{color:var(--muted);font-size:10px;border-bottom:1px solid #e4e5df}.profile-menu button{width:100%;padding:9px;text-align:left;background:#f0f2e5;font-size:10px;font-weight:700}@keyframes profileIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}.loginbox .name-field{display:block}.loginbox .toggle-auth{font-size:10px;color:var(--muted);margin-top:14px}.loginbox .toggle-auth button{padding:0;background:none;color:#39706d;font-weight:700;font-size:10px}@media(max-width:720px){.quick .login{display:inline-flex}.login{font-size:0;padding:11px}.login svg{margin:0}.login:after{content:'↗';font-size:14px}.profile-button{padding:5px}.profile-button strong{display:none}}
  `;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  const loginButton = document.querySelector('.quick .login');
  const langButton = document.querySelector('.langbtn');
  if (!loginButton || !langButton) return;
  loginButton.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="3.4"/><path d="M4.5 20c.9-3.6 3.5-5.4 7.5-5.4s6.6 1.8 7.5 5.4"/></svg> LOGIN / SIGN UP`;
  loginButton.setAttribute('aria-label', 'Login or sign up');
  langButton.innerHTML = '🌐';
  langButton.title = 'Choose language';
  const form = document.querySelector('#loginmodal form');
  form.insertAdjacentHTML('afterbegin', `<div class="field name-field"><label>YOUR NAME</label><input id="usernameField" required placeholder="How should we call you?"></div>`);
  form.insertAdjacentHTML('beforeend', `<div class="toggle-auth">New traveler? Enter your name and we will create your account automatically.</div>`);
  function initials(name){return name.split(' ').map(p=>p[0]).join('').slice(0,2).toUpperCase()}
  function showProfile(name){
    const quick = document.querySelector('.quick');
    quick.innerHTML = `<div class="langbox"><button class="langbtn" id="langbtn">🌐</button><div class="languages" id="languages"><button>🇬🇧 English</button><button>🇪🇬 العربية</button><button>🇫🇷 Français</button><button>🇪🇸 Español</button><button>🇩🇪 Deutsch</button><button>🇮🇹 Italiano</button></div></div><div class="profile"><button class="profile-button" id="profileButton"><span class="avatar">${initials(name)}</span><strong>Hi, ${name.split(' ')[0]}</strong>⌄</button><div class="profile-menu" id="profileMenu"><b>Signed in as</b><span>${name}</span><button id="signOut">SIGN OUT</button></div></div>`;
    const languageToggle = document.getElementById('langbtn');
    const languageMenu = document.getElementById('languages');
    languageToggle.onclick = () => languageMenu.classList.toggle('show');
    document.querySelectorAll('.languages button').forEach(item => item.onclick = () => {languageToggle.textContent=item.textContent.slice(0,2);languageMenu.classList.remove('show')});
    profileButton.onclick=()=>profileMenu.classList.toggle('show');
    signOut.onclick=()=>{localStorage.removeItem('travelGateUser');location.reload()};
  }
  const savedUser = localStorage.getItem('travelGateUser');
  if(savedUser) showProfile(savedUser);
  window.signIn = event => {
    event.preventDefault();
    const name = document.getElementById('usernameField').value.trim();
    localStorage.setItem('travelGateUser', name);
    window.closeLogin();
    showProfile(name);
  };
});
