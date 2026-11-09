'use strict';
// Curated photography for Australia/Colombia. The images below stay visible offline
// thanks to their local SVG source. Load only explicitly credited Wikimedia files;
// NEVER search arbitrary pictures that may show unrelated people.
(() => {
  const cards=Array.from(document.querySelectorAll('img[data-commons-title]'));
  if(!cards.length) return;
  const key=(v)=>v.replace(/^File:/i,'').replace(/_/g,' ').trim().toLowerCase();
  const names=[...new Set(cards.map(img=>img.dataset.commonsTitle))];
  const endpoint='https://commons.wikimedia.org/w/api.php';
  const params=new URLSearchParams({
    action:'query',format:'json',origin:'*',titles:names.map(n=>'File:'+n).join('|'),
    prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'850'
  });
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),9500);
  fetch(endpoint+'?'+params,{signal:controller.signal})
    .then(res=>{if(!res.ok)throw new Error('Commons API unavailable');return res.json()})
    .then(data=>{
      const found=new Map();
      Object.values(data.query?.pages||{}).forEach(p=>{
        const item=p.imageinfo?.[0];
        if(item?.thumburl && /^image\/(jpeg|png|webp)$/i.test(item.mime||'')) found.set(key(p.title),item.thumburl);
      });
      cards.forEach(img=>{
        const photo=found.get(key(img.dataset.commonsTitle));
        if(!photo)return;
        // Keep SVG illustration visible until the actual image has loaded.
        const preloader=new Image();
        preloader.onload=()=>{img.src=photo;img.dataset.imageStatus='photo'};
        preloader.onerror=()=>{};
        preloader.src=photo;
      });
    })
    .catch(()=>{/* original SVG remains visible */})
    .finally(()=>clearTimeout(timeout));
})();
