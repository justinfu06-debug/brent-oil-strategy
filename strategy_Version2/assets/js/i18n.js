// 简单的i18n实现：自动检测或?lang=切换，可直接用于所有页面
window.__ = function(key, fallback=''){
  return (window._i18nDict && window._i18nDict[key]) || fallback || key;
};
function setLocale(lang) {
  let url = `/locales/${lang}.json`;
  fetch(url).then(r=>r.json()).then(dict=>{
    window._i18nDict = dict;
    document.querySelectorAll('[data-i18n]').forEach(el=>{
      let val = __(el.dataset.i18n,el.dataset.i18nFallback||'');
      if(el.tagName==='INPUT' || el.tagName==='TEXTAREA'){
        el.placeholder = val;
      }else{
        el.innerHTML = val;
      }
    });
    document.title = __(document.body.dataset.i18nTitle || 'hero.title');
  });
}
function getLang() {
  let qs = new URLSearchParams(window.location.search);
  if(qs.has('lang')) return qs.get('lang');
  let lang = navigator.language || navigator.userLanguage;
  return (/en/i.test(lang))?"en-US":"zh-CN";
}
// 页面初始加载
window.addEventListener('DOMContentLoaded',()=>setLocale(getLang()));
// 可选：页面增加语言切换按钮
window.switchLang = function(lang){setLocale(lang);}