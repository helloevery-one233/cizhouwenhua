// 氧化/还原焰切换器
function FlameSwitcher() {
  const [isReduction, setIsReduction] = React.useState(false);
  const { calculateGlazeColor, getKilnEffect } = window.GlazeUtils;

  // 相同铁含量，不同气氛
  const feContent = 2;
  const temp = 1280;

  const oxColor = calculateGlazeColor({ fe: feContent, cu: 0, co: 0, isReduction: false, temp });
  const reColor = calculateGlazeColor({ fe: feContent, cu: 0, co: 0, isReduction: true, temp });

  const toggle = () => setIsReduction(r => !r);

  return React.createElement('section', { className: 'flame-section section', id: 'flame' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '肆 续 · CHAPTER IV-B'),
      React.createElement('h2', { className: 'section-title' }, '氧化与还原'),
      React.createElement('p', { className: 'section-subtitle' }, 'OXIDATION vs REDUCTION — THE HEART OF KILN CHANGE'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'flame-toggle-wrap' },
      React.createElement('div', { className: 'flame-samples reveal' },
        React.createElement('div', { className: `flame-sample ${!isReduction ? 'active' : ''}` },
          React.createElement('div', {
            className: 'glaze-tile',
            style: {
              width: 200, height: 200,
              background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.2), transparent 50%), ${oxColor}`
            }
          }, React.createElement('div', { className: 'tile-frame' })),
          React.createElement('div', { className: 'flame-name' }, '氧化焰')
        ),

        React.createElement('div', { className: 'flame-vs' }, '⇌'),

        React.createElement('div', { className: `flame-sample ${isReduction ? 'active' : ''}` },
          React.createElement('div', {
            className: 'glaze-tile',
            style: {
              width: 200, height: 200,
              background: `radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.15), transparent 50%), ${reColor}`
            }
          }, React.createElement('div', { className: 'tile-frame' })),
          React.createElement('div', { className: 'flame-name' }, '还原焰')
        )
      ),

      React.createElement('div', { className: 'flame-switch reveal' },
        React.createElement('span', { className: `flame-switch-label ${!isReduction ? 'active' : ''}` }, 'O₂ 充足'),
        React.createElement('button', {
          className: `flame-btn ${isReduction ? 'reduction' : ''}`,
          onClick: toggle,
          'aria-label': '切换氧化还原焰'
        }, React.createElement('span', { className: 'flame-btn-knob' })),
        React.createElement('span', { className: `flame-switch-label ${isReduction ? 'active' : ''}` }, 'CO 富集')
      ),

      React.createElement('div', { className: 'iron-states reveal' },
        React.createElement('div', { className: 'iron-ion' },
          React.createElement('div', { className: 'iron-symbol fe3' }, 'Fe³⁺'),
          React.createElement('div', { className: 'iron-label' }, '三价铁 · 黄褐')
        ),
        React.createElement('div', { className: 'iron-ion' },
          React.createElement('div', {
            className: 'iron-symbol',
            style: { fontSize: '20px', color: 'var(--porcelain-dark)', marginTop: '8px' }
          }, '⇌'),
          React.createElement('div', { className: 'iron-label' }, '窑内气氛')
        ),
        React.createElement('div', { className: 'iron-ion' },
          React.createElement('div', { className: 'iron-symbol fe2' }, 'Fe²⁺'),
          React.createElement('div', { className: 'iron-label' }, '二价铁 · 青黑')
        )
      ),

      React.createElement('div', { className: 'chem-explanation reveal' },
        React.createElement('div', { className: `chem-card ${!isReduction ? 'active' : ''}` },
          React.createElement('h4', null, '氧化焰 · O₂ Rich'),
          React.createElement('div', { className: 'chem-formula' }, '4FeO + O₂ → 2Fe₂O₃'),
          React.createElement('p', { className: 'chem-desc' },
            '窑内氧气充足，燃料完全燃烧。铁元素以三价铁（Fe³⁺）的形式存在，釉色偏黄、偏褐、偏红。',
            React.createElement('br'),
            '典型釉色：柿红釉、酱釉、米黄釉。'
          )
        ),
        React.createElement('div', { className: `chem-card ${isReduction ? 'active' : ''}` },
          React.createElement('h4', null, '还原焰 · CO Rich'),
          React.createElement('div', { className: 'chem-formula' }, 'Fe₂O₃ + CO → 2FeO + CO₂'),
          React.createElement('p', { className: 'chem-desc' },
            '限制氧气供给，燃料不完全燃烧产生一氧化碳。三价铁被还原为二价铁（Fe²⁺），釉色偏青、偏黑。',
            React.createElement('br'),
            '典型釉色：青釉、黑釉（乌金釉）、铁红釉。'
          )
        )
      )
    )
  );
}

Object.assign(window, { FlameSwitcher });
