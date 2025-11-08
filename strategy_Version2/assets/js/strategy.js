// 模拟基础数据与策略，参数变化时重新“演示回测曲线”
function randomSeries(n, base = 63) {
  let arr = [], v = base;
  for (let i = 0; i < n; i++) { v += (Math.random()-0.48)*0.6; arr.push(Number(v.toFixed(2))); }
  return arr;
}
let prices = randomSeries(80, 63);
let dates = Array.from({length:80}, (_,i)=>`2025-10-${(i+1).toString().padStart(2,'0')}`);
// 简单信号生成，仅作演示
function calcSignal(prices, emaN, rsiN, macdN) {
  const signals = [];
  let profit = [0];
  for(let i=emaN;i<prices.length;i++){
    let ema = prices.slice(i-emaN,i).reduce((a,b)=>a+b,0) / emaN;
    let rsi = Math.abs(prices[i]-prices[i-1])>0.15 ? 70 : 30;
    let macd = (i%macdN)<(macdN/2)?1:-1;
    let sig = (prices[i]>ema && rsi>50 && macd>0) ? 1 : (prices[i]<ema && rsi<50 && macd<0)?-1:0;
    signals.push(sig);
    profit.push(profit[profit.length-1]+sig*(Math.random()-0.4)*2);
  }
  return {signals,profit};
}
function renderStrategyChart() {
  let ema = +document.getElementById('ema-val').value;
  let rsi = +document.getElementById('rsi-val').value;
  let macd = +document.getElementById('macd-val').value;
  let {signals, profit} = calcSignal(prices, ema, rsi, macd);
  const chart = echarts.init(document.getElementById('strategy-chart'));
  chart.setOption({
    tooltip:{trigger:'axis'},
    legend:{data:['Brent价格','信号','累计收益'],top:8,textStyle:{color:'#f8ca5e'}},
    grid:{left:'9%',top:38,right:18,bottom:38},
    xAxis:{type:'category',data:dates.slice(ema),axisLabel:{color:'#ccc'}},
    yAxis:[{type:'value',axisLabel:{color:'#ddd'}, name:'价格/收益'}],
    series:[
      {name:'Brent价格',type:'line',data:prices.slice(ema),itemStyle:{color:'#f4d150'},smooth:true},
      {name:'信号',type:'bar',data:signals.map(s=>s*5),barWidth:8,itemStyle:{color:'#ab8cfa'}},
      {name:'累计收益',type:'line',data:profit,itemStyle:{color:'#f44'},yAxisIndex:0,smooth:true}
    ]
  });
  window.addEventListener('resize',()=>chart.resize());
}
document.addEventListener('DOMContentLoaded',()=>{
  ['ema-val','rsi-val','macd-val'].forEach(id=>{
    document.getElementById(id).oninput = ()=>{document.getElementById(id.replace('-val','-show')).textContent=document.getElementById(id).value;renderStrategyChart();};
  });
  renderStrategyChart();
});