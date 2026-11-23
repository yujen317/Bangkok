(function(){
  var mob=matchMedia('(max-width:599px)').matches;
  var here=location.pathname.split('/').pop()||'index.html', isIdx=(here==='index.html'||here==='');
  // 底部分頁列
  var tabs=[['📅','行程','days'],['🗺️','地圖','map'],['🍜','美食','food.html'],['🧰','工具','tools'],['🆘','緊急','sos']];
  var nav=document.createElement('nav');nav.className='btab';
  nav.innerHTML=tabs.map(function(t){var h=t[2].indexOf('.html')>-1?t[2]:(isIdx?'#'+t[2]:'./#'+t[2]);
    var on=(t[2]===here)?' class="on"':'';return '<a href="'+h+'"'+on+'><span>'+t[0]+'</span>'+t[1]+'</a>'}).join('');
  document.body.appendChild(nav);
  if(!mob)return;
  // 表格轉卡片
  document.querySelectorAll('table').forEach(function(tb){
    var rows=tb.querySelectorAll('tr');if(!rows.length)return;
    var hr=rows[0];var ths=hr.querySelectorAll('th');if(ths.length===3){var tl=0;for(var r=1;r<rows.length;r++)tl+=rows[r].textContent.trim().length;if(tl/Math.max(1,rows.length-1)<70){tb.classList.add('m3');return}}if(ths.length<3)return;
    var labels=[].map.call(ths,function(t){return t.textContent.trim()});
    hr.classList.add('mh');tb.classList.add('mcard');
    for(var i=1;i<rows.length;i++){[].forEach.call(rows[i].children,function(td,j){if(labels[j])td.setAttribute('data-l',labels[j])})}
  });
  // 美食等分頁：details 只留第一個展開
  var ds=document.querySelectorAll('.wrap > details[open], section > details[open]');
  if(!isIdx){var keep=document.getElementById('foodmap')?'foodmap':null;[].forEach.call(ds,function(d,i){if(keep?d.id!==keep:i>0)d.removeAttribute('open')})}
  // 次要區塊收合
  var key='bkk27_fold_'+here;var st={};try{st=JSON.parse(localStorage.getItem(key)||'{}')}catch(e){}
  ['free','shop','tips','train','hotel'].forEach(function(id){
    var s=document.getElementById(id);if(!s||s.tagName!=='SECTION')return;
    var h=s.querySelector('h2');if(!h)return;
    s.classList.add('fold');if(st[id]!==0)s.classList.add('shut');
    var fx=document.createElement('span');fx.className='fx';h.appendChild(fx);
    var upd=function(){fx.textContent=s.classList.contains('shut')?'展開 ▾':'收合 ▴'};upd();
    h.addEventListener('click',function(){s.classList.toggle('shut');st[id]=s.classList.contains('shut')?1:0;try{localStorage.setItem(key,JSON.stringify(st))}catch(e){}upd()});
  });
  // 從導覽列跳到收合的區塊時自動展開
  function openHash(){var id=location.hash.slice(1);var s=id&&document.getElementById(id);if(s&&s.tagName==='DETAILS'){s.open=true;return}if(s&&s.classList.contains('shut')){s.classList.remove('shut');var fx=s.querySelector('.fx');if(fx)fx.textContent='收合 ▴'}}
  addEventListener('hashchange',openHash);openHash();
})();
