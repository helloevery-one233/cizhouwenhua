// 温度曲线模拟器
function TemperatureSimulator() {
  const [temp, setTemp] = React.useState(1250);
  const { calculateGlazeColor, getTempStage, getKilnEffect } = window.GlazeUtils;

  const stage = getTempStage(temp);
  const color = calculateGlazeColor({ fe: 1.5, cu: 0, co: 0, isReduction: true, temp });
  const effect = getKilnEffect({ fe: 1.5, temp, isReduction: true });

  const handleSlider = (e) => {
    setTemp(parseInt(e.target.value));
  };

  // ECharts 温度曲线图
  const chartRef = React.useRef(null);
  React.useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    // 传统馒头窑烧制曲线数据
    const timeLabels = ['0h', '2h', '4h', '6h', '8h', '10h', '12h', '14h', '16h', '18h', '20h', '22h', '24h'];
    const tempData = [25, 200, 400, 600, 800, 1000, 1150, 1250, 1280, 1300, 1250, 1000, 600];

    const option = {
      grid: { left: 50, right: 20, top: 20, bottom: 30 },
      xAxis: {
        type: 'category',
        data: timeLabels,
        axisLine: { lineStyle: { color: 'rgba(245,241,234,0.2)' } },
        axisLabel: { color: 'rgba(245,241,234,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono' }
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 1400,
        axisLine: { show: false },
        axisLabel: { color: 'rgba(245,241,234,0.4)', fontSize: 10, fontFamily: 'JetBrains Mono', formatter: '{value}℃' },
        splitLine: { lineStyle: { color: 'rgba(245,241,234,0.06)' } }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(26,22,19,0.9)',
        borderColor: 'rgba(192,72,42,0.3)',
        textStyle: { color: '#f5f1ea', fontSize: 12, fontFamily: 'JetBrains Mono' },
        formatter: (params) => `${params[0].name} · ${params[0].value}℃`
      },
      series: [{
        type: 'line',
        data: tempData,
        smooth: true,
        symbol: 'none',
        lineStyle: {
          color: '#c0482a',
          width: 2
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(192,72,42,0.3)' },
            { offset: 1, color: 'rgba(192,72,42,0.02)' }
          ])
        },
        markLine: {
          silent: true,
          symbol: 'none',
          lineStyle: { color: '#d4a853', type: 'dashed', width: 1 },
          label: {
            color: '#d4a853',
            fontSize: 10,
            fontFamily: 'JetBrains Mono',
            formatter: '烧成温度 1250℃'
          },
          data: [{ yAxis: 1250 }]
        }
      }]
    };

    chart.setOption(option);
    const ro = new ResizeObserver(() => chart.resize());
    ro.observe(chartRef.current);
    return () => { ro.disconnect(); chart.dispose(); };
  }, []);

  return React.createElement('section', { className: 'temp-section section', id: 'temperature' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '肆 · CHAPTER IV'),
      React.createElement('h2', { className: 'section-title' }, '窑火炼金'),
      React.createElement('p', { className: 'section-subtitle' }, 'ALCHEMY OF FIRE — TEMPERATURE SIMULATOR'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'simulator-wrap' },
      React.createElement('div', { className: 'reveal' },
        React.createElement('div', { className: 'tile-display' },
          React.createElement('div', {
            className: 'glaze-tile',
            style: {
              width: 280,
              height: 280,
              background: `
                radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.25) 0%, transparent 45%),
                ${color}
              `
            }
          },
            React.createElement('div', { className: 'tile-frame' })
          ),
          React.createElement('div', { className: 'tile-label' }, '当前釉色 · 青釉还原焰')
        )
      ),

      React.createElement('div', { className: 'temp-controls reveal' },
        React.createElement('div', { className: 'temp-display' },
          React.createElement('div', { className: 'temp-value' },
            temp,
            React.createElement('span', { className: 'unit' }, '℃')
          ),
          React.createElement('div', { className: 'temp-stage' }, stage.name)
        ),

        React.createElement('div', { className: 'temp-slider-wrap' },
          React.createElement('input', {
            type: 'range',
            min: '25',
            max: '1350',
            value: temp,
            onChange: handleSlider,
            className: 'temp-slider'
          }),
          React.createElement('div', { className: 'temp-marks' },
            React.createElement('span', null, '室温'),
            React.createElement('span', null, '600℃'),
            React.createElement('span', null, '1000℃'),
            React.createElement('span', null, '1250℃'),
            React.createElement('span', null, '1350℃')
          )
        ),

        React.createElement('div', { className: 'temp-stage-info' },
          React.createElement('div', { className: 'stage-title' }, '化学阶段'),
          React.createElement('div', { className: 'stage-desc' }, stage.desc)
        ),

        React.createElement('div', { className: 'temp-stage-info' },
          React.createElement('div', { className: 'stage-title' }, '窑变状态'),
          React.createElement('div', { className: 'stage-desc' },
            `釉面效果：${effect.name}`,
            React.createElement('br'),
            effect.type === 'none' ? '温度较低，釉料尚未充分熔融，无特殊窑变效果。' :
            effect.type === 'crystals' ? '高温下胎内矿物质自然沁溢，在釉面形成星点状结晶，即为"满天星"。' :
            effect.type === 'silver-sheen' ? '高温析出均匀银光与灰色结晶小点，形成柿红釉特有的金属光泽。' :
            '高铁釉在缓慢冷却过程中形成纵向兔毫纹理，是铁离子富集的结果。'
          )
        )
      )
    ),

    React.createElement('div', { className: 'temp-chart-wrap reveal' },
      React.createElement('div', { ref: chartRef, style: { width: '100%', height: '100%' } })
    ),
    React.createElement('div', {
      style: {
        textAlign: 'center',
        marginTop: '16px',
        fontSize: '12px',
        color: 'var(--porcelain-dark)',
        letterSpacing: '2px'
      }
    }, '传统馒头窑 24 小时烧制温度曲线示意')
  );
}

Object.assign(window, { TemperatureSimulator });
