const body=document.body;
const menu=document.querySelector('.menu-toggle');
const drawer=document.querySelector('.top-drawer');
function setMenu(open){body.classList.toggle('menu-open',open);menu?.setAttribute('aria-expanded',String(open));drawer?.setAttribute('aria-hidden',String(!open))}
menu?.addEventListener('click',()=>setMenu(!body.classList.contains('menu-open')));
drawer?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
body.classList.add('motion-ready');
const sections=[...document.querySelectorAll('main > section,.long-article > section')];
sections.forEach(section=>section.classList.add('motion-section'));
if(!reduceMotion&&'IntersectionObserver'in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.07,rootMargin:'0px 0px -4%'});
 sections.forEach(section=>observer.observe(section));
}else sections.forEach(section=>section.classList.add('in-view'));

const swatches={
 grain:{code:'LCW / FG-01',title:'Full-grain hide',copy:'Dense surface character, visible grain variation and a finish that can record use over time.',hand:'Structured',use:'Bags and cases'},
 veg:{code:'LCW / VT-02',title:'Vegetable-tanned',copy:'A responsive material often selected where form, edge work and gradual surface change matter.',hand:'Firm to medium',use:'Cases and small goods'},
 suede:{code:'LCW / SD-03',title:'Suede surface',copy:'An open, tactile nap that needs careful placement, colour-transfer awareness and gentle care.',hand:'Soft',use:'Linings and protected panels'},
 wax:{code:'LCW / WX-04',title:'Waxed finish',copy:'A dark, matte-to-satin surface where flexing can reveal tonal movement and handling marks.',hand:'Supple',use:'Travel and outdoor forms'}
};
const display=document.querySelector('[data-swatch-display]');
document.querySelectorAll('[data-swatch]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-swatch]').forEach(item=>item.classList.remove('active'));button.classList.add('active');
 const key=button.dataset.swatch,data=swatches[key];if(!display||!data)return;display.dataset.swatchDisplay=key;
 const map={'[data-swatch-code]':data.code,'[data-swatch-title]':data.title,'[data-swatch-copy]':data.copy,'[data-swatch-hand]':data.hand,'[data-swatch-use]':data.use};
 Object.entries(map).forEach(([selector,value])=>{const node=display.querySelector(selector);if(node)node.textContent=value});
}));

const care={
 observe:['Inspect before applying anything','Look for dryness, transferred colour, loose stitching and hardware movement under clear light.'],
 clean:['Begin with dry surface dust','Use a suitable soft cloth or brush. Follow maker guidance before introducing moisture or a cleaner.'],
 condition:['Condition only when evidence supports it','Confirm the leather and finish, spot-test an approved product and use the smallest practical amount.'],
 store:['Support shape and allow airflow','Store clean and dry, away from direct heat and sunlight, without sealed plastic or sharp folds.']
};
document.querySelectorAll('[data-care]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-care]').forEach(item=>item.classList.remove('active'));button.classList.add('active');
 const data=care[button.dataset.care];const title=document.querySelector('[data-care-title]');const copy=document.querySelector('[data-care-copy]');if(title)title.textContent=data[0];if(copy)copy.textContent=data[1];
}));

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(item=>item.classList.remove('active'));button.classList.add('active');
 document.querySelectorAll('.collection-grid article').forEach(card=>{const visible=button.dataset.filter==='all'||card.dataset.cat===button.dataset.filter;card.classList.toggle('hide',!visible);card.classList.remove('filter-pop');if(visible)requestAnimationFrame(()=>card.classList.add('filter-pop'))});
}));

document.querySelector('.contact-workbench form')?.addEventListener('submit',event=>{event.preventDefault();const status=event.currentTarget.querySelector('.form-status');if(status)status.textContent='Your message is prepared. Leather Crafted Way will reply by email.';event.currentTarget.reset()});

const consent=document.querySelector('.consent');
if(localStorage.getItem('lcw-consent'))consent?.classList.add('hidden');
document.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{const analytics=button.dataset.consent==='accept'?'granted':'denied';if(typeof gtag==='function')gtag('consent','update',{analytics_storage:analytics,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});localStorage.setItem('lcw-consent',analytics);consent?.classList.add('hidden')}));
