const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const I={
en:{nav_index:"Index",nav_shop:"Shop",nav_studio:"Studio",cart:"Cart",close:"Close",
hint:"Press the surface. It keeps the mark for a while.",avail:n=>`${n} objects available →`,
process:"Process",process_p:"Most of these pieces are finished by hand, while the material is still soft or still hot.",
index:"Index",all:"All",glass:"Glass",porcelain:"Porcelain",c_object:"Object",c_mat:"Material",c_dim:"Size",c_year:"Year",c_status:"Status",
shop:"Shop",shop_note:"One-offs and small editions. Shipped from Berlin within the EU.",
studio:"Studio",studio_p1:"Elif Çak makes glass and porcelain objects in Berlin. [Placeholder — Elif's own statement on material, process and touch.]",
studio_p2:"[Placeholder — education, residencies, exhibitions, collaborations.]",
f_based:"Based in",f_mat:"Material",f_mat_v:"Glass, porcelain",f_for:"Open for",f_for_v:"Commissions, galleries, press",
imprint:"Imprint",privacy:"Privacy",terms:"Terms",returns:"Returns",shipping:"Shipping",
total:"Total",vat:"Prices include VAT. Shipping is calculated at checkout.",checkout:"Go to checkout",
add:"Add to cart",order:"Request this piece",sold:"Archive",left:n=>n==1?"1 available":`${n} available`,made:"Made to order",
empty:"Your cart is empty. Objects in the shop can be added from their page.",
d_mat:"Material",d_dim:"Size",d_year:"Year",d_status:"Status",
checkout_todo:"Checkout isn't connected yet. Connect Stripe or Shopify before launch."},
de:{nav_index:"Index",nav_shop:"Shop",nav_studio:"Atelier",cart:"Warenkorb",close:"Schließen",
hint:"Drück auf die Oberfläche. Sie behält den Abdruck eine Weile.",avail:n=>`${n} Objekte verfügbar →`,
process:"Prozess",process_p:"Die meisten Stücke werden von Hand vollendet, solange das Material noch weich oder heiß ist.",
index:"Index",all:"Alle",glass:"Glas",porcelain:"Porzellan",c_object:"Objekt",c_mat:"Material",c_dim:"Maße",c_year:"Jahr",c_status:"Status",
shop:"Shop",shop_note:"Unikate und kleine Editionen. Versand aus Berlin innerhalb der EU.",
studio:"Atelier",studio_p1:"Elif Çak gestaltet Objekte aus Glas und Porzellan in Berlin. [Platzhalter — Elifs eigenes Statement zu Material, Prozess und Berührung.]",
studio_p2:"[Platzhalter — Ausbildung, Residenzen, Ausstellungen, Kooperationen.]",
f_based:"Ort",f_mat:"Material",f_mat_v:"Glas, Porzellan",f_for:"Offen für",f_for_v:"Auftragsarbeiten, Galerien, Presse",
imprint:"Impressum",privacy:"Datenschutz",terms:"AGB",returns:"Widerruf",shipping:"Versand",
total:"Gesamt",vat:"Preise inkl. MwSt. Versand wird an der Kasse berechnet.",checkout:"Zur Kasse",
add:"In den Warenkorb",order:"Dieses Stück anfragen",sold:"Archiv",left:n=>n==1?"1 verfügbar":`${n} verfügbar`,made:"Auf Bestellung",
empty:"Dein Warenkorb ist leer. Objekte aus dem Shop kannst du auf ihrer Seite hinzufügen.",
d_mat:"Material",d_dim:"Maße",d_year:"Jahr",d_status:"Status",
checkout_todo:"Die Kasse ist noch nicht verbunden. Vor dem Launch Stripe oder Shopify anbinden."}};
let lang=(()=>{try{return localStorage.getItem("lang")}catch{return null}})()||(navigator.language.startsWith("de")?"de":"en");
let filter="all",cart={};try{cart=JSON.parse(localStorage.getItem("cart")||"{}")}catch{}
const store=(k,v)=>{try{localStorage.setItem(k,v)}catch{}};
const t=k=>I[lang][k];
const eur=n=>new Intl.NumberFormat(lang=="de"?"de-DE":"en-IE",{style:"currency",currency:"EUR",maximumFractionDigits:0}).format(n);
const img=o=>o.img?`background-image:url(${o.img})`:`background-image:linear-gradient(160deg,${o.tone[0]},${o.tone[1]})`;
const forSale=o=>o.price!=null;
const status=o=>!forSale(o)?t("sold"):o.stock?`<span class="dot"></span>${t("left")(o.stock)}`:t("made");
const matL=o=>t(o.mat);
const byN=n=>OBJECTS.find(o=>o.n==n);

/* ---------- the pressable surface ---------- */
(function surface(){
  const c=$("#surface"),x=c.getContext("2d"),still=matchMedia("(prefers-reduced-motion: reduce)").matches;
  let marks=[],dpr=1,w=0,h=0,last=null,cursor=null;
  const LIFE=9000;
  function size(){dpr=Math.min(devicePixelRatio||1,2);w=c.clientWidth;h=c.clientHeight;c.width=w*dpr;c.height=h*dpr;x.setTransform(dpr,0,0,dpr,0,0);draw(performance.now())}
  function dent(px,py,r,a){ // soft indentation, lit from top-left
    let g=x.createRadialGradient(px-r*.28,py-r*.28,0,px-r*.28,py-r*.28,r);
    g.addColorStop(0,`rgba(70,62,58,${.13*a})`);g.addColorStop(1,"rgba(70,62,58,0)");x.fillStyle=g;x.beginPath();x.arc(px-r*.28,py-r*.28,r,0,7);x.fill();
    g=x.createRadialGradient(px+r*.3,py+r*.3,0,px+r*.3,py+r*.3,r*.85);
    g.addColorStop(0,`rgba(255,255,255,${.55*a})`);g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.beginPath();x.arc(px+r*.3,py+r*.3,r*.85,0,7);x.fill();
  }
  function print(px,py,a,rot){ // fingerprint: whorl of ridges inside a pressed oval
    dent(px,py,46,a*1.4);
    x.save();x.translate(px,py);x.rotate(rot);x.lineWidth=1.1;
    for(let i=1;i<15;i++){x.strokeStyle=`rgba(60,52,48,${(.16-i*.006)*a})`;x.beginPath();x.ellipse(i*.35,i*.25,i*2.3,i*3,0,.15*i,Math.PI*2-.25);x.stroke()}
    x.restore();
  }
  function draw(now){
    x.fillStyle="#e7e6e2";x.fillRect(0,0,w,h);
    marks=still?marks:marks.filter(m=>now-m.t<LIFE);
    for(const m of marks){const a=still?1:1-(now-m.t)/LIFE;m.p?print(m.x,m.y,a,m.r):dent(m.x,m.y,m.s,a)}
    if(cursor){x.strokeStyle="rgba(18,18,18,.5)";x.lineWidth=1;x.beginPath();x.arc(cursor.x,cursor.y,14,0,7);x.stroke()}
  }
  function loop(now){draw(now);if(!still)requestAnimationFrame(loop)}
  function pos(e){const r=c.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
  c.addEventListener("pointermove",e=>{const p=pos(e);cursor=e.pointerType=="mouse"?p:null;
    if(!last||Math.hypot(p.x-last.x,p.y-last.y)>5){marks.push({x:p.x,y:p.y,s:16+Math.random()*6,t:performance.now()});last=p;if(marks.length>900)marks.shift()}
    if(still)draw()});
  c.addEventListener("pointerleave",()=>{cursor=null;last=null;if(still)draw()});
  c.addEventListener("pointerdown",e=>{const p=pos(e);marks.push({x:p.x,y:p.y,p:1,r:Math.random()*.8-.4,t:performance.now()});if(still)draw()});
  addEventListener("resize",size);size();if(!still)requestAnimationFrame(loop);
})();

/* ---------- render ---------- */
function renderStatic(){
  document.documentElement.lang=lang;
  $$("[data-i]").forEach(e=>{const v=t(e.dataset.i);if(typeof v=="string")e.textContent=v});
  $("#lang").textContent=lang=="en"?"Deutsch":"English";
  $("#availLink").innerHTML=`<span class="dot"></span>${t("avail")(OBJECTS.filter(o=>forSale(o)&&o.stock).length)}`;
}
function renderArches(){$("#arches").innerHTML=PROCESS.map(p=>`<figure><div class="arch" style="${img(p)}">${p.img?"":'<span class="mono">Photo</span>'}</div><figcaption class="mono"><span>${p.cap[lang]}</span></figcaption></figure>`).join("")}
function renderIndex(){
  const list=OBJECTS.filter(o=>filter=="all"||o.mat==filter).sort((a,b)=>b.n.localeCompare(a.n));
  $("#rows").innerHTML=list.map(o=>`<li tabindex="0" data-n="${o.n}"><span class="mono dim">${o.n}</span><span class="nm">${o.name[lang]}</span><span class="mono c-mat">${matL(o)}</span><span class="mono c-dim">${o.dims}</span><span class="mono c-yr">${o.year}</span><span class="mono">${status(o)}</span></li>`).join("");
}
function renderShop(){
  $("#grid").innerHTML=OBJECTS.filter(forSale).map(o=>`<article class="card">
    <div class="ph" style="${img(o)}" data-open="${o.n}" role="button" tabindex="0" aria-label="${o.name[lang]}"><span class="ann mono">№ ${o.n}<br>${o.dims}<br>${matL(o)}</span></div>
    <div class="meta"><h3>${o.name[lang]}</h3><span class="mono">${eur(o.price)}</span><span class="mono dim">№ ${o.n} — ${matL(o)}</span><span class="mono">${status(o)}</span>
    <button class="add mono" data-add="${o.n}">${o.stock?t("add"):t("order")}</button></div></article>`).join("");
}
function renderCart(){
  const ids=Object.keys(cart).filter(n=>cart[n]>0&&byN(n));
  $("#cartCount").textContent=ids.reduce((s,n)=>s+cart[n],0);
  $("#cartItems").innerHTML=ids.length?ids.map(n=>{const o=byN(n);return `<div class="it"><div class="ph" style="${img(o)}"></div><div><em>${o.name[lang]}</em><div class="mono dim">№ ${o.n}${o.stock?"":" — "+t("made")}</div><div class="qty mono"><button data-d="-1" data-id="${n}" aria-label="−">−</button>${cart[n]}<button data-d="1" data-id="${n}" aria-label="+">+</button></div></div><span class="mono">${eur(o.price*cart[n])}</span></div>`}).join(""):`<p class="empty mono">${t("empty")}</p>`;
  $("#cartTotal").textContent=eur(ids.reduce((s,n)=>s+byN(n).price*cart[n],0));
  $("#checkout").disabled=!ids.length;
}
function renderAll(){renderStatic();renderArches();renderIndex();renderShop();renderCart()}

/* ---------- interactions ---------- */
$("#lang").onclick=()=>{lang=lang=="en"?"de":"en";store("lang",lang);renderAll()};
$(".filters").onclick=e=>{const b=e.target.closest("button");if(!b)return;filter=b.dataset.f;$$(".filters button").forEach(x=>x.setAttribute("aria-pressed",x==b));renderIndex()};
const peek=$("#peek");
$("#rows").addEventListener("mousemove",e=>{const li=e.target.closest("li");if(!li){peek.classList.remove("on");return}
  const o=byN(li.dataset.n);peek.style.cssText=`${img(o)};left:${e.clientX}px;top:${e.clientY}px`;peek.classList.add("on")});
$("#rows").addEventListener("mouseleave",()=>peek.classList.remove("on"));
const openRow=e=>{const li=e.target.closest("li");if(li)openSheet(li.dataset.n)};
$("#rows").addEventListener("click",openRow);
$("#rows").addEventListener("keydown",e=>{if(e.key=="Enter")openRow(e)});

function add(n){const o=byN(n);if(!o||!forSale(o))return;const max=o.stock||9;cart[n]=Math.min((cart[n]||0)+1,max);store("cart",JSON.stringify(cart));renderCart();openCart()}
$("#grid").addEventListener("click",e=>{const a=e.target.closest("[data-add]"),o=e.target.closest("[data-open]");if(a)add(a.dataset.add);else if(o)openSheet(o.dataset.open)});
$("#grid").addEventListener("keydown",e=>{const o=e.target.closest("[data-open]");if(o&&e.key=="Enter")openSheet(o.dataset.open)});

function openSheet(n){const o=byN(n);
  $("#sheet").innerHTML=`<div class="ph" style="${img(o)}"></div><div class="info"><button class="x mono" data-close>${t("close")} ✕</button>
  <span class="mono dim">№ ${o.n}</span><h3>${o.name[lang]}</h3>${forSale(o)?`<span class="mono">${eur(o.price)}</span>`:""}
  ${o.d?`<p>${o.d[lang]}</p>`:""}
  <dl class="mono"><dt>${t("d_mat")}</dt><dd>${matL(o)}</dd><dt>${t("d_dim")}</dt><dd>${o.dims}</dd><dt>${t("d_year")}</dt><dd>${o.year}</dd><dt>${t("d_status")}</dt><dd>${status(o)}</dd></dl>
  ${forSale(o)?`<button class="btn" data-add2="${o.n}">${o.stock?t("add"):t("order")}</button>`:""}</div>`;
  $("#modal").classList.add("on");$("#sheet [data-close]").focus()}
const closeSheet=()=>$("#modal").classList.remove("on");
$("#modal").addEventListener("click",e=>{if(e.target.id=="modal"||e.target.closest("[data-close]"))closeSheet();const a=e.target.closest("[data-add2]");if(a){closeSheet();add(a.dataset.add2)}});

const openCart=()=>{$("#drawer").classList.add("on");$("#drawer").setAttribute("aria-hidden","false");$("#overlay").classList.add("on")};
const closeCart=()=>{$("#drawer").classList.remove("on");$("#drawer").setAttribute("aria-hidden","true");$("#overlay").classList.remove("on")};
$("#openCart").onclick=openCart;$("#closeCart").onclick=closeCart;$("#overlay").onclick=closeCart;
addEventListener("keydown",e=>{if(e.key=="Escape"){closeSheet();closeCart()}});
$("#cartItems").addEventListener("click",e=>{const b=e.target.closest("[data-d]");if(!b)return;const n=b.dataset.id,o=byN(n);
  cart[n]=Math.max(0,Math.min(cart[n]+ +b.dataset.d,o.stock||9));store("cart",JSON.stringify(cart));renderCart()});
$("#checkout").onclick=()=>alert(t("checkout_todo"));

$("#yr").textContent=new Date().getFullYear();
renderAll();
