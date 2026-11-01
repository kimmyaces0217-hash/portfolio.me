document.addEventListener("DOMContentLoaded",()=>{
 const cfg=window.SITE_CONFIG||{};
 document.querySelectorAll("[data-config]").forEach(el=>{
  const key=el.dataset.config;if(!cfg[key])return;
  if(el.tagName==="IMG")el.src=cfg[key];else if(el.tagName==="A")el.href=cfg[key];else el.textContent=cfg[key];
 });
 const toggle=document.querySelector(".menu-toggle"),nav=document.querySelector(".nav-links");
 toggle?.addEventListener("click",()=>nav?.classList.toggle("open"));
 const current=location.pathname.split("/").pop()||"index.html";
 document.querySelectorAll(".nav-links a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active")});
 const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
 const grid=document.querySelector("#project-grid");
 if(grid&&Array.isArray(window.PROJECTS)){
  const render=(filter="All")=>{
   grid.innerHTML=window.PROJECTS.filter(p=>filter==="All"||p.category===filter).map((p,i)=>`
    <article class="card glass reveal visible"><div class="project-thumb"><img src="${p.image}" alt="${p.title} overview image" onerror="this.src='img/projects/project-placeholder.svg'"></div>
    <div class="project-body"><h3>${p.title}</h3><p>${p.description}</p><div class="project-meta">${p.tools.map(t=>`<span class="tag">${t}</span>`).join("")}</div>
    <a class="project-open" href="${p.sheetUrl}" target="_blank" rel="noopener" data-project-link="${window.PROJECTS.indexOf(p)}">Open project overview <img src="img/icons/external-link.svg" alt=""></a></div></article>`).join("");
   grid.querySelectorAll("[data-project-link]").forEach(a=>a.addEventListener("click",e=>{
    const p=window.PROJECTS[Number(a.dataset.projectLink)];
    if(!p.sheetUrl||p.sheetUrl.startsWith("YOUR_GOOGLE_SHEETS_URL")){e.preventDefault();alert("Add this project's Google Sheets URL in js/projects.js first.");}
   }));
  };
  render();document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
 }
 const form=document.querySelector("#contact-form");
 form?.addEventListener("submit",e=>{
  e.preventDefault();const name=form.elements.name.value.trim(),email=form.elements.email.value.trim(),message=form.elements.message.value.trim();
  const recipient=cfg.email||"your.email@example.com";if(recipient==="your.email@example.com"){alert("Update your email in js/site-config.js first.");return;}
  location.href=`mailto:${recipient}?subject=${encodeURIComponent("Portfolio enquiry from "+name)}&body=${encodeURIComponent("Name: "+name+"\nEmail: "+email+"\n\n"+message)}`;
 });
 document.querySelectorAll("[data-year]").forEach(el=>el.textContent=new Date().getFullYear());
});