// SERVICES DATA (EN/ES)
const svc = {
  ops: {
    en: {
      title: "BUSINESS OPERATIONS",
      icon: '<i class="fa-thin fa-briefcase"></i>',
      desc: "Streamline your processes, maximize efficiency, ensure compliance, and scale your business with precision.",
      modal: {
        title: "BUSINESS OPERATIONS",
        img: "https://placehold.co/96x96?text=OPS",
        imgAlt: "Business Operations",
        content: "Detailed content about our Business Operations services. We help optimize your processes, boost efficiency, and drive growth through strategic operational support. Key areas: process optimization, supply chain management, quality assurance.",
        video: "Video placeholder",
        features: [
          "Workflow digitization & automation",
          "Logistics & inventory efficiency",
          "Risk & compliance frameworks (NIST, ISO, CISA)",
          "Performance metric dashboards & analytics",
          "Remote training & Lean operations"
        ],
        learn: "services/gestion.html"
      }
    },
    es: {
      title: "OPERACIONES EMPRESARIALES",
      icon: '<i class="fa-thin fa-briefcase"></i>',
      desc: "Optimice procesos, mejore la eficiencia, asegure cumplimiento y escale su empresa con precisión.",
      modal: {
        title: "SOBRE OPERACIONES EMPRESARIALES",
        img: "https://placehold.co/96x96?text=OPS",
        imgAlt: "Operaciones Empresariales",
        content: "Contenido detallado sobre nuestros servicios de Operaciones Empresariales. Ayudamos a optimizar sus procesos, mejorar la eficiencia e impulsar el crecimiento mediante el apoyo operativo estratégico. Las áreas clave incluyen la optimización de procesos, la gestión de la cadena de suministro y el aseguramiento de la calidad.",
        video: "Video placeholder",
        features: [
          "Digitalización y automatización del flujo de trabajo",
          "Estrategias de eficiencia logística e inventario",
          "Marcos de riesgo y cumplimiento (alineados a NIST, ISO, CISA)",
          "Cuadros de métricas de rendimiento y análisis",
          "Capacitación remota y operaciones Lean"
        ],
        learn: "services/gestion.html"
      }
    }
    document.getElementById('fab-chat').onclick = () => location.href = 'chatbot.html';
    document.getElementById('fab-join').onclick = () => location.href = 'contact/join.html';
    document.getElementById('fab-contact').onclick = () => location.href = 'contact/call.html';

    document.getElementById('mobile-chatbot-btn').onclick = () => location.href = 'chatbot.html';
    document.getElementById('mobile-home-btn').onclick = () => location.href = 'index.html';

    const servicesToggleBtn = document.getElementById('services-toggle');
    const servicesDropdown = document.getElementById('services-dropdown');
    servicesToggleBtn.addEventListener('click', () => {
      const expanded = servicesToggleBtn.getAttribute('aria-expanded') === 'true';
      servicesToggleBtn.setAttribute('aria-expanded', !expanded);
      servicesDropdown.classList.toggle('active');
    });
    document.addEventListener('click', (e) => {
      if(!servicesToggleBtn.contains(e.target) && !servicesDropdown.contains(e.target)) {
        servicesDropdown.classList.remove('active');
        servicesToggleBtn.setAttribute('aria-expanded', false);
      }
    });
    // Language/Theme (propagate)
    function setLang(l) {
      lang = l;
      renderCards();
      const h1 = document.getElementById('hero-title');
      const desc = document.getElementById('hero-desc');
      const btn = document.getElementById('btn-consultation');
      if(h1 && desc && btn){
        h1.innerHTML = lang === 'en' ? h1.dataset.en : h1.dataset.es;
        desc.textContent = lang === 'en' ? desc.dataset.en : desc.dataset.es;
        btn.textContent = lang === 'en' ? btn.dataset.en : btn.dataset.es;
      }
    }
  },
  it: {
    en: {
      title: "IT SUPPORT",
      icon: '<i class="fa-thin fa-laptop-code"></i>',
      desc: "Proactive, secure, real-time tech help, cloud management, and cyber defense for every business size.",
      modal: {
        title: "IT SUPPORT",
        img: "https://placehold.co/96x96?text=IT",
        imgAlt: "IT Support",
        content: "Our IT Support services deliver reliable, timely assistance to keep your systems running smoothly and securely: help desk, network monitoring, cybersecurity, and cloud infrastructure management.",
        video: "Video placeholder",
        features: [
          "24/7 tech support & remote troubleshooting",
          "Real-time network & system monitoring",
          "Cybersecurity audits, patching, threat detection",
          "Cloud infrastructure setup & maintenance",
          "NIST, CISA, OPS Core CyberSec compliance"
        ],
        learn: "services/it.html"
      }
    },
    es: {
      title: "SOPORTE IT",
      icon: '<i class="fa-thin fa-laptop-code"></i>',
      desc: "Asistencia técnica proactiva y segura en tiempo real, gestión en la nube y ciberdefensa para cualquier tamaño de empresa.",
      modal: {
        title: "SOBRE SOPORTE IT",
        img: "https://placehold.co/96x96?text=IT",
        imgAlt: "Soporte IT",
        content: "Nuestros servicios de Soporte de TI brindan asistencia confiable y oportuna para mantener sus sistemas funcionando sin problemas y de forma segura. Los servicios incluyen soporte de mesa de ayuda, monitoreo de red, servicios de ciberseguridad y gestión de infraestructura en la nube.",
        video: "Video placeholder",
        features: [
          "Soporte técnico 24/7 y solución remota de problemas",
          "Monitoreo en tiempo real de red y sistemas",
          "Auditorías de ciberseguridad, parches y detección de amenazas",
          "Configuración y mantenimiento de infraestructura en la nube",
          "Cumplimiento con NIST, CISA y políticas OPS Core CyberSec"
        ],
        learn: "services/it.html"
      }
    }
  },
  pro: {
    en: {
      title: "PROFESSIONALS",
      icon: '<i class="fa-thin fa-user-tie"></i>',
      desc: "OPS-vetted talent for IT, HR, projects, finance—contract or full-time, ready when you are.",
      modal: {
        title: "PROFESSIONALS",
        img: "https://placehold.co/96x96?text=PRO",
        imgAlt: "Professionals",
        content: "Access our network of highly qualified and experienced professionals for your project or long-term staffing. Experts in IT, project management, finance, HR. OPS-vetted, NDA, compliance trained.",
        video: "Video placeholder",
        features: [
          "Remote IT professionals (SysAdmins, DevOps, Analysts)",
          "Project managers & agile consultants",
          "Finance and accounting professionals",
          "HR and recruitment experts",
          "OPS-vetted talent with NDA, compliance and role-specific training",
          "Ask AI"
        ],
        learn: "services/pros.html"
      }
    },
    es: {
      title: "PROFESIONALES",
      icon: '<i class="fa-thin fa-user-tie"></i>',
      desc: "Talento validado por OPS para TI, RRHH, proyectos y finanzas—contrato o tiempo completo, listo para usted.",
      modal: {
        title: "SOBRE PROFESIONALES",
        img: "https://placehold.co/96x96?text=PRO",
        imgAlt: "Profesionales",
        content: "Acceda a nuestra red de profesionales altamente cualificados y experimentados para satisfacer sus necesidades específicas de proyectos o de personal a largo plazo. Proporcionamos expertos en diversos campos, incluyendo TI, gestión de proyectos, finanzas y recursos humanos, asegurando que obtenga el talento adecuado para su negocio.",
        video: "Video placeholder",
        features: [
          "Profesionales IT remotos (SysAdmins, DevOps, Analistas)",
          "Gerentes de proyecto y consultores ágiles",
          "Profesionales de finanzas y contabilidad",
          "Expertos en recursos humanos y reclutamiento",
          "Talento validado por OPS con NDA, capacitación en cumplimiento y capacitación específica para el rol",
          "Preguntar AI"
        ],
        learn: "services/pros.html"
      }
    }
  }
};
let lang = "en";
document.documentElement.lang = lang;
let theme = "light";
function renderCards() {
  Object.entries({ops:'ops',cc:'cc',it:'it',pro:'pro'}).forEach(([id, key]) => {
    let c = svc[key][lang];
    document.getElementById('card-'+id).innerHTML = `
      <div class="title">${c.title}</div>
      <div class="icon">${c.icon}</div>
      <div class="content"><p>${c.desc}</p></div>
    `;
  });
}
renderCards();
// --- CARD MODALS (Draggable) ---
Object.entries({ops:'ops',cc:'cc',it:'it',pro:'pro'}).forEach(([id,key])=>{
  document.getElementById('card-'+id).onclick = ()=>openModal(key);
  document.getElementById('card-'+id).onkeydown = e=>{if(e.key==="Enter"||e.key===" ")openModal(key);}
});
function openModal(key) {
  let data = svc[key][lang].modal;
  let m = document.createElement('div');
  m.className = 'modal-backdrop';
  m.innerHTML = `
    <div class="ops-modal" tabindex="-1" role="dialog" aria-modal="true" id="draggable-modal">
      <button class="modal-x" aria-label="CERRAR" id="modal-x">X</button>
      <div class="modal-header">
        <img class="modal-img" src="${data.img}" alt="${data.imgAlt}" />
        <div><div class="modal-title">${data.title}</div></div>
      </div>
      <div class="modal-content-body">${data.content}</div>
      <div class="modal-video">${data.video}</div>
      <ul style="margin-bottom:1.2em; margin-left:1.3em;">
        ${data.features.map(i => `<li>${i}</li>`).join("")}
      </ul>
      <div class="modal-actions">
        <a class="modal-btn" href="${data.learn}" target="_blank">${lang==="en"?"Learn More":"Más Información"}</a>
        <button class="modal-btn" onclick="alert('Integrate with chatbot')">${lang==="en"?"Ask Chattia":"Preguntar Chattia"}</button>
        <button class="modal-btn cta" id="modal-contact-btn">${lang==="en"?"Contact Us":"Contáctanos"}</button>
        <button class="modal-btn" id="cancel-btn">${lang==="en"?"Cancel":"Cancelar"}</button>
      </div>
    </div>`;
  let root = document.getElementById('modal-root');
  root.innerHTML = '';
  root.appendChild(m);
  let modal = m.querySelector('.ops-modal');
  // Close on X, ESC, Cancel, or outside
  function close() { root.innerHTML = ''; }
  m.onclick = e => (e.target === m ? close() : 0);
  modal.querySelector('.modal-x').onclick = close;
  modal.querySelector('#cancel-btn').onclick = close;
  document.addEventListener('keydown', function esc(e) {if(e.key==="Escape"){close();document.removeEventListener('keydown',esc);}}, {once:true});
  modal.querySelector('#modal-contact-btn').onclick = ()=>{openContactModal();close();}
  makeDraggable(modal);
}
// --- FAB HANDLERS ---
function openContactModal() {
  showModal('contact');
}
function openJoinModal() {
  showModal('join');
}
function openChatbot() {
  let existing = document.getElementById('chatbot-modal-backdrop');
  if(existing){ existing.remove(); return; }
  let c = document.createElement('div');
  c.id = "chatbot-modal-backdrop";
  c.innerHTML = `
    <div id="chatbot-container" tabindex="-1" role="dialog" aria-modal="true">
      <div id="chatbot-header">
        <span id="title" data-en="OPS AI Chatbot" data-es="Chatbot OPS AI">${lang==="en"?"OPS AI Chatbot":"Chatbot OPS AI"}</span>
        <span>
          <span id="chatbot-lang" class="ctrl">${lang==="en"?"ES":"EN"}</span>
          &nbsp;|&nbsp;
          <span id="chatbot-theme" class="ctrl">${theme==="light"?"Dark":"Light"}</span>
          <button id="chatbot-x" aria-label="Close">×</button>
        </span>
      </div>
      <div id="chat-log" aria-live="polite"></div>
      <div id="chatbot-form-container">
        <form id="chatbot-input-row" autocomplete="off">
          <input id="chatbot-input" type="text" placeholder="${lang==="en"?"Type your message...":"Escriba su mensaje..."}" required maxlength="256">
          <button id="chatbot-send" type="submit" disabled aria-label="Send">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
        <label class="human-check">
          <input type="checkbox" id="human-check">
          <span id="human-label" data-en="I am human" data-es="Soy humano">${lang==="en"?"I am human":"Soy humano"}</span>
        </label>
      </div>
    </div>`;
  document.body.appendChild(c);
  // Chatbot logic: language/theme propagation
  let botThemeBtn = c.querySelector('#chatbot-theme');
  let botLangBtn = c.querySelector('#chatbot-lang');
  let chatbotCont = c.querySelector('#chatbot-container');
  c.onclick = e=>{if(e.target===c)c.remove();}
  c.querySelector('#chatbot-x').onclick = ()=>c.remove();
  document.addEventListener('keydown', function esc(e) {if(e.key==="Escape"){c.remove();document.removeEventListener('keydown',esc);}}, {once:true});
  // Theme/Language inside chatbot
  botThemeBtn.onclick = ()=>{
    document.body.classList.toggle('dark');
    theme = document.body.classList.contains('dark') ? "dark" : "light";
    botThemeBtn.textContent = theme==="light"?"Dark":"Light";
  };
  botLangBtn.onclick = ()=>{
    lang = lang==="en" ? "es" : "en";
    botLangBtn.textContent = lang==="en" ? "ES" : "EN";
    c.querySelector('#title').textContent = lang==="en"?"OPS AI Chatbot":"Chatbot OPS AI";
    c.querySelector('#chatbot-input').placeholder = lang==="en"?"Type your message...":"Escriba su mensaje...";
    c.querySelector('#human-label').textContent = lang==="en"?"I am human":"Soy humano";
  };
  // Chat logic (simulated; integrate backend as needed)
  let log = c.querySelector('#chat-log');
  let form = c.querySelector('#chatbot-input-row');
  let input = c.querySelector('#chatbot-input');
  let send = c.querySelector('#chatbot-send');
  let guard = c.querySelector('#human-check');
  guard.onchange = ()=> send.disabled = !guard.checked;
  function addMsg(txt,cls){
    let div = document.createElement('div');
    div.className = 'chat-msg '+cls;
    div.textContent = txt;
    log.appendChild(div);
    log.scrollTop = log.scrollHeight;
  }
  form.onsubmit = async e=>{
    e.preventDefault();
    if(!guard.checked)return;
    let msg = input.value.trim();
    if(!msg)return;
    addMsg(msg,'user'); input.value=''; send.disabled=true; addMsg('…','bot');
    setTimeout(()=>{ log.lastChild.textContent = (lang==="en"?"Simulated reply.":"Respuesta simulada."); send.disabled=false; },800);
  };
  makeDraggable(chatbotCont, c.querySelector("#chatbot-header"));
}
document.getElementById('fab-chat').onclick = () => location.href = 'chatbot.html';
document.getElementById('fab-join').onclick = () => location.href = 'contact/join.html';
document.getElementById('fab-contact').onclick = () => location.href = 'contact/call.html';
document.getElementById('mobile-fab-chat').onclick = () => location.href = 'chatbot.html';
document.getElementById('mobile-fab-join').onclick = () => location.href = 'contact/join.html';
document.getElementById('mobile-fab-contact').onclick = () => location.href = 'contact/call.html';
// Accordion Services
document.getElementById('mobile-fab-services').onclick = function() {
  document.getElementById('mobile-panel-services').classList.toggle('active');
};
document.body.addEventListener('click', function(e) {
  if (!e.target.closest('.mobile-accordion-btn') && !e.target.closest('.accordion-panel')) {
    document.getElementById('mobile-panel-services').classList.remove('active');
  }
}, true);
// Language/Theme (propagate)
function setLang(l) {
  lang = l;
  document.documentElement.lang = lang;
  renderCards();
  const h1 = document.getElementById('hero-title');
  const desc = document.getElementById('hero-desc');
  const btn = document.getElementById('btn-consultation');
  if(h1 && desc && btn){
    h1.innerHTML = lang === 'en' ? h1.dataset.en : h1.dataset.es;
    desc.textContent = lang === 'en' ? desc.dataset.en : desc.dataset.es;
    btn.textContent = lang === 'en' ? btn.dataset.en : btn.dataset.es;
  }
  // propagate open modals/chat
  let cb = document.getElementById('chatbot-modal-backdrop');
  if(cb) cb.querySelector('#chatbot-lang').textContent = lang==="en"?"ES":"EN";
  // Close all modals for sync
  document.getElementById('modal-root').innerHTML='';
}
function setTheme(t) {
  theme = t;
  document.body.classList.toggle('dark', theme==='dark');
  // propagate open chatbot
  let cb = document.getElementById('chatbot-modal-backdrop');
  if(cb) cb.querySelector('#chatbot-theme').textContent = theme==="light"?"Dark":"Light";
}
document.getElementById('lang-toggle').onclick = ()=>{
  setLang(lang==="en" ? "es" : "en");
  document.getElementById('lang-toggle').textContent = lang==="en" ? "ES" : "EN";
};
document.getElementById('theme-toggle').onclick = ()=>{
  setTheme(theme==="light" ? "dark" : "light");
  document.getElementById('theme-toggle').textContent = theme==="light" ? "Dark" : "Light";
};
document.getElementById('mobile-lang-toggle').onclick = ()=>{
  setLang(lang==="en" ? "es" : "en");
  document.getElementById('mobile-lang-toggle').textContent = lang==="en" ? "ES" : "EN";
};
document.getElementById('mobile-theme-toggle').onclick = ()=>{
  setTheme(theme==="light" ? "dark" : "light");
  document.getElementById('mobile-theme-toggle').textContent = theme==="light" ? "Dark" : "Light";
};

// --- MODALS: JOIN/CONTACT (Basic, Draggable) ---
function showModal(type) {
  let root = document.getElementById('modal-root');
  root.innerHTML = '';
  let m = document.createElement('div');
  m.className = 'modal-backdrop';
  m.innerHTML = type==='contact' ? contactModalHTML() : joinModalHTML();
  root.appendChild(m);
  let modal = m.querySelector('.modal-content');
  // CLOSE
  function close() { root.innerHTML = ''; }
  m.onclick = e => (e.target === m ? close() : 0);
  modal.querySelector('.close-modal').onclick = close;
  let cancelBtn = modal.querySelector('.submit-button.cancel');
  if(cancelBtn) cancelBtn.onclick = close;
  document.addEventListener('keydown', function esc(e) {if(e.key==="Escape"){close();document.removeEventListener('keydown',esc);}}, {once:true});
  makeDraggable(modal);
}
// --- Join Modal HTML
function joinModalHTML() {
  return `
  <div class="modal-content" tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal-header">
      <h3>${lang==="en"?"Join Us":"Únete a Nosotros"}</h3>
      <button class="close-modal" aria-label="Close">&times;</button>
    </div>
    <form id="join-form">
      <div class="form-row">
        <label for="name">${lang==="en"?"Name":"Nombre"}</label>
        <input type="text" id="name" name="name" placeholder="${lang==="en"?"Enter your name":"Ingresa tu nombre"}" required>
        <label for="email">${lang==="en"?"Email":"Correo Electrónico"}</label>
        <input type="email" id="email" name="email" placeholder="${lang==="en"?"Enter your email":"Ingresa tu correo"}" required>
        <label for="phone">${lang==="en"?"Phone":"Teléfono"}</label>
        <input type="tel" id="phone" name="phone" placeholder="${lang==="en"?"Enter your phone":"Ingresa tu teléfono"}" required>
      </div>
      <div class="form-row">
        <label for="comment">${lang==="en"?"Tell us about yourself":"Cuéntanos sobre ti"}</label>
        <textarea id="comment" name="comment" rows="4" placeholder="${lang==="en"?"Tell us about yourself...":"Cuéntanos sobre ti..."}"></textarea>
      </div>
      <div class="modal-actions" style="margin-top:1.7em;">
        <button type="button" class="submit-button cancel">${lang==="en"?"Cancel":"Cancelar"}</button>
        <button type="submit" class="submit-button" style="background:var(--clr-accent);color:#fff;">${lang==="en"?"Submit":"Enviar"}</button>
      </div>
    </form>
  </div>
  `;
}
// --- Contact Modal HTML
function contactModalHTML() {
  return `
  <div class="modal-content" tabindex="-1" role="dialog" aria-modal="true">
    <div class="modal-header">
      <h3>${lang==="en"?"Contact Us":"Contáctenos"}</h3>
      <button class="close-modal" aria-label="Close">&times;</button>
    </div>
    <form id="contact-form">
      <div class="form-row">
        <label for="contact-name">${lang==="en"?"Name":"Nombre"}</label>
        <input type="text" id="contact-name" placeholder="${lang==="en"?"Enter your name":"Ingrese su nombre"}" required>
        <label for="contact-email">${lang==="en"?"Email":"Correo Electrónico"}</label>
        <input type="email" id="contact-email" placeholder="${lang==="en"?"Enter your email":"Ingrese su correo electrónico"}" required>
      </div>
      <div class="form-row">
        <label for="contact-comments">${lang==="en"?"Comments":"Comentarios"}</label>
        <textarea id="contact-comments" rows="3" placeholder="${lang==="en"?"What service are you interested in?":"¿En qué servicio está interesado?"}" required></textarea>
      </div>
      <div class="modal-actions" style="margin-top:1.2em;">
        <button type="button" class="submit-button cancel">${lang==="en"?"Cancel":"Cancelar"}</button>
        <button type="submit" class="submit-button" style="background:var(--clr-primary);color:#fff;">${lang==="en"?"Send":"Enviar"}</button>
      </div>
    </form>
  </div>
  `;
}
// --- MAKE DRAGGABLE (modal, header optional) ---
function makeDraggable(elem, dragHandle) {
  let isDown = false, startX=0, startY=0, x=0, y=0;
  let header = dragHandle || elem;
  header.style.cursor = "move";
  header.onmousedown = function(e) {
    isDown = true;
    elem.classList.add("dragging");
    startX = e.clientX - (parseInt(elem.style.left)||window.innerWidth/2);
    startY = e.clientY - (parseInt(elem.style.top)||window.innerHeight/4);
    document.onmousemove = function(e) {
      if (!isDown) return;
      elem.style.left = `${e.clientX-startX}px`;
      elem.style.top = `${e.clientY-startY}px`;
      elem.style.transform = "none";
    };
    document.onmouseup = function(){ isDown=false; elem.classList.remove("dragging"); document.onmousemove=null; document.onmouseup=null; };
    return false;
  };
}