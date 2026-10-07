// Shared engine. Each variant sets window.THEME = {hero:"photo"|"specimen"|"surface", word:"..."} before loading this.
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const TH=window.THEME||{hero:"photo"};
const I={
en:{bar:"Design preview — not a live shop",bar2:"Shipping from Berlin across the EU",tableware:"Tableware",objects:"Objects",process:"Process",about:"About",all:"All",
cart:"Cart",close:"Close",glass:"Glass",porcelain:"Porcelain",viewing:"Now viewing",sort:"Sort",s_feat:"Featured",s_low:"Price, low to high",s_high:"Price, high to low",s_new:"Newest",
inquire:"Inquire",add:"Add to cart",qty:"Qty.",tab_about:"About",tab_det:"Details",tab_ship:"Shipping",situ:"In situ",
d_mat:"Material",d_col:"Colour",d_dim:"Size",d_year:"Year",d_ed:"Edition",open_ed:"Open edition",one:"1/1",
ship:"Ships from Berlin in 3–5 working days. EU shipping only for now. Glass and porcelain are packed by hand.",
left:n=>n==1?"Last one":`${n} in stock`,proc_h:"Process",proc_p:"Most pieces are finished by hand, while the material is still soft or still hot.",
about_p:"Elif Çak makes glass and porcelain objects in Berlin. [Placeholder — Elif's own statement about material, process and touch.]",
about_p2:"[Placeholder — education, residencies, exhibitions, collaborations.]",based:"Based in",mat:"Material",open:"Open for",open_v:"Commissions, galleries, press",
news:"Newsletter",email:"Email address",join:"Join",legal:["Imprint","Privacy","Terms","Returns","Shipping"],
total:"Total",vat:"Prices include VAT. Shipping is added at checkout.",checkout:"Checkout",empty:"Your cart is empty.",
todo:"This is a design preview. Checkout isn't connected.",mailsub:"Inquiry",prev:"Previous",next:"Next",
hero_h:"works that remember touch,",hero_m:"mostly.",hint:"Press the surface. It keeps the mark for a while.",
spec_h:"Works that remember touch."},
de:{bar:"Designvorschau — kein aktiver Shop",bar2:"Versand aus Berlin in die ganze EU",tableware:"Geschirr",objects:"Objekte",process:"Prozess",about:"Über",all:"Alle",
cart:"Warenkorb",close:"Schließen",glass:"Glas",porcelain:"Porzellan",viewing:"Ansicht",sort:"Sortieren",s_feat:"Empfohlen",s_low:"Preis aufsteigend",s_high:"Preis absteigend",s_new:"Neueste",
inquire:"Anfragen",add:"In den Warenkorb",qty:"Menge",tab_about:"Über",tab_det:"Details",tab_ship:"Versand",situ:"In situ",
d_mat:"Material",d_col:"Farbe",d_dim:"Maße",d_year:"Jahr",d_ed:"Edition",open_ed:"Offene Edition",one:"1/1",
ship:"Versand aus Berlin in 3–5 Werktagen. Vorerst nur innerhalb der EU. Glas und Porzellan werden von Hand verpackt.",
left:n=>n==1?"Letztes Stück":`${n} auf Lager`,proc_h:"Prozess",proc_p:"Die meisten Stücke werden von Hand vollendet, solange das Material noch weich oder heiß ist.",
about_p:"Elif Çak gestaltet Objekte aus Glas und Porzellan in Berlin. [Platzhalter — Elifs eigenes Statement zu Material, Prozess und Berührung.]",
about_p2:"[Platzhalter — Ausbildung, Residenzen, Ausstellungen, Kooperationen.]",based:"Ort",mat:"Material",open:"Offen für",open_v:"Auftragsarbeiten, Galerien, Presse",
news:"Newsletter",email:"E-Mail-Adresse",join:"Anmelden",legal:["Impressum","Datenschutz","AGB","Widerruf","Versand"],
total:"Gesamt",vat:"Preise inkl. MwSt. Versand wird an der Kasse berechnet.",checkout:"Zur Kasse",empty:"Dein Warenkorb ist leer.",
todo:"Dies ist eine Designvorschau. Die Kasse ist nicht verbunden.",mailsub:"Anfrage",prev:"Zurück",next:"Weiter",
hero_h:"works that remember touch,",hero_m:"mostly.",hint:"Drück auf die Oberfläche. Sie behält den Abdruck eine Weile.",
spec_h:"Works that remember touch."}};
const get=k=>{try{return localStorage.getItem(k)}catch{return null}},put=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
let lang=get("lang")||(navigator.language.startsWith("de")?"de":"en");
let cart={};try{cart=JSON.parse(get("cart")||"{}")}catch{}
let size=get("gsize")||"M",sort="feat",mat="all";
const t=k=>I[lang][k],L=o=>o[lang];
const eur=n=>new Intl.NumberFormat(lang=="de"?"de-DE":"en-IE",{style:"currency",currency:"EUR",minimumFractionDigits:0}).format(n);
const by=n=>OBJECTS.find(o=>o.n==n);
const img=(p,alt="")=>`<img src="${IMG(p)}" alt="${alt}" loading="lazy">`;
const priceTxt=o=>o.price==null?t("inquire"):eur(o.price);
const stTxt=o=>o.price==null?t("one"):`<span class="dot"></span>${t("left")(o.stock)}`;

/* chrome */
function chrome(){
  document.documentElement.lang=lang;
  $("#bar").innerHTML=`<span class="lbl"><b>●</b> ${t("bar")} — ${t("bar2")}</span>`;
  const h=location.hash;
  $("#top").innerHTML=`<nav class="lbl"><a href="#/shop/tableware" class="${h.includes("tableware")?"cur":""}">${t("tableware")}</a><a href="#/shop/objects" class="${h.includes("objects")?"cur":""}">${t("objects")}</a><a href="#/process" class="${h.includes("process")?"cur":""}">${t("process")}</a><a href="#/about" class="${h.includes("about")?"cur":""}">${t("about")}</a></nav>
   <a href="#/" class="word">${TH.word||"Elif Çak"}</a>
   <div class="right lbl"><button id="lang">${lang=="en"?"DE":"EN"}</button><button id="cartBtn">${t("cart")} (${count()})</button></div>`;
  $("#lang").onclick=()=>{lang=lang=="en"?"de":"en";put("lang",lang);render()};
  $("#cartBtn").onclick=openCart;
  $("#bot").innerHTML=`<div class="cols lbl"><a href="#/shop/tableware">${t("tableware")}</a><a href="#/shop/objects">${t("objects")}</a><a href="#/process">${t("process")}</a><a href="#/about">${t("about")}</a><a href="https://instagram.com/elifcak" target="_blank" rel="noopener">Instagram ↗</a></div>
   <div class="cols lbl">${t("legal").map(x=>`<a href="#/">${x}</a>`).join("")}</div>
   <div class="cols"><span class="lbl">${t("news")}</span><form onsubmit="return false"><input type="email" placeholder="${t("email")}" aria-label="${t("email")}"><button class="lbl">${t("join")}</button></form><span class="lbl dim">© ${new Date().getFullYear()} Elif Çak, Berlin</span></div>`;
}

/* home */
function heroHTML(){
  const e=EDITORIAL.hero;
  if(TH.hero=="surface") return `<section class="hero surface"><canvas id="surface" aria-hidden="true"></canvas><h1 class="sh"><span>${t("hero_h").split(" ").slice(0,2).join(" ")}</span><span>${t("hero_h").split(" ").slice(2).join(" ")}<sup class="lbl">${t("hero_m")}</sup></span></h1><p class="hint lbl">${t("hint")}</p><a class="hero-link lbl" href="${e.href}">${L(e.eyebrow)} — ${L(e.title)} →</a></section>`;
  if(TH.hero=="specimen"){const o=by("014");return `<section class="hero spec"><div class="spec-h ttl">${t("spec_h")}</div><a href="#/p/014" class="spec-obj"><div class="im">${img(o.imgs[0],L(o.name))}</div>
    <span class="ann a1 lbl">№ ${o.n} — ${L(o.name)}</span><span class="ann a2 lbl">${o.dims}<br>${t(o.mat)}</span><span class="ann a3 lbl">${t("one")} — ${o.year}</span></a>
    <div class="spec-rail lbl"><span>Glass / Porcelain</span><span>Berlin</span><a href="#/shop/tableware"><span class="dot"></span>${OBJECTS.filter(o=>o.price!=null).length} ${t("tableware")} →</a></div></section>`}
  return `<section class="hero"><a href="${e.href}" class="im" style="position:absolute;inset:0">${img(e.img,L(e.title))}</a><span class="eb lbl">${L(e.eyebrow)}</span><div class="cap"><a href="${e.href}" class="ttl">${L(e.title)}</a></div></section>`;
}
function home(){
  const E=EDITORIAL,s=E.single;
  return heroHTML()+
  `<section class="blk"><a href="${s.href}" class="single"><div class="im">${img(s.img,L(s.title))}</div><div class="capline"><span class="lbl">${L(s.eyebrow)}</span><span class="ttl">${L(s.title)}</span></div></a></section>
   <section class="pair">${E.pair.map(p=>`<a href="${p.href}"><div class="im">${img(p.img,L(p.title))}</div><div class="capline"><span class="lbl">${L(p.eyebrow)}</span><span class="ttl">${L(p.title)}</span></div></a>`).join("")}</section>
   <section class="blk trio">${E.trio.map(p=>`<figure><div class="im">${img(p.img,L(p.cap))}</div><figcaption class="lbl">${L(p.cap)}</figcaption></figure>`).join("")}</section>`;
}

/* collection */
function collection(col){
  let list=OBJECTS.filter(o=>(col=="all"||o.col==col)&&(mat=="all"||o.mat==mat));
  if(sort=="low")list.sort((a,b)=>(a.price??1e9)-(b.price??1e9));
  if(sort=="high")list.sort((a,b)=>(b.price??-1)-(a.price??-1));
  if(sort=="new")list.sort((a,b)=>b.year-a.year||b.n.localeCompare(a.n));
  const cols={S:6,M:4,L:2}[size];
  return `<div class="ctl lbl"><div class="chips"><span>${t("viewing")} ${t(col)}</span>${["all","glass","porcelain"].map(m=>`<button data-mat="${m}" class="${mat==m?"cur":""}">${t(m)}</button>`).join("")}</div>
    <label>${t("sort")} + <select id="sort" aria-label="${t("sort")}">${["feat","low","high","new"].map(s=>`<option value="${s}" ${sort==s?"selected":""}>${t("s_"+s)}</option>`).join("")}</select></label>
    <div class="sz">${["S","M","L"].map(s=>`<button data-size="${s}" class="${size==s?"cur":""}">${s}</button>`).join("")}</div></div>
    <div class="grid" style="--cols:${cols}">${list.map(card).join("")}</div>`;
}
const card=o=>`<a class="card" href="#/p/${o.n}"><div class="im">${img(o.imgs[0],L(o.name))}${o.situ[0]?img(o.situ[0]):""}</div>
  <div class="meta lbl"><span class="no dim">№ ${o.n} — ${t(o.mat)}</span><span class="nm">${L(o.name)}</span><span class="pr">${priceTxt(o)}</span><span class="st dim">${stTxt(o)}</span></div></a>`;

/* product */
function product(n){
  const o=by(n);if(!o)return home();
  const sib=OBJECTS.filter(x=>x.col==o.col),i=sib.indexOf(o),prev=sib[(i-1+sib.length)%sib.length],next=sib[(i+1)%sib.length];
  const buy=o.price==null?`<a class="btn lbl" href="mailto:studio@elifcak.com?subject=${encodeURIComponent(t("mailsub")+" № "+o.n+" "+L(o.name))}">${t("inquire")}</a>`
    :`<div class="qty lbl"><span>${t("qty")}</span><span><button data-q="-1" aria-label="−">−</button><b id="q">1</b><button data-q="1" aria-label="+">+</button></span></div><button class="btn lbl" id="add">${t("add")}</button>`;
  return `<section class="pdp"><aside class="pinfo">
    <div><span class="no lbl dim">№ ${o.n}</span><div class="pname">${L(o.name)}</div><div class="lbl">${priceTxt(o)}</div></div>
    <div class="lbl">${o.colour}</div>${buy}
    <div class="tabs lbl" role="tablist"><button role="tab" aria-selected="true" data-tab="a">${t("tab_about")}</button><button role="tab" aria-selected="false" data-tab="d">${t("tab_det")}</button><button role="tab" aria-selected="false" data-tab="s">${t("tab_ship")}</button></div>
    <div class="tabbody" id="tb"></div></aside>
   <div class="pimgs">${o.imgs.map(p=>`<div class="im">${img(p,L(o.name))}</div>`).join("")}
    ${o.situ.length?`<div class="situ-h lbl">${t("situ")}</div>${o.situ.map(p=>`<div class="im">${img(p)}</div>`).join("")}`:""}</div>
   <div class="arrows lbl"><a href="#/p/${prev.n}" aria-label="${t("prev")}">←</a><a href="#/p/${next.n}" aria-label="${t("next")}">→</a></div></section>`;
}
function pdpBind(n){
  const o=by(n);if(!o)return;let q=1;
  const tab=k=>{$$(".tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab==k));
    $("#tb").innerHTML=k=="a"?`<p>${L(o.d)}</p>`:k=="s"?`<p>${t("ship")}</p>`:
    `<dl class="lbl"><dt class="dim">${t("d_mat")}</dt><dd>${t(o.mat)}</dd><dt class="dim">${t("d_col")}</dt><dd>${o.colour}</dd><dt class="dim">${t("d_dim")}</dt><dd>${o.dims}</dd><dt class="dim">${t("d_year")}</dt><dd>${o.year}</dd><dt class="dim">${t("d_ed")}</dt><dd>${o.price==null?t("one"):t("open_ed")}</dd></dl>`};
  $(".tabs").onclick=e=>{const b=e.target.closest("button");if(b)tab(b.dataset.tab)};tab("a");
  $$("[data-q]").forEach(b=>b.onclick=()=>{q=Math.max(1,Math.min(o.stock,q+ +b.dataset.q));$("#q").textContent=q});
  const add=$("#add");if(add)add.onclick=()=>{cart[n]=Math.min(o.stock,(cart[n]||0)+q);put("cart",JSON.stringify(cart));chrome();renderCart();openCart()};
}

/* process / about */
const process_=()=>`<section class="page-h"><h1 class="ttl">${t("proc_h")}</h1><p>${t("proc_p")}</p></section>
  <section class="proc">${PROCESS.map(p=>`<figure><div class="im">${img(p.img,L(p.cap))}</div><figcaption><span class="lbl">${L(p.cap)}</span><span class="dim">${L(p.t)}</span></figcaption></figure>`).join("")}</section>`;
const about=()=>`<section class="about"><div class="im">${img("portrait","Elif Çak")}</div><div class="about-t"><h1 class="ttl">Elif Çak</h1><p>${t("about_p")}</p><p>${t("about_p2")}</p>
  <dl class="lbl"><dt class="dim">${t("based")}</dt><dd>Berlin, DE</dd><dt class="dim">${t("mat")}</dt><dd>${t("glass")}, ${t("porcelain")}</dd><dt class="dim">${t("open")}</dt><dd>${t("open_v")}</dd></dl>
  <a class="lbl" href="mailto:studio@elifcak.com">studio@elifcak.com</a><a class="lbl" href="https://instagram.com/elifcak" target="_blank" rel="noopener">Instagram @elifcak ↗</a></div></section>`;

/* cart */
const count=()=>Object.keys(cart).filter(n=>by(n)&&cart[n]>0).reduce((s,n)=>s+cart[n],0);
function renderCart(){
  const ids=Object.keys(cart).filter(n=>by(n)&&cart[n]>0);
  $("#ci").innerHTML=ids.length?ids.map(n=>{const o=by(n);return `<div class="it"><div class="im">${img(o.imgs[0])}</div><div><div class="lbl">${L(o.name)}</div><div class="q lbl"><button data-d="-1" data-id="${n}" aria-label="−">−</button>${cart[n]}<button data-d="1" data-id="${n}" aria-label="+">+</button></div></div><span class="lbl">${eur(o.price*cart[n])}</span></div>`}).join(""):`<p class="empty lbl">${t("empty")}</p>`;
  $("#tot").textContent=eur(ids.reduce((s,n)=>s+by(n).price*cart[n],0));$("#co").disabled=!ids.length;
  $("#dh").textContent=t("cart");$("#dc").textContent=t("close");$("#vat").textContent=t("vat");$("#co").textContent=t("checkout");$("#totl").textContent=t("total");
}
function openCart(){renderCart();$("#drawer").classList.add("on");$("#ov").classList.add("on");$("#drawer").setAttribute("aria-hidden","false")}
function closeCart(){$("#drawer").classList.remove("on");$("#ov").classList.remove("on");$("#drawer").setAttribute("aria-hidden","true")}

/* surface (variant 3) */
function surface(){
  const c=$("#surface");if(!c)return;const x=c.getContext("2d"),still=matchMedia("(prefers-reduced-motion: reduce)").matches,LIFE=9000,bg=getComputedStyle(document.body).getPropertyValue("--surface").trim()||"#e7e6e2";
  let marks=[],w=0,h=0,last=null,cur=null,alive=true;
  const fit=()=>{const d=Math.min(devicePixelRatio||1,2);w=c.clientWidth;h=c.clientHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);draw(performance.now())};
  const dent=(px,py,r,a)=>{let g=x.createRadialGradient(px-r*.28,py-r*.28,0,px-r*.28,py-r*.28,r);g.addColorStop(0,`rgba(70,62,58,${.13*a})`);g.addColorStop(1,"rgba(70,62,58,0)");x.fillStyle=g;x.beginPath();x.arc(px-r*.28,py-r*.28,r,0,7);x.fill();
    g=x.createRadialGradient(px+r*.3,py+r*.3,0,px+r*.3,py+r*.3,r*.85);g.addColorStop(0,`rgba(255,255,255,${.55*a})`);g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.beginPath();x.arc(px+r*.3,py+r*.3,r*.85,0,7);x.fill()};
  const print=(px,py,a,rot)=>{dent(px,py,46,a*1.4);x.save();x.translate(px,py);x.rotate(rot);x.lineWidth=1.1;for(let i=1;i<15;i++){x.strokeStyle=`rgba(60,52,48,${(.16-i*.006)*a})`;x.beginPath();x.ellipse(i*.35,i*.25,i*2.3,i*3,0,.15*i,Math.PI*2-.25);x.stroke()}x.restore()};
  function draw(now){x.fillStyle=bg;x.fillRect(0,0,w,h);if(!still)marks=marks.filter(m=>now-m.t<LIFE);
    for(const m of marks){const a=still?1:1-(now-m.t)/LIFE;m.p?print(m.x,m.y,a,m.r):dent(m.x,m.y,m.s,a)}
    if(cur){x.strokeStyle="rgba(18,18,18,.5)";x.lineWidth=1;x.beginPath();x.arc(cur.x,cur.y,14,0,7);x.stroke()}}
  const loop=now=>{if(!alive||!document.body.contains(c))return;draw(now);if(!still)requestAnimationFrame(loop)};
  const pos=e=>{const r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}};
  c.addEventListener("pointermove",e=>{const p=pos(e);cur=e.pointerType=="mouse"?p:null;if(!last||Math.hypot(p.x-last.x,p.y-last.y)>5){marks.push({x:p.x,y:p.y,s:16+Math.random()*6,t:performance.now()});last=p;if(marks.length>900)marks.shift()}if(still)draw()});
  c.addEventListener("pointerleave",()=>{cur=null;last=null;if(still)draw()});
  c.addEventListener("pointerdown",e=>{const p=pos(e);marks.push({x:p.x,y:p.y,p:1,r:Math.random()*.8-.4,t:performance.now()});if(still)draw()});
  addEventListener("resize",fit);fit();if(!still)requestAnimationFrame(loop);
}

/* router */
function render(){
  const [r,a]=(location.hash.replace(/^#\/?/,"")||"").split("/");
  chrome();
  const v=$("#view");
  if(r=="shop")v.innerHTML=collection(a||"all");
  else if(r=="p")v.innerHTML=product(a);
  else if(r=="process")v.innerHTML=process_();
  else if(r=="about")v.innerHTML=about();
  else v.innerHTML=home();
  if(r=="p")pdpBind(a);
  if(r=="shop"){
    $$("[data-mat]").forEach(b=>b.onclick=()=>{mat=b.dataset.mat;render()});
    $$("[data-size]").forEach(b=>b.onclick=()=>{size=b.dataset.size;put("gsize",size);render()});
    $("#sort").onchange=e=>{sort=e.target.value;render()};
  }
  surface();renderCart();
}
addEventListener("hashchange",()=>{render();scrollTo({top:0,behavior:"instant"})});
document.addEventListener("keydown",e=>{if(e.key=="Escape")closeCart()});
document.addEventListener("click",e=>{const d=e.target.closest("[data-d]");if(!d)return;const n=d.dataset.id,o=by(n);cart[n]=Math.max(0,Math.min(o.stock,cart[n]+ +d.dataset.d));put("cart",JSON.stringify(cart));renderCart();chrome()});
$("#ov").onclick=closeCart;$("#dc").onclick=closeCart;$("#co").onclick=()=>alert(t("todo"));
render();
