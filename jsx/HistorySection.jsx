// 历史篇
function HistorySection() {
  const [activeEra, setActiveEra] = React.useState(2); // 默认宋金元

  const eras = [
    { era: '北朝 · 肇始', desc: '磁州窑萌芽于北朝时期，窑火初燃，以烧制青瓷为主，工艺尚显稚拙，为后世繁盛奠定根基。' },
    { era: '隋唐 · 发展', desc: '隋唐时期工艺日趋成熟，白瓷烧制技术突破，化妆土工艺逐渐成形，为白地黑花埋下伏笔。' },
    { era: '宋金元 · 鼎盛', desc: '宋金元三代是磁州窑的黄金时期。白地黑花技艺登峰造极，窑场遍布漳河、滏阳河流域，成为北方最大民窑体系。' },
    { era: '明清 · 延续', desc: '明清时期官窑兴起，民窑相对式微。磁州窑延续烧制，风格更趋质朴，日用瓷产量依然庞大。' },
    { era: '当代 · 新生', desc: '当代磁州窑在传承中创新，传统工艺与现代设计结合，焕发出新的生命力，入选国家级非物质文化遗产。' }
  ];

  return React.createElement('section', { className: 'history section', id: 'history' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '壹 · CHAPTER I'),
      React.createElement('h2', { className: 'section-title' }, '千年窑火'),
      React.createElement('p', { className: 'section-subtitle' }, 'A THOUSAND YEARS OF KILN FIRE'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'history-grid' },
      React.createElement('div', { className: 'history-text reveal' },
        React.createElement('p', null,
          '磁州窑，位于今河北省邯郸市磁县与峰峰矿区一带，因古时属磁州而得名。',
          React.createElement('strong', null, '它始于北朝、盛于宋金元、延绵至当代，窑火千年不熄，'),
          '是中国北方规模最大、影响最广的民窑体系。'
        ),
        React.createElement('div', { className: 'highlight-box' },
          React.createElement('p', null, '"民窑的天花板"'),
          React.createElement('p', null, '"釉下彩绘的先行者"')
        ),
        React.createElement('p', null,
          '与五大官窑追求的典雅精致不同，磁州窑扎根民间，以质朴豪放的白地黑花装饰独树一帜。它突破了单色釉的局限，',
          React.createElement('strong', null, '第一次将中国传统绘画、书法完整地搬上了瓷器'),
          '，开创了中国瓷器装饰的新纪元。'
        ),
        React.createElement('p', null,
          '从选料、制坯、施化妆土，到绘画、施釉、装窑、烧制，',
          React.createElement('strong', null, '七十二道工序环环相扣'),
          '，每一件成品都是土地、火与匠人智慧的结晶。'
        ),

        React.createElement('div', { className: 'stats-row' },
          React.createElement('div', { className: 'stat-card' },
            React.createElement('div', { className: 'stat-num' }, '72'),
            React.createElement('div', { className: 'stat-label' }, '道工序')
          ),
          React.createElement('div', { className: 'stat-card' },
            React.createElement('div', { className: 'stat-num' }, '1500'),
            React.createElement('div', { className: 'stat-label' }, '年烧造史')
          ),
          React.createElement('div', { className: 'stat-card' },
            React.createElement('div', { className: 'stat-num' }, '1250℃'),
            React.createElement('div', { className: 'stat-label' }, '烧成温度')
          )
        )
      ),

      React.createElement('div', { className: 'timeline reveal' },
        eras.map((e, i) => React.createElement('div', {
          key: i,
          className: `timeline-item ${i === activeEra ? 'active' : ''}`,
          onClick: () => setActiveEra(i)
        },
          React.createElement('div', { className: 'timeline-era' }, e.era),
          React.createElement('div', { className: 'timeline-desc' }, e.desc)
        ))
      )
    )
  );
}

Object.assign(window, { HistorySection });
