// ---- Content data ----
const sections = [
  { id:"overview", label:"Overview" },
  { id:"team", label:"Team" },
  { id:"pipeline", label:"How it works" },
  { id:"roadmap", label:"Roadmap" },
  { id:"updates", label:"Updates" }
];

const mentor = { name:"Dr. H. Parveen Sultana", role:"Faculty Mentor" };

const team = [
  { name:"Ankit Raj", role:"ECE Core — hardware & power" },
  { name:"Prethiv R", role:"ECE VLSI — PCB & signal conditioning" },
  { name:"Arjav Kasal", role:"EIE — embedded systems" },
  { name:"Arpit Saraf", role:"CSE Core — firmware & app" },
  { name:"Shardul Prateek Shanware", role:"CSE Data Science — model & dataset" }
];

const pipeline = [
  { t:"Flex Sensors", d:"Detect finger bending — physical bend becomes analog voltage." },
  { t:"ESP32 Microcontroller", d:"Reads sensor values — analog signal converted to digital." },
  { t:"Gesture Classifier", d:"Identifies the gesture — maps data to one of 5–10 known signs." },
  { t:"Multilingual Speech + Text + Emoji Output", d:"The recognized gesture is rendered simultaneously as speech in the user's chosen language, on-screen text, and an emoji/animated visual cue." }
];

const roadmap = [
  { when:"Weeks 1–4", t:"Prove the core sensor logic", d:"Order components, build the breadboard circuit, and collect gesture data. No PCB work until the breadboard logic is validated." },
  { when:"Weeks 4–10", t:"Synthesize into a wearable device", d:"Fabricate the PCB, build firmware and audio output, assemble the glove, and run full system testing and calibration." },
  { when:"Ongoing", t:"Multilingual + multimodal output layer", d:"Build the language-selectable speech output and the synchronized text/emoji feedback on top of the working core pipeline." }
];

// ---- Render ----
function renderNav(){
  const nav = document.getElementById("tabs");
  nav.innerHTML = sections.map((s,i)=>`<button data-i="${i}" class="${i===0?'active':''}">${s.label}</button>`).join("")
    + `<span id="tab-indicator"></span>`;
  nav.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click", ()=> showTab(parseInt(btn.dataset.i)));
  });
}

function renderMain(){
  const main = document.getElementById("main");
  main.innerHTML = `
    <section id="sec-0" class="active">
      <div class="title-box spot">
        <div class="label">TITLE</div>
        <div class="value">Multilingual AI-Based Gesture-to-Speech Communication System with Synchronized Text and Emoji-Based Visual Feedback</div>
      </div>
      <h2>Abstract</h2>
      <div class="card spot">
        Existing gesture-to-speech assistive devices for individuals with speech impairments predominantly rely on flex-sensor-based gloves that translate hand gestures into single-language audio output, typically English, with minimal auxiliary feedback. This limits accessibility for non-English-speaking users and offers no supplementary channel for expression beyond audio. This project proposes an AI-based smart glove system that addresses these gaps through two key contributions: multilingual speech synthesis, allowing the same gesture set to be rendered into speech output across multiple languages based on user preference, and simultaneous multimodal feedback, wherein each recognized gesture is presented not only as speech but also as corresponding text and emoji-based visual cues. The system uses flex sensors mounted on a glove to capture finger bend patterns, processed through a microcontroller and classified using a lightweight machine learning model. This work aims to provide a more inclusive and expressive communication tool for individuals with speech and hearing impairments, particularly within linguistically diverse populations such as India.
      </div>
      <div class="tags">
        <span class="feature-tag">Multilingual speech output</span>
        <span class="feature-tag">Text + emoji feedback</span>
        <span class="feature-tag">5–10 gesture vocabulary</span>
      </div>
    </section>

    <section id="sec-1">
      <h2>Team</h2>
      <p class="sub">One member driving each engineering discipline.</p>
      <div class="team-grid">
        <div class="member mentor spot"><div class="name">${mentor.name}</div><div class="role">${mentor.role}</div></div>
        ${team.map(m=>`<div class="member tiltable spot"><div class="name">${m.name}</div><div class="role">${m.role}</div></div>`).join("")}
      </div>
    </section>

    <section id="sec-2">
      <h2>How it works</h2>
      <p class="sub">Physical movement to digital speech, text, and visual output.</p>
      <div class="card pipeline spot">
        ${pipeline.map((p,i)=>`<div class="pstep"><div class="pnum">${i+1}</div><div class="pbody"><div class="ptitle">${p.t}</div><div class="pdesc">${p.d}</div></div></div>`).join("")}
      </div>
    </section>

    <section id="sec-3">
      <h2>Roadmap</h2>
      <p class="sub">Start with a small working prototype, validate every stage, then add improvements.</p>
      <div class="timeline">
        ${roadmap.map(r=>`<div class="tstep"><div class="twhen">${r.when}</div><div class="ttitle">${r.t}</div><div class="tdesc">${r.d}</div></div>`).join("")}
      </div>
    </section>

    <section id="sec-4">
      <h2>Updates</h2>
      <p class="sub">Progress will be logged here as the project develops.</p>
      <div class="empty">No updates yet — check back as the build progresses.</div>
    </section>
  `;
}

function showTab(i){
  document.querySelectorAll("#tabs button").forEach((b,idx)=>b.classList.toggle("active", idx===i));
  document.querySelectorAll("main section").forEach((s,idx)=>s.classList.toggle("active", idx===i));
  moveIndicator();
}

function moveIndicator(){
  const active = document.querySelector("#tabs button.active");
  const indicator = document.getElementById("tab-indicator");
  if(!active || !indicator) return;
  indicator.style.left = active.offsetLeft + "px";
  indicator.style.width = active.offsetWidth + "px";
}

// ---- Desktop-only pointer interactions ----
// Everything in this block is gated on a real mouse (pointer: fine) and never
// runs on touch devices, so the mobile experience is untouched.
function initPointerEffects(){
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if(!isFinePointer) return;

  const mouse = { x:innerWidth/2, y:innerHeight/2 };
  document.addEventListener("mousemove", e=>{ mouse.x = e.clientX; mouse.y = e.clientY; });

  initCursorTrail(mouse);
  initParticleNetwork(mouse);
  initTiltAndSpotlight();
  initMagneticButtons(mouse);
}

// Comet-style trailing dots that chase the real cursor with staggered easing
function initCursorTrail(mouse){
  const COUNT = 7;
  const dots = [];
  for(let i=0;i<COUNT;i++){
    const el = document.createElement("div");
    el.className = "trail-dot";
    el.style.opacity = (1 - i/COUNT).toFixed(2);
    el.style.width = el.style.height = (7 - i*0.6) + "px";
    document.body.appendChild(el);
    dots.push({ el, x:mouse.x, y:mouse.y });
  }
  function loop(){
    let px = mouse.x, py = mouse.y;
    dots.forEach((d,i)=>{
      d.x += (px - d.x) * 0.35;
      d.y += (py - d.y) * 0.35;
      d.el.style.transform = `translate(${d.x - 4}px, ${d.y - 4}px)`;
      px = d.x; py = d.y;
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// Animated constellation of particles that drift, link to neighbours, and
// get pulled toward the cursor when it passes nearby
function initParticleNetwork(mouse){
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let w, h, particles;
  const COUNT = 55;
  const LINK_DIST = 130;
  const MOUSE_DIST = 170;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  function makeParticles(){
    particles = Array.from({length:COUNT}, ()=>({
      x:Math.random()*w, y:Math.random()*h,
      vx:(Math.random()-0.5)*0.35, vy:(Math.random()-0.5)*0.35
    }));
  }
  resize(); makeParticles();
  window.addEventListener("resize", ()=>{ resize(); });

  function tick(){
    ctx.clearRect(0,0,w,h);
    const scrollY = window.scrollY;

    particles.forEach(p=>{
      p.x += p.vx; p.y += p.vy;
      if(p.x<0||p.x>w) p.vx*=-1;
      if(p.y<0||p.y>h) p.vy*=-1;

      const my = mouse.y + scrollY;
      const dx = mouse.x - p.x, dy = my - p.y;
      const dist = Math.hypot(dx,dy);
      if(dist < MOUSE_DIST){
        const pull = (1 - dist/MOUSE_DIST) * 0.6;
        p.vx += (dx/dist) * pull * 0.03;
        p.vy += (dy/dist) * pull * 0.03;
      }
      p.vx *= 0.99; p.vy *= 0.99;
    });

    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const a=particles[i], b=particles[j];
        const d = Math.hypot(a.x-b.x, a.y-b.y);
        if(d < LINK_DIST){
          ctx.strokeStyle = `rgba(61,127,196,${(1 - d/LINK_DIST)*0.35})`;
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y-scrollY); ctx.lineTo(b.x, b.y-scrollY); ctx.stroke();
        }
      }
      const p = particles[i];
      const my = mouse.y + scrollY;
      const dm = Math.hypot(mouse.x-p.x, my-p.y);
      if(dm < MOUSE_DIST){
        ctx.strokeStyle = `rgba(91,155,224,${(1 - dm/MOUSE_DIST)*0.45})`;
        ctx.beginPath(); ctx.moveTo(p.x, p.y-scrollY); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
      ctx.fillStyle = "rgba(61,127,196,0.55)";
      ctx.beginPath(); ctx.arc(p.x, p.y-scrollY, 1.6, 0, Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  tick();
}

// Sharper 3D tilt + a light spotlight that follows the cursor inside any
// element carrying the .spot class
function initTiltAndSpotlight(){
  document.addEventListener("mousemove", e=>{
    document.querySelectorAll(".member.tiltable").forEach(card=>{
      const r = card.getBoundingClientRect();
      const inside = e.clientX>r.left && e.clientX<r.right && e.clientY>r.top && e.clientY<r.bottom;
      if(!inside){ card.style.transform = ""; return; }
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `perspective(500px) rotateY(${px*16}deg) rotateX(${-py*16}deg) translateZ(6px)`;
    });

    document.querySelectorAll(".spot").forEach(el=>{
      const r = el.getBoundingClientRect();
      const inside = e.clientX>r.left && e.clientX<r.right && e.clientY>r.top && e.clientY<r.bottom;
      el.classList.toggle("spot-active", inside);
      if(inside){
        el.style.setProperty("--mx", `${e.clientX - r.left}px`);
        el.style.setProperty("--my", `${e.clientY - r.top}px`);
      }
    });
  });
}

// Nav tabs and the mode switch lean gently toward a nearby cursor
function initMagneticButtons(mouse){
  const targets = ()=>[...document.querySelectorAll("nav button"), document.getElementById("modeToggle")];
  function loop(){
    targets().forEach(el=>{
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width/2, cy = r.top + r.height/2;
      const dx = mouse.x - cx, dy = mouse.y - cy;
      const dist = Math.hypot(dx,dy);
      const radius = 70;
      if(dist < radius){
        const strength = (1 - dist/radius) * 8;
        el.style.transform = `translate(${(dx/dist)*strength}px, ${(dy/dist)*strength}px)`;
      } else if(el.style.transform && !el.style.transform.includes("rotateY")){
        el.style.transform = "";
      }
    });
    requestAnimationFrame(loop);
  }
  loop();
}

// ---- Mode toggle (mobile / desktop preview) ----
function initModeToggle(){
  const btn = document.getElementById("modeToggle");
  btn.addEventListener("click", ()=>{
    document.body.classList.toggle("force-mobile");
    btn.classList.toggle("mobile");
    setTimeout(moveIndicator, 50);
  });
}

// ---- Dark mode (persisted per browser via localStorage) ----
function initDarkMode(){
  const btn = document.getElementById("themeToggle");
  let saved = null;
  try{ saved = localStorage.getItem("gts-theme"); }catch(err){ /* storage unavailable, fall back to light */ }

  function apply(theme){
    document.documentElement.setAttribute("data-theme", theme);
    btn.classList.toggle("mobile", theme === "dark");
  }
  apply(saved === "dark" ? "dark" : "light");

  btn.addEventListener("click", ()=>{
    const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
    apply(next);
    try{ localStorage.setItem("gts-theme", next); }catch(err){ /* ignore if storage blocked */ }
  });
}

// ---- Init ----
function init(){
  renderNav();
  renderMain();
  moveIndicator();
  initPointerEffects();
  initModeToggle();
  initDarkMode();
  window.addEventListener("resize", moveIndicator);
}

document.addEventListener("DOMContentLoaded", init);
