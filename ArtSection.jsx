// 艺术篇 —— 白地黑花
function ArtSection() {
  const techniques = [
    { name: '划花', desc: '用竹签在釉面划出细线纹饰，线条流畅有力' },
    { name: '刻花', desc: '刀刻剔除部分釉层，呈现深浅层次变化' },
    { name: '剔花', desc: '剔去花纹以外的化妆土，露胎与白面对比强烈' },
    { name: '白地黑花', desc: '毛笔直接手绘，题材广泛，笔触写意洒脱' },
    { name: '红绿彩', desc: '釉上彩绘，色彩鲜艳，民间喜庆风格' },
    { name: '珍珠地', desc: '戳印小圆点作地纹，如珍珠散落般精致' }
  ];

  // SVG 瓶形 + 缠枝莲纹
  const VaseSVG = () => React.createElement('svg', {
    className: 'painting-svg',
    viewBox: '0 0 200 300',
    fill: 'none'
  },
    // 瓶身轮廓（以白瓷为底，SVG只画黑花）
    React.createElement('g', { stroke: '#1a1613', strokeWidth: '1.5', fill: 'none', strokeLinecap: 'round', strokeLinejoin: 'round' },
      // 瓶口
      React.createElement('path', { d: 'M75 30 Q100 20 125 30' }),
      React.createElement('path', { d: 'M78 35 Q100 32 122 35' }),
      // 瓶颈
      React.createElement('path', { d: 'M80 35 L82 70' }),
      React.createElement('path', { d: 'M120 35 L118 70' }),
      // 肩部
      React.createElement('path', { d: 'M82 70 Q50 100 55 150' }),
      React.createElement('path', { d: 'M118 70 Q150 100 145 150' }),
      // 腹部
      React.createElement('path', { d: 'M55 150 Q50 200 70 250' }),
      React.createElement('path', { d: 'M145 150 Q150 200 130 250' }),
      // 底足
      React.createElement('path', { d: 'M70 250 L72 270' }),
      React.createElement('path', { d: 'M130 250 L128 270' }),
      React.createElement('path', { d: 'M72 270 Q100 275 128 270' })
    ),
    // 缠枝莲纹装饰带
    React.createElement('g', { fill: '#1a1613', stroke: 'none' },
      // 肩部缠枝
      React.createElement('path', { d: 'M65 90 Q80 80 100 90 Q120 100 135 90', stroke: '#1a1613', fill: 'none', strokeWidth: '2' }),
      // 莲花1
      React.createElement('circle', { cx: '75', cy: '120', r: '8' }),
      React.createElement('path', { d: 'M75 112 L75 128 M68 118 L82 122 M68 122 L82 118' }),
      // 缠枝
      React.createElement('path', { d: 'M83 120 Q100 110 115 125 Q130 140 125 160', stroke: '#1a1613', fill: 'none', strokeWidth: '1.5' }),
      // 莲花2
      React.createElement('circle', { cx: '125', cy: '150', r: '10' }),
      React.createElement('path', { d: 'M125 142 L125 158 M117 148 L133 152 M117 152 L133 148' }),
      // 叶子
      React.createElement('path', { d: 'M90 135 Q95 128 105 130 Q100 140 90 135', fill: '#1a1613' }),
      React.createElement('path', { d: 'M60 160 Q55 152 50 160 Q58 165 60 160', fill: '#1a1613' }),
      // 腹下部纹饰
      React.createElement('path', { d: 'M60 190 Q80 200 100 190 Q120 180 140 190', stroke: '#1a1613', fill: 'none', strokeWidth: '1.5' }),
      React.createElement('path', { d: 'M65 210 Q100 225 135 210', stroke: '#1a1613', fill: 'none', strokeWidth: '2' }),
      // 仰莲纹
      React.createElement('path', { d: 'M80 235 L85 250 L90 235', fill: '#1a1613' }),
      React.createElement('path', { d: 'M95 237 L100 255 L105 237', fill: '#1a1613' }),
      React.createElement('path', { d: 'M110 235 L115 250 L120 235', fill: '#1a1613' })
    )
  );

  return React.createElement('section', { className: 'art section', id: 'art' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '叁 · CHAPTER III'),
      React.createElement('h2', { className: 'section-title' }, '白地黑花'),
      React.createElement('p', { className: 'section-subtitle' }, 'WHITE GROUND WITH BLACK DECORATION'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'art-showcase' },
      React.createElement('div', { className: 'reveal' },
        React.createElement('div', { className: 'painting-demo' },
          React.createElement(VaseSVG)
        ),
        React.createElement('div', { className: 'painting-caption' }, '缠枝莲纹梅瓶 · 示意')
      ),

      React.createElement('div', { className: 'art-text reveal' },
        React.createElement('h3', null, '铁锈花·釉下彩的巅峰'),
        React.createElement('p', null,
          '白地黑花，又称"铁锈花"，是磁州窑最具标志性的工艺，属于',
          React.createElement('strong', null, '釉下彩装饰'),
          '。颜料取自本地斑花石——一种富含氧化铁的矿石，研磨成浆后，工匠以毛笔在化妆土白面上直接手绘作画。'
        ),
        React.createElement('p', null,
          '题材包罗万象：诗词警句、婴戏花鸟、缠枝莲纹、山水人物、民间故事……笔触写意洒脱，不事雕琢，',
          React.createElement('strong', null, '充满生命力与烟火气'),
          '，与官窑的精致典雅形成鲜明对比。'
        ),
        React.createElement('p', null,
          '施透明釉后一次入窑，经 1250℃ 高温烧成。高温下氧化铁渗入釉层，形成黑褐相间的釉下彩效果，',
          React.createElement('strong', null, '黑白对比强烈，永不褪色。')
        )
      )
    ),

    React.createElement('div', { className: 'techniques-grid reveal' },
      techniques.map((t, i) => React.createElement('div', { key: i, className: 'technique-card' },
        React.createElement('svg', { className: 'technique-icon', viewBox: '0 0 24 24' },
          i === 0 && React.createElement('path', { d: 'M4 20 L20 4 M6 18 L18 6' }),
          i === 1 && React.createElement('path', { d: 'M3 12 Q8 4 12 12 Q16 20 21 12' }),
          i === 2 && React.createElement('path', { d: 'M4 8 L20 8 M4 16 L20 16 M8 4 L8 20 M16 4 L16 20' }),
          i === 3 && React.createElement('path', { d: 'M3 18 L8 13 L16 5 L19 8 L11 16 L6 21 Z' }),
          i === 4 && React.createElement('path', { d: 'M12 3 L14 8 L20 9 L16 13 L17 19 L12 17 L7 19 L8 13 L4 9 L10 8 Z' }),
          i === 5 && React.createElement(React.Fragment, null,
            React.createElement('circle', { cx: '6', cy: '6', r: '1.5' }),
            React.createElement('circle', { cx: '12', cy: '5', r: '1.5' }),
            React.createElement('circle', { cx: '18', cy: '6', r: '1.5' }),
            React.createElement('circle', { cx: '9', cy: '10', r: '1.5' }),
            React.createElement('circle', { cx: '15', cy: '10', r: '1.5' }),
            React.createElement('circle', { cx: '6', cy: '14', r: '1.5' }),
            React.createElement('circle', { cx: '12', cy: '13', r: '1.5' }),
            React.createElement('circle', { cx: '18', cy: '14', r: '1.5' }),
            React.createElement('circle', { cx: '9', cy: '18', r: '1.5' }),
            React.createElement('circle', { cx: '15', cy: '18', r: '1.5' })
          )
        ),
        React.createElement('div', { className: 'technique-name' }, t.name),
        React.createElement('div', { className: 'technique-desc' }, t.desc)
      ))
    )
  );
}

Object.assign(window, { ArtSection });
