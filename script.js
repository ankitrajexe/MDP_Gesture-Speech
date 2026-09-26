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
      <div class="title-box">
        <div class="label">TITLE</div>
        <div class="value">Multilingual AI-Based Gesture-to-Speech Communication System with Synchronized Text and Emoji-Based Visual Feedback</div>
      </div>
      <h2>Abstract</h2>
      <div class="card">
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
        <div class="member mentor"><div class="name">${mentor.name}</div><div class="role">${mentor.role}</div></div>
        ${team.map(m=>`<div class="member tiltable"><div class="name">${m.name}</div><div class="role">${m.role}</div></div>`).join("")}
      </div>
    </section>

    <section id="sec-2">
      <h2>How it works</h2>
      <p class="sub">Physical movement to digital speech, text, and visual output.</p>
      <div class="card pipeline">
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
function initPointerEffects(){
  const isFinePointer = window.matchMedia("(pointer: fine)").matches;
  if(!isFinePointer) return;

  const glow = document.getElementById("cursor-glow");
  document.addEventListener("mousemove", e=>{
    glow.style.transform = `translate(${e.clientX - 260}px, ${e.clientY - 260}px)`;
  });

  document.addEventListener("mousemove", e=>{
    document.querySelectorAll(".member.tiltable").forEach(card=>{
      const r = card.getBoundingClientRect();
      const inside = e.clientX>r.left && e.clientX<r.right && e.clientY>r.top && e.clientY<r.bottom;
      if(!inside){ card.style.transform = ""; return; }
      const px = (e.clientX - r.left)/r.width - 0.5;
      const py = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `perspective(500px) rotateY(${px*10}deg) rotateX(${-py*10}deg) translateZ(4px)`;
    });
  });
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

// ---- Init ----
function init(){
  renderNav();
  renderMain();
  moveIndicator();
  initPointerEffects();
  initModeToggle();
  window.addEventListener("resize", moveIndicator);
}

document.addEventListener("DOMContentLoaded", init);
