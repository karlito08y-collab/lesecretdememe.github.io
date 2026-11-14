const recipes=[
{id:1,title:"Poulet yassa",category:"plat",time:"45 min",level:"Facile",emoji:"🍗",description:"Poulet mariné, oignons doux et riz parfumé.",ingredients:["1 kg de poulet","4 oignons","2 citrons","3 c. à soupe d'huile","Riz","Sel, poivre, ail"],steps:["Mariner le poulet avec citron, ail, sel et poivre.","Faire revenir les oignons dans l'huile.","Ajouter le poulet et laisser mijoter 30 minutes.","Servir avec du riz chaud."]},
{id:2,title:"Salade de mangue",category:"entree",time:"10 min",level:"Très facile",emoji:"🥗",description:"Salade fraîche, sucrée et légère.",ingredients:["2 mangues","1 concombre","1 citron vert","Menthe fraîche","Une pincée de sel"],steps:["Couper la mangue et le concombre en dés.","Ajouter le citron vert, la menthe et le sel.","Mélanger et servir frais."]},
{id:3,title:"Beignets sucrés",category:"dessert",time:"30 min",level:"Facile",emoji:"🍩",description:"Beignets moelleux, parfaits pour le goûter.",ingredients:["250 g de farine","50 g de sucre","1 œuf","1 sachet de levure","Lait","Huile pour friture"],steps:["Mélanger farine, sucre, levure, œuf et lait.","Former des petites boules.","Faire chauffer l'huile.","Frire jusqu'à coloration dorée.","Saupoudrer de sucre."]},
{id:4,title:"Jus de bissap",category:"boisson",time:"20 min",level:"Très facile",emoji:"🍹",description:"Boisson rouge rafraîchissante à base d'hibiscus.",ingredients:["100 g de fleurs d'hibiscus","1 litre d'eau","Menthe","Gingembre","Sucre ou miel"],steps:["Faire bouillir l'eau avec l'hibiscus et le gingembre.","Laisser infuser 15 minutes.","Filtrer, sucrer et laisser refroidir.","Servir avec de la menthe et des glaçons."]},
{id:5,title:"Riz au poisson",category:"plat",time:"50 min",level:"Moyen",emoji:"🍚",description:"Riz savoureux accompagné de poisson et légumes.",ingredients:["Riz","Poisson","Tomates","Oignons","Carottes","Huile","Épices"],steps:["Faire revenir oignons, tomates et épices.","Ajouter le poisson et un peu d'eau.","Ajouter le riz et les légumes.","Couvrir et laisser cuire jusqu'à ce que le riz soit tendre."]},
{id:6,title:"Porridge banane",category:"dessert",time:"15 min",level:"Très facile",emoji:"🥣",description:"Petit-déjeuner crémeux à la banane et au miel.",ingredients:["2 bananes","200 ml de lait","Flocons d'avoine","Miel","Cannelle"],steps:["Écraser les bananes.","Faire chauffer le lait avec l'avoine.","Ajouter les bananes, le miel et la cannelle.","Servir chaud."]}
];
const grid=document.getElementById('recipes');
const search=document.getElementById('search');
const modal=document.getElementById('modal');
const modalContent=document.getElementById('modal-content');
let activeCat='toutes';
function render(){
const q=(search.value||'').toLowerCase();
const list=recipes.filter(r=>(activeCat==='toutes'||r.category===activeCat)&&(r.title.toLowerCase().includes(q)||r.description.toLowerCase().includes(q)));
grid.innerHTML=list.map(r=>`<article class="card" data-id="${r.id}"><div class="img">${r.emoji}</div><div class="card-body"><span class="tag">${r.category}</span><h3>${r.title}</h3><p>${r.description}</p><div class="meta"><span>⏱ ${r.time}</span><span>📊 ${r.level}</span></div></div></article>`).join('')||'<p>Aucune recette trouvée.</p>';
}
document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));b.classList.add('active');activeCat=b.dataset.cat;render();}));
search.addEventListener('input',render);
grid.addEventListener('click',e=>{const card=e.target.closest('.card');if(!card)return;const r=recipes.find(x=>x.id==card.dataset.id);modalContent.innerHTML=`<span class="tag">${r.category}</span><h2>${r.emoji} ${r.title}</h2><p>${r.description}</p><h3>Ingrédients</h3><ul>${r.ingredients.map(i=>`<li>${i}</li>`).join('')}</ul><h3>Étapes</h3><ol>${r.steps.map(s=>`<li>${s}</li>`).join('')}</ol>`;modal.classList.add('open');});
document.getElementById('close').onclick=()=>modal.classList.remove('open');
modal.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('open')});
if('serviceWorker' in navigator){navigator.serviceWorker.register('sw.js')}
render();
