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
  { icon:"🖐️", t:"Flex Sensors", d:"Detect finger bending — physical bend becomes analog voltage." },
  { icon:"🔌", t:"ESP32 Microcontroller", d:"Reads sensor values — analog signal converted to digital." },
  { icon:"🧠", t:"Gesture Classifier", d:"Identifies the gesture — maps data to one of 5–10 known signs." },
  { icon:"🌐", t:"Multilingual Speech + Text + Emoji Output", d:"The recognized gesture is rendered simultaneously as speech in the user's chosen language, on-screen text, and an emoji/animated visual cue." }
];

// Official evaluation deadlines from the department's Evaluation Guidelines
const deadlines = [
  { review:"Review I", marks:5, period:"On or before 25th September 2026", due:new Date("2026-09-25"),
    outcome:"Clearly present the title of the project along with a deep understanding of the problem statement, objectives, and scope." },
  { review:"Review I", marks:20, period:"On or before 23rd October 2026", due:new Date("2026-10-23"),
    outcome:"Demonstrate partial execution (30%) of the project." },
  { review:"Review II", marks:25, period:"On or before 22nd January 2027", due:new Date("2027-01-22"),
    outcome:"50% Execution — complete and demonstrate half of the project's functionality." },
  { review:"Review III & Report Writing", marks:40, period:"12th–16th April 2027", due:new Date("2027-04-16"),
    outcome:"100% Execution — the complete project should be fully developed and demonstrated." },
  { review:"Review III & Report Writing", marks:10, period:"12th–16th April 2027", due:new Date("2027-04-16"),
    outcome:"Full documentation submitted in the format given by the academics." }
];

// Our own build phases. status is a *default* — the team updates it by
// tapping the badge as work actually progresses; it's saved per browser.
const phases = [
  { id:"research", when:"Done so far", t:"Literature Review & Proposal",
    d:"Read existing gesture-to-speech research, identified the gap, and finalized the differentiating features — multilingual speech output plus synchronized text and emoji feedback. Title and Abstract finalized.",
    status:"done" },
  { id:"breadboard", when:"Weeks 1–4, after kickoff", t:"Breadboard Prototype",
    d:"Order components, build the breadboard circuit with flex sensors and ESP32, and collect gesture data. No PCB work starts until this logic is validated.",
    status:"yet" },
  { id:"assembly", when:"Weeks 4–10", t:"PCB & Full Assembly",
    d:"Fabricate the PCB, build firmware and audio output, assemble the glove, and run full system testing and calibration.",
    status:"yet" },
  { id:"multimodal", when:"Once the core pipeline works", t:"Multilingual + Multimodal Output Layer",
    d:"Build the language-selectable speech output and the synchronized text/emoji feedback on top of the working core pipeline.",
    status:"yet" }
];
const STATUS_ORDER = ["yet","ongoing","done"];
const STATUS_LABEL = { yet:"Yet to Start", ongoing:"Ongoing", done:"Completed" };

// ---- Render ----
function renderNav(){
  const nav = document.getElementById("tabs");
  nav.setAttribute("role", "tablist");
  nav.innerHTML = sections.map((s,i)=>`<button data-i="${i}" role="tab" aria-selected="${i===0}" aria-controls="sec-${i}" class="${i===0?'active':''}">${s.label}</button>`).join("")
    + `<span id="tab-indicator"></span>`;
  nav.querySelectorAll("button").forEach(btn=>{
    btn.addEventListener("click", e=>{
      showTab(parseInt(btn.dataset.i));
      spawnRipple(btn, e.clientX, e.clientY);
      playClickSound();
    });
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
        ${pipeline.map((p,i)=>`<div class="pstep"><div class="pnum">${p.icon}</div><div class="pbody"><div class="ptitle">${i+1}. ${p.t}</div><div class="pdesc">${p.d}</div></div></div>`).join("")}
      </div>
    </section>

    <section id="sec-3">
      <h2>College Evaluation Deadlines</h2>
      <p class="sub">From the department's Evaluation Guidelines (BAXXX191 — Basic Multidisciplinary Project).</p>
      <div class="deadline-list">
        ${deadlines.map(dl=>`
          <div class="deadline-card">
            <div class="deadline-top">
              <div>
                <div class="deadline-review">${dl.review}</div>
                <div class="deadline-meta">${dl.period} &middot; <span class="deadline-marks">${dl.marks} marks</span></div>
              </div>
              <span class="dbadge" data-due="${dl.due.toISOString()}"></span>
            </div>
            <div class="deadline-outcome">${dl.outcome}</div>
          </div>
        `).join("")}
      </div>

      <h2>Our Build Phases</h2>
      <p class="sub">Nothing is built yet — only the research and the proposal are done. Tap a badge to update it as work actually starts.</p>
      <p class="note">Planned kickoff: hardware build begins after Review I feedback (on/before 25th September 2026), on schedule with the department's timeline.</p>
      <div class="progress-wrap">
        <div class="progress-label"><span>Overall build progress</span><span id="progressPct">0%</span></div>
        <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
      </div>
      <div class="phase-list">
        ${phases.map(p=>`
          <div class="phase-card">
            <div class="phase-top">
              <div>
                <div class="phase-when">${p.when}</div>
                <div class="phase-title">${p.t}</div>
              </div>
              <span class="badge" data-phase="${p.id}"></span>
            </div>
            <div class="phase-desc">${p.d}</div>
          </div>
        `).join("")}
      </div>
    </section>

    <section id="sec-4">
      <h2>Updates</h2>
      <p class="sub">Progress will be logged here as the project develops.</p>
      <div class="empty">No updates yet — the first entry will appear here once hardware work begins.</div>
    </section>
  `;
  main.querySelectorAll("section").forEach(s=> s.setAttribute("role","tabpanel"));
}

// ---- Tiny reward system: click sound + ripple + confetti ----
// Applied everywhere a click *does* something, so every interaction gives
// a small, immediate bit of feedback instead of feeling inert.
let audioCtx;
function ensureAudio(){
  if(!audioCtx){
    try{ audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }catch(err){ audioCtx = null; }
  }
  return audioCtx;
}
function playTone(freq, duration, type, peak){
  const ctx = ensureAudio();
  if(!ctx) return;
  const osc = ctx.createOscillator(), gain = ctx.createGain();
  osc.type = type; osc.frequency.value = freq;
  gain.gain.setValueAtTime(0, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(peak, ctx.currentTime + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
  osc.connect(gain); gain.connect(ctx.destination);
  osc.start(); osc.stop(ctx.currentTime + duration + 0.02);
}
// Note: iOS Safari does not implement the Vibration API at all (Apple has
// never shipped it) — on iPhone this will silently no-op, that's a platform
// limit, not a bug. Android Chrome/Firefox support it fine.
function hapticTick(pattern){
  if(navigator.vibrate){ try{ navigator.vibrate(pattern || 20); }catch(err){ /* not supported */ } }
}
function playClickSound(){ playTone(680, 0.08, "sine", 0.035); hapticTick(20); }
function playSuccessSound(){
  playTone(600, 0.09, "triangle", 0.05);
  setTimeout(()=>playTone(900, 0.13, "triangle", 0.05), 90);
  hapticTick([25,60,35]);
}
function spawnRipple(el, clientX, clientY){
  const rect = el.getBoundingClientRect();
  const r = document.createElement("span");
  r.className = "ripple";
  r.style.left = (clientX - rect.left) + "px";
  r.style.top = (clientY - rect.top) + "px";
  el.appendChild(r);
  r.addEventListener("animationend", ()=> r.remove());
}
function confettiBurst(x, y){
  const colors = ["#F0B429","#5B9BE0","#3D7FC4","#EAF2FB"];
  for(let i=0;i<16;i++){
    const p = document.createElement("span");
    p.className = "confetti-piece";
    const angle = Math.random()*Math.PI*2;
    const dist = 36 + Math.random()*56;
    p.style.setProperty("--dx", (Math.cos(angle)*dist) + "px");
    p.style.setProperty("--dy", (Math.sin(angle)*dist) + "px");
    p.style.background = colors[i % colors.length];
    p.style.left = x + "px";
    p.style.top = y + "px";
    document.body.appendChild(p);
    p.addEventListener("animationend", ()=> p.remove());
  }
}
function attachClickFX(el){
  el.addEventListener("click", e=>{
    spawnRipple(el, e.clientX ?? (el.getBoundingClientRect().left+el.offsetWidth/2), e.clientY ?? (el.getBoundingClientRect().top+el.offsetHeight/2));
    playClickSound();
  });
}

// ---- Deadlines: status is computed automatically from today's date ----
function renderDeadlineBadges(){
  document.querySelectorAll(".dbadge").forEach(el=>{
    const due = new Date(el.dataset.due);
    const days = Math.ceil((due - new Date()) / 86400000);
    let cls, label;
    if(days < 0){ cls="passed"; label="Deadline passed"; }
    else if(days <= 14){ cls="due-soon"; label = days===0 ? "Due today" : `Due in ${days}d`; }
    else { cls="upcoming"; label="Upcoming"; }
    el.className = "dbadge " + cls;
    el.textContent = label;
  });
}

// ---- Phases: status is set by the team by tapping the badge, saved locally ----
function loadPhaseStatus(){
  let saved = {};
  try{ saved = JSON.parse(localStorage.getItem("gts-phase-status") || "{}"); }catch(err){ saved = {}; }
  const merged = {};
  phases.forEach(p=> merged[p.id] = saved[p.id] || p.status);
  return merged;
}
function savePhaseStatus(map){
  try{ localStorage.setItem("gts-phase-status", JSON.stringify(map)); }catch(err){ /* storage unavailable */ }
}
function updateProgressBar(map){
  const done = Object.values(map).filter(s=>s==="done").length;
  const pct = Math.round((done / phases.length) * 100);
  document.getElementById("progressFill").style.width = pct + "%";
  document.getElementById("progressPct").textContent = pct + "%";
}
function initPhaseInteractivity(){
  const statusMap = loadPhaseStatus();

  document.querySelectorAll(".badge[data-phase]").forEach(badge=>{
    const id = badge.dataset.phase;
    badge.className = "badge " + statusMap[id];
    badge.textContent = STATUS_LABEL[statusMap[id]];

    badge.addEventListener("click", e=>{
      const current = statusMap[id];
      const next = STATUS_ORDER[(STATUS_ORDER.indexOf(current) + 1) % STATUS_ORDER.length];
      statusMap[id] = next;
      badge.className = "badge " + next;
      badge.textContent = STATUS_LABEL[next];
      savePhaseStatus(statusMap);
      updateProgressBar(statusMap);

      spawnRipple(badge, e.clientX, e.clientY);
      if(next === "done"){
        playSuccessSound();
        confettiBurst(e.clientX, e.clientY);
      } else {
        playClickSound();
      }
    });
  });

  updateProgressBar(statusMap);
}

// Swipe left/right anywhere on the content to move between tabs — the kind
// of gesture a native app would support, not just tap targets.
// Built on Pointer Events (not raw touch events) because it behaves
// consistently across Android Chrome and iOS Safari; pointerType lets us
// filter to touch/pen only so mouse text-selection drags aren't affected.
function initSwipeNav(){
  const main = document.getElementById("main");
  let startX = 0, startY = 0, startTime = 0, tracking = false;

  main.addEventListener("pointerdown", e=>{
    if(e.pointerType !== "touch" && e.pointerType !== "pen") return;
    tracking = true;
    startX = e.clientX; startY = e.clientY; startTime = Date.now();
  });

  main.addEventListener("pointerup", e=>{
    if(!tracking) return;
    tracking = false;
    const dx = e.clientX - startX, dy = e.clientY - startY, dt = Date.now() - startTime;
    if(Math.abs(dx) > 40 && Math.abs(dy) < 80 && dt < 700){
      const current = [...document.querySelectorAll("#tabs button")].findIndex(b=>b.classList.contains("active"));
      const next = dx < 0 ? current + 1 : current - 1;
      if(next >= 0 && next < sections.length && next !== current){
        showTab(next);
        document.querySelectorAll("#tabs button")[next].scrollIntoView({ behavior:"smooth", inline:"center", block:"nearest" });
        playClickSound();
      }
    }
  });

  main.addEventListener("pointercancel", ()=>{ tracking = false; });
}

// Cards fade/rise into place as they scroll into view, instead of just
// appearing — gives scrolling itself a bit of payoff on mobile.
function initScrollReveal(){
  const targets = document.querySelectorAll(".title-box, .card, .member, .phase-card, .deadline-card");
  if(!("IntersectionObserver" in window)){
    targets.forEach(el=> el.classList.add("in-view"));
    return;
  }
  const obs = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("in-view");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold:0.15 });
  targets.forEach(el=>{ el.classList.add("reveal"); obs.observe(el); });
}

function showTab(i){
  document.querySelectorAll("#tabs button").forEach((b,idx)=>{
    b.classList.toggle("active", idx===i);
    b.setAttribute("aria-selected", idx===i);
  });
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

// A single tracked point shared by every visual effect below — updated by
// real mouse movement on desktop and by the finger's position on touch, so
// the starfield reacts to whichever one the visitor actually has.
const pointer = { x:innerWidth/2, y:innerHeight/2 };
function trackPointer(){
  window.addEventListener("mousemove", e=>{ pointer.x = e.clientX; pointer.y = e.clientY; });
  window.addEventListener("touchstart", e=>{
    if(e.touches[0]){ pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY; }
  }, { passive:true });
  window.addEventListener("touchmove", e=>{
    if(e.touches[0]){ pointer.x = e.touches[0].clientX; pointer.y = e.touches[0].clientY; }
  }, { passive:true });
}

// ---- Desktop-only pointer interactions ----
// Cursor trail, card tilt and magnetic buttons need a real mouse to feel
// right, so they stay gated on pointer: fine and never run on touch.
function initPointerEffects(){
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if(!isFinePointer) return;

  initCursorTrail(pointer);
  initTiltAndSpotlight();
  initMagneticButtons(pointer);
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

// A twinkling starfield across the whole page. Stars sit at a fixed "home"
// position and sparkle in place; when the cursor passes through, nearby
// stars get shoved out of its path like a crowd parting, then drift back.
function initStarfield(mouse){
  const canvas = document.getElementById("particles");
  const ctx = canvas.getContext("2d");
  let w, h, stars;
  const COUNT = 130;
  const PIERCE_RADIUS = 90;

  function resize(){
    w = canvas.width = innerWidth;
    h = canvas.height = document.documentElement.scrollHeight;
  }
  function makeStars(){
    stars = Array.from({length:COUNT}, ()=>{
      const homeX = Math.random()*w, homeY = Math.random()*h;
      return {
        homeX, homeY, x:homeX, y:homeY, vx:0, vy:0,
        r: 0.6 + Math.random()*1.6,
        phase: Math.random()*Math.PI*2,
        speed: 0.6 + Math.random()*1.2
      };
    });
  }
  resize(); makeStars();
  window.addEventListener("resize", ()=>{ resize(); makeStars(); });

  let t = 0;
  function tick(){
    t += 0.02;
    ctx.clearRect(0,0,w,h);
    const scrollY = window.scrollY;
    const my = mouse.y + scrollY;
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    stars.forEach(s=>{
      const dx = s.x - mouse.x, dy = s.y - my;
      const dist = Math.hypot(dx,dy) || 1;
      if(dist < PIERCE_RADIUS){
        const push = (1 - dist/PIERCE_RADIUS) * 2.2;
        s.vx += (dx/dist) * push;
        s.vy += (dy/dist) * push;
      }
      // spring back toward home slot, with drag so it settles instead of oscillating
      s.vx += (s.homeX - s.x) * 0.02;
      s.vy += (s.homeY - s.y) * 0.02;
      s.vx *= 0.88; s.vy *= 0.88;
      s.x += s.vx; s.y += s.vy;

      const twinkle = 0.35 + Math.sin(t*s.speed + s.phase) * 0.3;
      const alpha = Math.max(0.08, twinkle);
      const color = isDark ? `255,255,255` : `19,42,82`;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${color},${alpha})`;
      ctx.arc(s.x, s.y - scrollY, s.r, 0, Math.PI*2);
      ctx.fill();

      // occasional brighter glow core for a sparkle effect
      if(twinkle > 0.5){
        ctx.beginPath();
        ctx.fillStyle = isDark ? `rgba(240,180,41,${(twinkle-0.5)*0.9})` : `rgba(61,127,196,${(twinkle-0.5)*0.9})`;
        ctx.arc(s.x, s.y - scrollY, s.r*2, 0, Math.PI*2);
        ctx.fill();
      }
    });
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
  trackPointer();
  initStarfield(pointer);
  initPointerEffects();
  initSwipeNav();
  initScrollReveal();
  initModeToggle();
  initDarkMode();
  renderDeadlineBadges();
  initPhaseInteractivity();
  attachClickFX(document.getElementById("modeToggle"));
  attachClickFX(document.getElementById("themeToggle"));
  window.addEventListener("resize", moveIndicator);
}

document.addEventListener("DOMContentLoaded", init);
