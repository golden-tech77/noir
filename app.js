const K='<rect x="0" y="0" width="0" height="0"/>';
// Hand-drawn SVG product art (currentColor = product accent). Replace with <img> photos when hosting your own files.
const ART={
1:()=>`<path d="M42 118a58 58 0 0 1 116 0" fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="round"/><path d="M50 112a50 50 0 0 1 100 0" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3" stroke-linecap="round"/><rect x="28" y="110" width="32" height="62" rx="15" fill="currentColor"/><rect x="140" y="110" width="32" height="62" rx="15" fill="currentColor"/><rect x="34" y="120" width="8" height="38" rx="4" fill="#fff" fill-opacity=".35"/><rect x="146" y="120" width="8" height="38" rx="4" fill="#fff" fill-opacity=".35"/>`,
2:()=>{let k='';for(let r=0;r<4;r++)for(let c=0;c<10;c++)k+=`<rect x="${24+c*15}" y="${64+r*17}" width="${r==3&&c>1&&c<8?0:12}" height="12" rx="3" fill="#000" fill-opacity=".45"/>`;return`<rect x="14" y="52" width="172" height="92" rx="14" fill="currentColor"/>${k}<rect x="54" y="116" width="92" height="12" rx="4" fill="#000" fill-opacity=".45"/><rect x="14" y="52" width="172" height="5" rx="2" fill="#fff" fill-opacity=".3"/>`},
3:()=>`<path d="M100 22c34 0 52 26 52 62v34c0 32-22 56-52 56s-52-24-52-56V84c0-36 18-62 52-62z" fill="currentColor"/><path d="M100 22v62M48 84h104" stroke="#000" stroke-opacity=".4" stroke-width="3" fill="none"/><rect x="93" y="42" width="14" height="26" rx="7" fill="#000" fill-opacity=".45"/><path d="M62 40c8-10 20-14 30-14" stroke="#fff" stroke-opacity=".4" stroke-width="4" fill="none" stroke-linecap="round"/>`,
4:()=>`<rect x="52" y="22" width="96" height="156" rx="28" fill="currentColor"/><circle cx="100" cy="64" r="16" fill="#000" fill-opacity=".45"/><circle cx="100" cy="124" r="32" fill="#000" fill-opacity=".45"/><circle cx="100" cy="124" r="20" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/><rect x="60" y="30" width="6" height="140" rx="3" fill="#fff" fill-opacity=".25"/>`,
5:()=>`<ellipse cx="100" cy="150" rx="68" ry="20" fill="currentColor"/><ellipse cx="100" cy="142" rx="68" ry="20" fill="currentColor"/><ellipse cx="100" cy="142" rx="52" ry="13" fill="#000" fill-opacity=".4"/><path d="M108 70l-26 44h20l-8 38 32-52H104z" fill="currentColor"/><path d="M108 70l-26 44h20" stroke="#fff" stroke-opacity=".4" stroke-width="3" fill="none"/>`,
6:()=>`<path d="M78 176h44l-8-40H86z" fill="currentColor" fill-opacity=".8"/><rect x="60" y="172" width="80" height="10" rx="5" fill="currentColor"/><circle cx="100" cy="84" r="58" fill="currentColor"/><circle cx="100" cy="84" r="40" fill="#000" fill-opacity=".55"/><circle cx="100" cy="84" r="22" fill="#000" fill-opacity=".7"/><circle cx="92" cy="76" r="7" fill="#fff" fill-opacity=".6"/><circle cx="100" cy="84" r="58" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>`
};
const products=[
 {id:1,name:'هدفون نئون',category:'audio',price:2450000,old:2890000,c:'#b49aff',desc:'هدفون مدرن با طراحی مینیمال و ظاهر آینده‌نگر.',s:[['نوع اتصال','بلوتوث ۵.۳'],['باتری','۴۰ ساعت'],['حذف نویز','فعال (ANC)']]},
 {id:2,name:'کیبورد سایبر',category:'gaming',price:3180000,c:'#76f5e8',desc:'کیبورد گیمینگ با نورپردازی الهام‌گرفته از سایبرپانک.',s:[['سوییچ','مکانیکال'],['نورپردازی','RGB'],['اتصال','USB-C / بی‌سیم']]},
 {id:3,name:'ماوس فانتوم',category:'gaming',price:1290000,old:1490000,c:'#ff7ab8',desc:'ماوس خوش‌دست برای میز کار مدرن و بازی.',s:[['حسگر','۲۶٬۰۰۰ DPI'],['وزن','۶۳ گرم'],['دکمه‌ها','۶ دکمه']]},
 {id:4,name:'اسپیکر نوا',category:'audio',price:1890000,c:'#6cb2ff',desc:'اسپیکر جمع‌وجور با طراحی متفاوت.',s:[['توان','۲۰ وات'],['مقاومت','IPX6'],['باتری','۱۲ ساعت']]},
 {id:5,name:'پایه شارژ',category:'accessory',price:890000,c:'#76f5e8',desc:'پایه شارژ بی‌سیم کاربردی برای میز کار.',s:[['توان','۱۵ وات'],['استاندارد','Qi'],['ورودی','USB-C']]},
 {id:6,name:'وب‌کم ویژن',category:'accessory',price:2150000,old:2450000,c:'#6cb2ff',desc:'وب‌کم با کیفیت عالی برای تماس و تولید محتوا.',s:[['کیفیت','۴K'],['فوکوس','خودکار'],['میکروفن','دوگانه']]}
];
const CATS={all:'همه',audio:'صوتی',gaming:'گیمینگ',accessory:'لوازم جانبی'};
const CODES={NOIR10:.1,WELCOME5:.05},FREE=5e6,nf=new Intl.NumberFormat('fa-IR'),fmt=n=>nf.format(Math.round(n))+' تومان',$=i=>document.getElementById(i);
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
let category='all',coupon=null,cart=new Map(),lastFocus=null,current=null;
try{const s=JSON.parse(localStorage.getItem('noir-cart')||'{}');(s.items||[]).forEach(([i,q])=>products.some(p=>p.id===i)&&q>0&&cart.set(i,q));coupon=CODES[s.coupon]?s.coupon:null}catch(e){}
const save=()=>{try{localStorage.setItem('noir-cart',JSON.stringify({items:[...cart],coupon}))}catch(e){}};
function el(t,c,x,a){const e=document.createElement(t);if(c)e.className=c;if(x!=null)e.textContent=x;if(a)for(const k in a)e.setAttribute(k,a[k]);return e}
function toast(t){const x=$('toast');x.textContent=t;x.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>x.classList.remove('show'),1800)}

/* ---- 3D layered object: stacked SVG slices give real depth ---- */
function artNode(p,onload){
  const svg=()=>{const d=el('div');d.innerHTML='<svg viewBox="0 0 200 200" aria-hidden="true">'+ART[p.id]()+'</svg>';return d.firstChild};
  const ex=['webp','png','jpg'];let k=0;
  const i=el('img',null,null,{alt:p.name,draggable:'false',src:'images/p'+p.id+'.'+ex[0]});
  i.addEventListener('load',()=>onload&&onload());
  i.addEventListener('error',()=>{k++;if(k<ex.length)i.src='images/p'+p.id+'.'+ex[k];else i.replaceWith(svg())});
  return i;
}
function makeObj(p,n,gap){
  const stage=el('div','stage'),obj=el('div','obj');
  stage.style.setProperty('--a',p.c);
  for(let i=0;i<n;i++){
    const l=el('div','layer');
    if(i===n-1)l.append(artNode(p,()=>obj.querySelectorAll('.layer:not(:last-child)').forEach(x=>x.remove())));
    else l.innerHTML='<svg viewBox="0 0 200 200" aria-hidden="true">'+ART[p.id]()+'</svg>';
    l.style.transform=`translateZ(${(i-(n-1)/2)*gap}px)`;
    if(i<n-1)l.style.filter=`brightness(${.55+.45*i/n})`;
    obj.append(l);
  }
  stage.append(obj);return{stage,obj};
}
const spinners=new Set();
/* ---- real 3D (Three.js): models built from primitives ---- */
function kill(s){spinners.delete(s);s.dispose&&s.dispose();s.obj.parentNode.remove()}
function build(id,col){
  const T=THREE,G=new T.Group(),
  M=(c,o)=>new T.MeshStandardMaterial(Object.assign({color:c,metalness:.35,roughness:.4},o)),
  A=M(col),D=M(0x16151f,{metalness:.2,roughness:.55}),E=M(0x111111,{emissive:col,emissiveIntensity:1.3}),
  add=(g,m,x=0,y=0,z=0)=>{const o=new T.Mesh(g,m);o.position.set(x,y,z);G.add(o);return o},
  rx=o=>{o.rotation.x=Math.PI/2;return o},rz=o=>{o.rotation.z=Math.PI/2;return o};
  if(id==1){
    add(new T.TorusGeometry(1.15,.09,16,60,Math.PI),A);
    [-1,1].forEach(s=>{rz(add(new T.CylinderGeometry(.5,.5,.38,40),A,s*1.15,0,0));
      rz(add(new T.CylinderGeometry(.44,.44,.18,40),D,s*1.38,0,0));
      rz(add(new T.TorusGeometry(.3,.025,8,40),E,s*1.48,0,0)).rotation.set(0,Math.PI/2,0)});
  }
  if(id==2){
    add(new T.BoxGeometry(3.4,.2,1.4),A);
    for(let r=0;r<3;r++)for(let c=0;c<12;c++)add(new T.BoxGeometry(.2,.1,.2),(r+c)%5==0?E:D,-1.485+c*.27,.15,-.5+r*.27);
    add(new T.BoxGeometry(1.6,.1,.2),D,0,.15,.4);G.rotation.x=.35;
  }
  if(id==3){
    add(new T.SphereGeometry(.8,40,28),A).scale.set(.9,.55,1.5);
    add(new T.BoxGeometry(.03,.03,.9),D,0,.43,-.4);
    rz(add(new T.CylinderGeometry(.09,.09,.16,16),E,0,.42,-.6));G.rotation.x=.15;
  }
  if(id==4){
    add(new T.CylinderGeometry(.75,.75,2.2,48),A);
    add(new T.CylinderGeometry(.78,.78,1.3,48),D);
    [-1,1].forEach(s=>add(new T.TorusGeometry(.75,.04,8,48),E,0,s*1.1,0).rotation.x=Math.PI/2);
    add(new T.CylinderGeometry(.55,.55,.02,40),D,0,1.11,0);
  }
  if(id==5){
    add(new T.CylinderGeometry(1.2,1.2,.2,64),A);
    add(new T.CylinderGeometry(.95,.95,.02,64),D,0,.11,0);
    add(new T.TorusGeometry(.78,.03,8,64),E,0,.12,0).rotation.x=Math.PI/2;G.rotation.x=.55;
  }
  if(id==6){
    rx(add(new T.CylinderGeometry(.75,.75,.55,48),A));
    add(new T.TorusGeometry(.56,.06,16,48),E,0,0,.29);
    rx(add(new T.CylinderGeometry(.5,.5,.06,40),D,0,0,.28));
    add(new T.SphereGeometry(.28,24,16),M(0x1b2a55,{metalness:.9,roughness:.1}),0,0,.3).scale.z=.4;
    add(new T.CylinderGeometry(.12,.12,.8,16),D,0,-.85,0);
    add(new T.CylinderGeometry(.55,.6,.1,40),D,0,-1.3,0);
  }
  return G;
}
function THREE3D(box,p,{auto=.4,drag=true}={}){
  try{
    if(!window.THREE)return null;
    const T=THREE,r=new T.WebGLRenderer({antialias:true,alpha:true}),cv=r.domElement;
    r.setPixelRatio(Math.min(devicePixelRatio||1,2));
    const stage=el('div','stage');stage.style.display='block';cv.style.cssText='width:100%;height:100%;display:block';cv.setAttribute('aria-hidden','true');
    stage.append(cv);box.prepend(stage);
    const sc=new T.Scene(),cam=new T.PerspectiveCamera(32,1,.1,50);cam.position.set(0,.4,8);cam.lookAt(0,0,0);
    sc.add(new T.HemisphereLight(0xffffff,0x332255,1));
    const d=new T.DirectionalLight(0xffffff,1.2);d.position.set(3,5,5);sc.add(d);
    const rim=new T.PointLight(new T.Color(p.c),2,40);rim.position.set(-5,1,-3);sc.add(rim);
    const P=new T.Group();sc.add(P);
    const setModel=G=>{P.children.slice().forEach(c=>P.remove(c));P.rotation.set(0,0,0);P.position.set(0,0,0);P.scale.setScalar(1);G.position.set(0,0,0);P.add(G);P.updateMatrixWorld(true);
      const b=new T.Box3().setFromObject(G),sz=b.getSize(new T.Vector3());G.position.sub(b.getCenter(new T.Vector3()));P.scale.setScalar(3.4/Math.max(sz.x,sz.y,sz.z,.001))};
    setModel(build(p.id,p.c));
    const s={obj:cv,ry:-25,rx:-8,vy:RM?0:auto,dragging:false,box,w:0,h:0,t:0};
    s.draw=()=>{const w=box.clientWidth,h=box.clientHeight;if(!w||!h)return;
      if(w!==s.w||h!==s.h){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix();s.w=w;s.h=h}
      s.t+=.02;P.rotation.y=s.ry*Math.PI/180;P.rotation.x=s.rx*Math.PI/180;P.position.y=RM?0:Math.sin(s.t)*.12;r.render(sc,cam)};
    s.dispose=()=>{r.dispose();r.forceContextLoss&&r.forceContextLoss()};
    s.load=file=>{
      if(!T.GLTFLoader){toast('بارگذار GLB در دسترس نیست');return}
      if(!/\.glb$/i.test(file.name)){toast('فقط فایل .glb پشتیبانی می‌شود');return}
      if(file.size>25e6){toast('حجم فایل بیش از ۲۵ مگابایت است');return}
      file.arrayBuffer().then(buf=>new T.GLTFLoader().parse(buf,'',g=>{setModel(g.scene);toast('مدل بارگذاری شد')},()=>toast('خواندن فایل ناموفق بود')))};
    box.addEventListener('dragover',e=>e.preventDefault());
    box.addEventListener('drop',e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)s.load(f)});
    if(p.glb&&T.GLTFLoader)new T.GLTFLoader().load(p.glb,g=>setModel(g.scene),undefined,()=>{});
    if(drag){let x0,y0;
      box.addEventListener('pointerdown',e=>{s.dragging=true;x0=e.clientX;y0=e.clientY;box.setPointerCapture(e.pointerId)});
      box.addEventListener('pointermove',e=>{if(s.dragging){s.ry+=(e.clientX-x0)*.6;s.rx=Math.max(-40,Math.min(40,s.rx-(e.clientY-y0)*.4));x0=e.clientX;y0=e.clientY}});
      const up=()=>s.dragging=false;box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up)}
    spinners.add(s);return s;
  }catch(err){return null}
}
function spin(box,p,o={}){return THREE3D(box,p,o)||spinSvg(box,p,o)}
function spinSvg(box,p,{n=7,gap=6,auto=.35,drag=true}={}){
  const {stage,obj}=makeObj(p,n,gap);box.prepend(stage);
  const s={obj,ry:-25,rx:-8,vy:auto,dragging:false,tx:0,ty:0,box};
  if(drag){let x0,y0;
    box.addEventListener('pointerdown',e=>{s.dragging=true;x0=e.clientX;y0=e.clientY;box.setPointerCapture(e.pointerId)});
    box.addEventListener('pointermove',e=>{if(s.dragging){s.ry+=(e.clientX-x0)*.6;s.rx=Math.max(-40,Math.min(40,s.rx-(e.clientY-y0)*.4));x0=e.clientX;y0=e.clientY}});
    const up=()=>s.dragging=false;box.addEventListener('pointerup',up);box.addEventListener('pointercancel',up);
  }
  spinners.add(s);if(RM)s.vy=0;
  s.draw=()=>{obj.style.transform=`rotateX(${s.rx}deg) rotateY(${s.ry}deg)`};s.draw();return s;
}
(function loop(){spinners.forEach(s=>{if(!s.box.isConnected){spinners.delete(s);return}if(!s.dragging){s.ry+=s.vy;s.rx+=(-8-s.rx)*.03}s.draw()});requestAnimationFrame(loop)})();
let heroSpin;const heroList=[1,2,4,6];let hi=0;
function heroShow(){const p=products.find(x=>x.id===heroList[hi%4]);$('heroView').style.setProperty('--a',p.c);if(heroSpin)kill(heroSpin);heroSpin=spin($('heroView'),p,{n:8,gap:7,auto:.5})}
$('heroView').addEventListener('click',()=>{hi++;heroShow()});heroShow();
if(!RM)setInterval(()=>{if(!location.hash.startsWith('#p')&&!heroSpin.dragging){hi++;heroShow()}},7000);

/* ---- cards ---- */
const off=p=>p.old?(p.old-p.price)/p.old:0;
function card(p){
  const c=el('article','card'),art=el('a','art',null,{href:'#p'+p.id,'aria-label':'مشاهده '+p.name});
  c.style.setProperty('--a',p.c);art.style.setProperty('--a',p.c);
  const {stage,obj}=makeObj(p,4,5);art.append(stage);
  if(p.old)art.append(el('div','badge','٪'+nf.format(Math.round(off(p)*100))+' تخفیف'));
  if(!RM){art.addEventListener('pointermove',e=>{const r=art.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    art.style.setProperty('--mx',x*100+'%');art.style.setProperty('--my',y*100+'%');obj.style.transform=`rotateY(${(x-.5)*80}deg) rotateX(${(.5-y)*50}deg) scale(1.12)`});
    art.addEventListener('pointerleave',()=>obj.style.transform='')}
  const body=el('div','card-body'),foot=el('div','card-foot'),pr=el('div'),btns=el('div','btns');
  pr.append(el('span','price',fmt(p.price)));if(p.old)pr.append(el('span','old',fmt(p.old)));
  const v=el('a','add','جزئیات',{href:'#p'+p.id}),a=el('button','add','افزودن +');a.dataset.add=p.id;
  btns.append(v,a);foot.append(pr,btns);
  const h=el('h3');h.append(el('a',null,p.name,{href:'#p'+p.id}));
  body.append(h,el('p',null,p.desc),foot);c.append(art,body);return c;
}
function renderCats(){
  const bar=$('cats');bar.replaceChildren();
  Object.entries(CATS).forEach(([k,t])=>{
    const n=k==='all'?products.length:products.filter(p=>p.category===k).length;
    const b=el('button','cat'+(k===category?' active':''),t,{role:'tab','aria-selected':k===category});
    b.append(el('i',null,nf.format(n)));b.dataset.cat=k;bar.append(b);
  });
}
function renderProducts(){
  const q=$('search').value.trim().toLocaleLowerCase('fa'),s=$('sort').value;
  let l=products.filter(p=>(category==='all'||p.category===category)&&(p.name+p.desc).toLocaleLowerCase('fa').includes(q));
  if(s==='asc')l.sort((a,b)=>a.price-b.price);if(s==='desc')l.sort((a,b)=>b.price-a.price);if(s==='disc')l.sort((a,b)=>off(b)-off(a));
  $('grid').replaceChildren(...(l.length?l.map(card):[el('div','empty','محصولی پیدا نشد. عبارت دیگری را جست‌وجو کنید.')]));
}
$('cats').addEventListener('click',e=>{const b=e.target.closest('[data-cat]');if(!b)return;category=b.dataset.cat;renderCats();renderProducts()});
$('search').addEventListener('input',renderProducts);$('sort').addEventListener('change',renderProducts);
$('grid').addEventListener('click',e=>{const a=e.target.closest('[data-add]');if(a)addItem(+a.dataset.add)});

/* ---- routing: #p3 opens product 3 ---- */
let pdpSpin;
function route(){
  const m=/^#p(\d+)$/.exec(location.hash),p=m&&products.find(x=>x.id===+m[1]);const co=location.hash==='#checkout';
  $('listView').classList.toggle('hide',!!p||co);$('productView').classList.toggle('hide',!p);$('checkoutView').classList.toggle('hide',!co);
  if(pdpSpin){kill(pdpSpin);pdpSpin=null}
  if(!p){document.title=co?'تکمیل سفارش | NOIR':'NOIR | فروشگاه گجت';current=null;if(co){window.scrollTo(0,0);renderCheckout()}return}
  current=p;window.scrollTo(0,0);document.title=p.name+' | NOIR';
  $('pdp').style.setProperty('--a',p.c);$('pdpView').style.setProperty('--a',p.c);
  $('crumbName').textContent=p.name;$('pCat').textContent=CATS[p.category];$('pName').textContent=p.name;$('pDesc').textContent=p.desc;
  $('pPrice').textContent=fmt(p.price);$('pOld').textContent=p.old?fmt(p.old):'';
  $('pSpecs').replaceChildren(...p.s.map(([a,b])=>{const li=el('li');li.append(el('span',null,a),el('b',null,b));return li}));
  pdpSpin=spin($('pdpView'),p,{n:12,gap:6,auto:.4});
  const ph=$('pPhoto'),seg=$('pSeg');ph.replaceChildren();seg.hidden=true;setView('3d');ph.append(artNode(p,()=>{seg.hidden=false;setView('img')}));
  $('related').replaceChildren(...products.filter(x=>x.id!==p.id&&x.category===p.category||x.id!==p.id).slice(0,3).map(card));
}
addEventListener('hashchange',route);
$('pAdd').addEventListener('click',()=>current&&addItem(current.id));
$('glbBtn').addEventListener('click',()=>$('glbIn').click());
$('glbIn').addEventListener('change',e=>{const f=e.target.files[0];if(f){if(pdpSpin&&pdpSpin.load)pdpSpin.load(f);else toast('نمایش سه‌بعدی در این مرورگر فعال نیست')}e.target.value=''});
$('related').addEventListener('click',e=>{const a=e.target.closest('[data-add]');if(a)addItem(+a.dataset.add)});

/* ---- cart ---- */
function addItem(id){cart.set(id,(cart.get(id)||0)+1);renderCart();const c=$('count');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump');toast('به سبد خرید اضافه شد')}
function totals(){const sub=[...cart].reduce((s,[i,q])=>s+products.find(p=>p.id===i).price*q,0),d=coupon?sub*CODES[coupon]:0;return{sub,d,t:sub-d}}
function renderCart(){
  $('count').textContent=nf.format([...cart.values()].reduce((a,b)=>a+b,0));
  const box=$('cartItems');box.replaceChildren();
  if(!cart.size)box.append(el('p','muted','سبد خرید خالی است. از بخش محصولات چیزی اضافه کنید.'));
  cart.forEach((qty,id)=>{
    const p=products.find(x=>x.id===id),row=el('div','cart-row'),info=el('div','cart-info'),q=el('div','qty');
    info.append(el('strong',null,p.name),el('small',null,fmt(p.price)));
    const inc=el('button',null,'+',{'aria-label':'افزایش تعداد'}),dec=el('button',null,'−',{'aria-label':'کاهش تعداد'}),rm=el('button','remove','حذف');
    inc.dataset.inc=id;dec.dataset.dec=id;rm.dataset.remove=id;
    q.append(inc,el('span',null,nf.format(qty)),dec);row.append(info,q,rm);box.append(row);
  });
  const t=totals();$('subTotal').textContent=fmt(t.sub);$('discount').textContent=t.d?'− '+fmt(t.d):'—';$('cartTotal').textContent=fmt(t.t);
  $('shipBar').style.width=Math.min(100,t.t/FREE*100)+'%';
  $('shipText').textContent=t.t>=FREE?'ارسال سفارش شما رایگان است.':(cart.size?fmt(FREE-t.t)+' تا ارسال رایگان':'');save();
}
function applyCode(c){c=(c||'').trim().toUpperCase();const m=$('codeMsg');
  if(CODES[c]){coupon=c;m.style.color='var(--cyan)';m.textContent='کد '+c+' اعمال شد.';return true}
  m.style.color='var(--danger)';m.textContent='این کد معتبر نیست. کد را دوباره بررسی کنید.';return false}
$('applyCode').addEventListener('click',()=>{applyCode($('code').value);renderCart()});
$('heroCode').addEventListener('click',()=>{applyCode('NOIR10');renderCart();toast('کد NOIR10 فعال شد')});
$('cartItems').addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const id=+(b.dataset.inc||b.dataset.dec||b.dataset.remove);
  if(b.dataset.inc)cart.set(id,(cart.get(id)||0)+1);
  if(b.dataset.dec){const n=(cart.get(id)||0)-1;n<=0?cart.delete(id):cart.set(id,n)}
  if(b.dataset.remove)cart.delete(id);renderCart()});
const O=$('cartOverlay');
const openCart=()=>{lastFocus=document.activeElement;renderCart();O.classList.add('open');$('closeCart').focus()};
const closeCart=()=>{O.classList.remove('open');lastFocus&&lastFocus.focus&&lastFocus.focus()};
$('openCart').addEventListener('click',openCart);$('closeCart').addEventListener('click',closeCart);
O.addEventListener('click',e=>{if(e.target===O)closeCart()});
addEventListener('keydown',e=>{if(e.key==='Escape'&&O.classList.contains('open'))closeCart()});
$('demoCheckout').addEventListener('click',()=>{if(!cart.size){toast('سبد خرید خالی است');return}closeCart();location.hash='#checkout'});
/* ---- Mirror Hall v2: starry sky + rippling water ---- */
(function(){
  const scene=$('mhScene'),ring=$('mhRing'),ring2=$('mhRing2'),sky=$('mhSky'),rip=$('mhRip'),disp=$('mhDisp');
  const sx=sky.getContext('2d'),rx=rip.getContext('2d');
  const list=products.concat(products),N=list.length,P6=products.length,step=360/N,cards=[],refs=[];
  const hex=c=>{const n=parseInt(c.slice(1),16);return (n>>16)+','+((n>>8)&255)+','+(n&255)};
  if(RM)scene.classList.add('rm');
  list.forEach((p,i)=>{
    const mk=m=>{
      const c=el('div','mh-card'+(m?' mir':'')),b=el('div','mh-bob'),f=el('div','mh-face');
      c.style.setProperty('--a',p.c);
      c.style.transform='rotateY('+i*step+'deg) translateZ(var(--R))'+(m?' scaleY(-1)':'');
      b.style.setProperty('--bd',(5+(i*1.7)%3.5)+'s');b.style.setProperty('--bl',(-((i*1.3)%5))+'s');b.style.setProperty('--br',((i%2?1:-1)*(.6+(i%3)*.3))+'deg');
      f.append(artNode(p));
      b.append(f);if(!m)b.append(el('div','mh-label',p.name));c.append(b);return c};
    const c=mk(false),r=mk(true);ring.append(c);ring2.append(r);cards.push(c);refs.push(r);
    c.addEventListener('click',()=>{if(moved>6)return;if(i===front)location.hash='#p'+p.id;else snap(i)});
  });
  products.forEach((p,k)=>{const b=el('button',null,null,{'aria-label':p.name});
    b.addEventListener('click',()=>{let bi=k,bd=999;for(let i=k;i<N;i+=P6){const a=Math.abs((((i*step+ang)%360)+540)%360-180);if(a<bd){bd=a;bi=i}}snap(bi)});$('mhDots').append(b)});
  let ang=0,vel=0,drag=false,x0=0,moved=0,vis=false,running=false,front=-1,target=null,last=0;
  let W=0,H=0,stars=[],mx=.5,my=.5,mt=0,mouse={x:-999,y:-999,in:false},ripples=[],shoot=null,stir=0,nextDrop=0,rgb=hex(products[0].c),lastScale=7;
  function resize(){
    const r=scene.getBoundingClientRect(),d=Math.min(devicePixelRatio||1,2);W=r.width;H=r.height;if(!W)return;
    [sky,rip].forEach(c=>{c.width=W*d;c.height=H*d;c.getContext('2d').setTransform(d,0,0,d,0,0)});
    stars=Array.from({length:Math.round(W*H/2600)},()=>({x:Math.random(),y:Math.random()*.6,z:Math.random(),p:Math.random()*6.28,s:.4+Math.random()*1.4}));
    const w=cards[0].offsetWidth;if(w)scene.style.setProperty('--R',Math.round(w/2/Math.tan(Math.PI/N)+w*.55)+'px');
  }
  function snap(i){const want=-i*step;target=ang+(((want-ang)%360)+540)%360-180;last=performance.now()}
  function nudge(d){target=Math.round((target==null?ang:target)/step)*step+d*step;last=performance.now()}
  function drawSky(t){
    sx.clearRect(0,0,W,H);const hz=H*.6,ox=(mx-.5)*-26,oy=(my-.5)*-10;
    for(const s of stars){
      const px=s.x*W+ox*s.z,py=s.y*H+oy*s.z,near=mouse.in?Math.max(0,1-Math.hypot(px-mouse.x,py-mouse.y)/120):0;
      const tw=.35+.65*Math.abs(Math.sin(t*.0012*s.s+s.p)),a=Math.min(1,tw*(.5+s.z*.6)+near*.7),r=(.4+s.z*1.2)*(1+near*1.8);
      sx.fillStyle='rgba('+(s.z>.8?'190,215,255':'255,255,255')+','+a+')';
      sx.beginPath();sx.arc(px,py,r,0,6.283);sx.fill();
      const ry=2*hz-py;if(ry<H){sx.fillStyle='rgba(200,220,255,'+a*.28+')';sx.beginPath();sx.arc(px+Math.sin(t*.002+py*.06)*3,ry,r*.8,0,6.283);sx.fill()}
    }
    if(!RM&&!shoot&&Math.random()<.002)shoot={x:Math.random()*W*.7,y:Math.random()*hz*.5,l:0};
    if(shoot){shoot.l++;shoot.x+=9;shoot.y+=3.6;const al=1-shoot.l/40;
      const g=sx.createLinearGradient(shoot.x,shoot.y,shoot.x-70,shoot.y-28);g.addColorStop(0,'rgba(255,255,255,'+al+')');g.addColorStop(1,'rgba(255,255,255,0)');
      sx.strokeStyle=g;sx.lineWidth=1.6;sx.beginPath();sx.moveTo(shoot.x,shoot.y);sx.lineTo(shoot.x-70,shoot.y-28);sx.stroke();if(shoot.l>40)shoot=null}
  }
  function drawRip(){
    rx.clearRect(0,0,W,H);const now=performance.now();
    if(!RM&&now>nextDrop){nextDrop=now+1200+Math.random()*1800;ripples.push({x:W*(.1+Math.random()*.8),y:H*(.66+Math.random()*.28),t:now,a:.25})}
    ripples=ripples.filter(r=>now-r.t<1600);
    for(const r of ripples){const k=(now-r.t)/1600,rad=10+k*130,al=r.a*(1-k)*(1-k);
      rx.lineWidth=1.5;rx.strokeStyle='rgba('+rgb+','+al+')';rx.beginPath();rx.ellipse(r.x,r.y,rad,rad*.24,0,0,6.283);rx.stroke();
      if(k>.15){rx.strokeStyle='rgba(255,255,255,'+al*.5+')';rx.beginPath();rx.ellipse(r.x,r.y,rad*.6,rad*.6*.24,0,0,6.283);rx.stroke()}}
  }
  function frame(t){
    const now=performance.now();
    if(!drag){
      if(target!=null){ang+=(target-ang)*.12;vel=0;if(Math.abs(target-ang)<.05){ang=target;target=null}}
      else{ang+=vel;vel*=.95;if(Math.abs(vel)<.02)vel=0;if(!RM&&vel===0&&now-last>2500)ang+=.06}
    }
    const tf='rotateY('+ang+'deg)';ring.style.transform=tf;ring2.style.transform=tf;
    let best=0,bd=999;
    for(let i=0;i<N;i++){
      const a=(((i*step+ang)%360)+540)%360-180,o=.25+.75*Math.max(0,Math.cos(a*Math.PI/180));
      cards[i].style.opacity=o;refs[i].style.opacity=o*.55;if(Math.abs(a)<bd){bd=Math.abs(a);best=i}
    }
    if(best!==front){front=best;const p=list[best];rgb=hex(p.c);scene.style.setProperty('--g',p.c);
      $('mhName').textContent=p.name;$('mhPrice').textContent=fmt(p.price);$('mhCount').textContent=nf.format(best%P6+1)+' / '+nf.format(P6);
      [...$('mhDots').children].forEach((d,k)=>d.classList.toggle('on',k===best%P6))}
    stir*=.94;const sc=7+stir*24;if(Math.abs(sc-lastScale)>.4){lastScale=sc;disp.setAttribute('scale',sc.toFixed(1))}
    if(W){drawSky(t);drawRip()}
  }
  function loop(t){if(!vis){running=false;return}frame(t);requestAnimationFrame(loop)}
  new IntersectionObserver(es=>{vis=es[0].isIntersecting;if(vis){resize();if(!running){running=true;requestAnimationFrame(loop)}}}).observe(scene);
  addEventListener('resize',resize);
  scene.addEventListener('pointermove',e=>{
    const r=scene.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top,now=performance.now(),v=Math.hypot(x-mouse.x,y-mouse.y)/Math.max(8,now-mt);
    mt=now;mouse.x=x;mouse.y=y;mouse.in=true;mx=x/(W||1);my=y/(H||1);stir=Math.min(1,stir+Math.min(v,3)*.12);
    scene.style.setProperty('--px',(50+(mx-.5)*14)+'%');scene.style.setProperty('--py',(30+(my-.5)*10)+'%');
    if(!RM&&y>H*.6&&(!ripples.length||now-ripples[ripples.length-1].t>80))ripples.push({x,y,t:now,a:.45+Math.min(.35,v*.2)});
  });
  scene.addEventListener('pointerleave',()=>mouse.in=false);
  function mv(e){const dx=e.clientX-x0;x0=e.clientX;moved+=Math.abs(dx);ang+=dx*.4;vel=dx*.4;last=performance.now()}
  function up(){drag=false;removeEventListener('pointermove',mv);removeEventListener('pointerup',up);removeEventListener('pointercancel',up)}
  scene.addEventListener('pointerdown',e=>{drag=true;target=null;x0=e.clientX;moved=0;vel=0;last=performance.now();addEventListener('pointermove',mv);addEventListener('pointerup',up);addEventListener('pointercancel',up)});
  $('mhPrev').addEventListener('click',()=>nudge(1));$('mhNext').addEventListener('click',()=>nudge(-1));
  scene.addEventListener('keydown',e=>{if(e.key==='ArrowRight')nudge(1);else if(e.key==='ArrowLeft')nudge(-1);else if(e.key==='Enter'&&front>-1)location.hash='#p'+list[front].id});
})();
/* ---- product photo helper: images/p1.webp|png|jpg, falls back to SVG art ---- */
/* ---- checkout ---- */
const SHOP={wa:''}; // واتساپ فروشگاه، مثلاً '989121234567' (بدون + و صفر اول)
const SHIP_FEE=150000;
const toEn=s=>String(s).replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d));
const RULES={
  coName:[v=>v.trim().length>=3,'نام و نام خانوادگی را کامل وارد کنید.'],
  coPhone:[v=>/^09\d{9}$/.test(toEn(v).trim()),'شمارهٔ موبایل باید ۱۱ رقم و مثل ۰۹۱۲۳۴۵۶۷۸۹ باشد.'],
  coCity:[v=>v.trim().length>=2,'نام شهر را وارد کنید.'],
  coPostal:[v=>/^\d{10}$/.test(toEn(v).trim()),'کد پستی باید ۱۰ رقم باشد.'],
  coAddr:[v=>v.trim().length>=10,'نشانی را کامل‌تر بنویسید (خیابان، پلاک، واحد).']
};
function fieldCheck(id){const f=$(id),good=RULES[id][0](f.value);f.parentNode.classList.toggle('err',!good);f.parentNode.querySelector('small').textContent=good?'':RULES[id][1];f.setAttribute('aria-invalid',String(!good));return good}
function renderCheckout(){
  const empty=!cart.size;$('coDone').classList.add('hide');$('coWrap').classList.toggle('hide',empty);$('coEmpty').classList.toggle('hide',!empty);
  const t=totals(),ship=(t.t>=FREE||empty)?0:SHIP_FEE,box=$('coSum');box.replaceChildren(el('h3',null,'خلاصهٔ سفارش'));
  const row=(a,b,c)=>{const r=el('div','sum'+(c?' total':''));r.append(el('span',null,a),el('span',null,b));box.append(r)};
  cart.forEach((q,id)=>{const p=products.find(x=>x.id===id);row(p.name+' × '+nf.format(q),fmt(p.price*q))});
  row('جمع کالاها',fmt(t.sub));if(t.d)row('تخفیف','− '+fmt(t.d));row('هزینهٔ ارسال',ship?fmt(ship):'رایگان');row('مبلغ نهایی',fmt(t.t+ship),1);
}
$('coForm').addEventListener('submit',e=>{
  e.preventDefault();
  const bad=Object.keys(RULES).filter(id=>!fieldCheck(id));
  if(bad.length){$(bad[0]).focus();return}
  const t=totals(),ship=t.t>=FREE?0:SHIP_FEE,code='NOIR-'+Math.floor(100000+Math.random()*900000);
  const pay=document.querySelector('input[name=pay]:checked').value;
  const lines=[...cart].map(([id,q])=>'• '+products.find(x=>x.id===id).name+' × '+q);
  const msg=['سفارش '+code,...lines,'مبلغ نهایی: '+fmt(t.t+ship),'پرداخت: '+(pay==='cod'?'در محل':'آنلاین'),'نام: '+$('coName').value.trim(),'موبایل: '+toEn($('coPhone').value).trim(),'نشانی: '+$('coCity').value.trim()+'، '+$('coAddr').value.trim()+' (کدپستی '+toEn($('coPostal').value).trim()+')'].join('\n');
  const d=$('coDone');d.replaceChildren(el('h2',null,'سفارش شما ثبت شد (نمایشی)'),el('p','muted','کد پیگیری: '+code+' — این نسخه بک‌اند ندارد و سفارش یا پرداختی واقعاً ثبت نشده است.'));
  if(SHOP.wa)d.append(el('a','btn primary','ارسال سفارش در واتساپ',{href:'https://wa.me/'+SHOP.wa+'?text='+encodeURIComponent(msg),target:'_blank',rel:'noopener'}));
  d.append(el('a','btn','بازگشت به فروشگاه',{href:'#home'}));
  $('coWrap').classList.add('hide');d.classList.remove('hide');cart.clear();coupon=null;renderCart();window.scrollTo(0,0);
});
Object.keys(RULES).forEach(id=>$(id).addEventListener('blur',()=>fieldCheck(id)));
function setView(v){const on=v==='img';$('pPhoto').classList.toggle('hide',!on);$('pdpView').classList.toggle('photo-on',on);
  if(pdpSpin)pdpSpin.obj.parentNode.style.display=on?'none':'';
  document.querySelectorAll('#pSeg button').forEach(b=>b.classList.toggle('on',b.dataset.v===v))}
$('pSeg').addEventListener('click',e=>{const b=e.target.closest('button');if(b)setView(b.dataset.v)});
renderCats();renderProducts();renderCart();route();
