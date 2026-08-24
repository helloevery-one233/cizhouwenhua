// 材料篇 —— 化妆土
function MaterialSection() {
  const methods = ['浇', '蘸', '浸', '涂'];

  return React.createElement('section', { className: 'material section', id: 'material' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '贰 · CHAPTER II'),
      React.createElement('h2', { className: 'section-title' }, '化妆土的智慧'),
      React.createElement('p', { className: 'section-subtitle' }, 'THE WISDOM OF SLIP COATING'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'material-grid' },
      React.createElement('div', { className: 'material-visual reveal' },
        React.createElement('div', { className: 'clay-layers' },
          // 釉层
          React.createElement('div', { className: 'clay-layer-glaze' }),
          // 化妆土层
          React.createElement('div', { className: 'clay-layer-slip' }),
          // 胎体
          React.createElement('div', { className: 'clay-layer-body' }),

          // 标签
          React.createElement('div', { className: 'layer-label left' },
            React.createElement('span', { className: 'layer-name' }, '化妆土'),
            React.createElement('span', { className: 'layer-desc' },
              '高铝白碱土',
              React.createElement('br'),
              '含铁 < 0.5%'
            )
          )
        )
      ),

      React.createElement('div', { className: 'material-text reveal' },
        React.createElement('p', null,
          '北方瓷土含铁量高，烧出的胎体发黄发灰，难以呈现洁白如玉的效果。面对这一天然局限，磁州窑工匠没有回避，而是发明了一项伟大的技术革新——',
          React.createElement('strong', null, '化妆土工艺')
        ),
        React.createElement('p', null,
          '精选高铝白碱土或高岭土，经反复淘洗、研磨、沉降，制成含铁量仅',
          React.createElement('strong', null, '0.14% – 0.5%'),
          '的细腻泥浆。施于坯体表面，宛如给瓷器打上一层"粉底"，完美遮盖粗胎杂色。'
        ),
        React.createElement('p', null,
          '化妆土古称"陶衣""护胎釉"，它不仅解决了北方瓷土的先天不足，更大幅降低了制瓷成本，',
          React.createElement('strong', null, '让精美瓷器从贵族专属走入寻常百姓家。'),
          '这是民窑智慧最生动的体现。'
        ),

        React.createElement('div', { style: { marginTop: '32px' } },
          React.createElement('div', {
            style: {
              fontFamily: 'var(--font-display)',
              fontSize: '16px',
              color: 'var(--ink)',
              marginBottom: '12px',
              letterSpacing: '2px'
            }
          }, '施土四法'),
          React.createElement('div', { className: 'method-chips' },
            methods.map(m => React.createElement('div', { key: m, className: 'method-chip' }, m))
          )
        )
      )
    )
  );
}

Object.assign(window, { MaterialSection });
