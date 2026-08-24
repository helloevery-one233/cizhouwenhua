// 多学科知识卡片
function KnowledgeCards() {
  const cards = [
    {
      category: '化学 · CHEMISTRY',
      accent: '#c0482a',
      title: '氧化还原反应',
      desc: '铁元素价态变化是窑变的核心密码。Fe³+与Fe²+的此消彼长，决定釉色的黄褐与青黑。',
      icon: React.createElement(React.Fragment, null,
        React.createElement('circle', { cx: '9', cy: '9', r: '5' }),
        React.createElement('circle', { cx: '15', cy: '15', r: '5' }),
        React.createElement('path', { d: 'M13 7 L11 9' })
      )
    },
    {
      category: '物理 · PHYSICS',
      accent: '#3a5a7a',
      title: '热传导与温度场',
      desc: '窑内温度分布不均，热量通过辐射、对流、传导传递。位置不同，釉色各异，造就窑变万千。',
      icon: React.createElement(React.Fragment, null,
        React.createElement('path', { d: 'M4 20 L20 20 M8 16 L8 8 M12 16 L12 4 M16 16 L16 10' }),
        React.createElement('path', { d: 'M6 16 Q10 12 14 16 Q18 20 20 16' })
      )
    },
    {
      category: '艺术 · ART',
      accent: '#5c3a1e',
      title: '白地黑花装饰',
      desc: '以斑花石为墨，以白面为纸，毛笔在瓷上作画。题材包罗万象，笔触写意洒脱，民窑艺术的巅峰。',
      icon: React.createElement(React.Fragment, null,
        React.createElement('path', { d: 'M3 19 L9 13 L17 5 L20 8 L12 16 L7 21 Z' }),
        React.createElement('path', { d: 'M15 7 L17 9' })
      )
    },
    {
      category: '历史 · HISTORY',
      accent: '#7a8a6f',
      title: '民窑千年传奇',
      desc: '从北朝肇始到宋金元鼎盛，磁州窑延绵一千五百年。扎根民间，雅俗共赏，谱写了中国陶瓷史的灿烂篇章。',
      icon: React.createElement(React.Fragment, null,
        React.createElement('path', { d: 'M4 20 L20 20 M6 20 L6 12 L12 8 L18 12 L18 20' }),
        React.createElement('path', { d: 'M12 8 L12 4 M10 4 L14 4' }),
        React.createElement('path', { d: 'M9 16 L9 20 M15 16 L15 20' })
      )
    }
  ];

  return React.createElement('section', { className: 'knowledge-section section', id: 'knowledge' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '柒 · CHAPTER VII'),
      React.createElement('h2', { className: 'section-title' }, '多学科视角'),
      React.createElement('p', { className: 'section-subtitle' }, 'MULTIDISCIPLINARY PERSPECTIVES'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'knowledge-grid reveal' },
      cards.map((c, i) => React.createElement('div', {
        key: i,
        className: 'know-card',
        style: { '--card-accent': c.accent }
      },
        React.createElement('svg', { className: 'know-icon', viewBox: '0 0 24 24' }, c.icon),
        React.createElement('div', { className: 'know-category' }, c.category),
        React.createElement('h3', { className: 'know-title' }, c.title),
        React.createElement('p', { className: 'know-desc' }, c.desc)
      ))
    )
  );
}

Object.assign(window, { KnowledgeCards });
