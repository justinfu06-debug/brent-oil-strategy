function createProfit(period,model){
  let arr=[0], val=0;
  for(let i=0;i<+period;i++){
    let x = model==='trend'?(Math.random()-0.46)*2.2:(Math.random()-0.5)*1.1;
    val += x; arr.push(Number(val.toFixed(2)));
  }
  return arr;
}
document.addEventListener('DOMContentLoaded',()=>{
  function rerender(){
    let period = document.getElementById('bt-period').value;
    let model = document.getElementById('bt-model').value;
    let profit = createProfit(period,model);
    let xaxis = Array.from({length:profit.length},(_,i)=>`T${i}`);
    const chart = echarts.init(document.getElementById('backtest-chart'));
    chart.setOption({
      grid:{left:'7%',right:'8%',bottom:36,top:33},
      tooltip:{trigger:'axis'},
      xAxis:{type:'category',data:xaxis,axisLabel:{color:'#aaa'}},
      yAxis:{type:'value',axisLabel:{color:'#ddd'}},
      series:[{type:'line',data:profit,areaStyle:{},lineStyle:{color:'#fabd4a',width:3}}],
    });
    let mx = Math.max(...profit), mn = Math.min(...profit), last = profit[profit.length-1];
    document.getElementById('backtest-summary').innerHTML =
      `<b class="text-yellow-300">最大收益：</b>${mx.toFixed(2)} | <b class="text-cyan-300">最大回撤：</b>${(mn<0?mn:0).toFixed(2)} <br>
      <b class="text-lime-400">最终收益：</b>${last.toFixed(2)}`;
  }
  document.getElementById('bt-period').onchange = rerender;
  document.getElementById('bt-model').onchange = rerender;
  rerender();
});