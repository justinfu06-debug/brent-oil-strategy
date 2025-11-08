// 新闻数据、经济日历模拟
const news = [
  {time:"11-08 13:20",title:"EIA最新报告：美国原油库存意外增加",impact:"偏空",tags:["EIA","数据"],status:"down"},
  {time:"11-08 10:15",title:"OPEC秘书长：原油需求有望Q4回升",impact:"偏多",tags:["OPEC"],status:"up"},
  {time:"11-07 18:02",title:"API库存降幅高于预期，油价短线拉升",impact:"偏多",tags:["API"],status:"up"}
];
const econ = [
  {date:"11-09",event:"美国CPI公布",impact:"高"},
  {date:"11-12",event:"OPEC月度报告",impact:"中"}
];
document.addEventListener('DOMContentLoaded',()=>{
  // 模拟价格
  let price = 63.57 + (Math.random()-0.5)*2;
  document.getElementById('monitor-price').textContent = `$${price.toFixed(2)}`;
  // 新闻快讯和列表
  document.getElementById('news-flash').textContent = news[0].title;
  let nlist = document.getElementById('news-list');
  nlist.innerHTML = news.map(n=>`<li class="news-item"><span class="status-dot status-${n.status}"></span>
    <b>[${n.time}]</b> <span class="text-yellow-300">${n.title}</span>
    <span class="ml-4 text-gray-400">标签:${n.tags.join("、")}</span>
    </li>`).join('');
  // 经济日历
  document.getElementById('econ-next').textContent = `${econ[0].date} ${econ[0].event}（影响:${econ[0].impact}）`;
});