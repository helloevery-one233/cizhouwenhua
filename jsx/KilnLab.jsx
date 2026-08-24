// 窑变实验室
function KilnLab() {
  const { calculateGlazeColor, getTempStage, getKilnEffect, GLAZE_PRESETS, hexToRgb, rgbToHex } = window.GlazeUtils;

  const [fe, setFe] = React.useState(1.5);
  const [cu, setCu] = React.useState(0);
  const [co, setCo] = React.useState(0);
  const [isReduction, setIsReduction] = React.useState(true);
  const [temp, setTemp] = React.useState(1280);
  const [activePreset, setActivePreset] = React.useState(null);

  const color = calculateGlazeColor({ fe, cu, co, isReduction, temp });
  const effect = getKilnEffect({ fe, cu, co, temp, isReduction }, activePreset);
  const stage = getTempStage(temp);

  const rgb = hexToRgb(color);
  const lighter = rgbToHex(
    Math.min(255, rgb.r * 1.2 + 20),
    Math.min(255, rgb.g * 1.2 + 20),
    Math.min(255, rgb.b * 1.2 + 20)
  );

  const applyPreset = (key) => {
    const p = GLAZE_PRESETS[key];
    setFe(p.fe);
    setCu(p.cu);
    setCo(p.co);
    setIsReduction(p.isReduction);
    setTemp(p.temp);
    setActivePreset(key);
  };

  const handleSliderChange = (setter, val) => {
    setter(val);
    setActivePreset(null);
  };

  const presets = Object.keys(GLAZE_PRESETS);

  // 窑变效果渲染
  const renderEffect = () => {
    if (effect.type === 'crystals') {
      const count = Math.floor(12 + effect.intensity * 25);
      const crystals = [];
      for (let i = 0; i < count; i++) {
        const size = 2 + Math.random() * 5;
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;
        const hue = Math.random() > 0.5 ? '#ffd700' : '#ff6347';
        const opacity = 0.3 + Math.random() * 0.5 * effect.intensity;
        crystals.push(
          React.createElement('span', {
            key: i,
            style: {
              position: 'absolute',
              left: `${x}%`,
              top: `${y}%`,
              width: size,
              height: size,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${hue}, transparent 70%)`,
              opacity,
              boxShadow: `0 0 ${size * 2}px ${hue}`,
              pointerEvents: 'none'
            }
          })
        );
      }
      return crystals;
    }
    if (effect.type === 'silver-sheen') {
      return React.createElement('div', {
        style: {
          position: 'absolute', inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, rgba(255,255,255,${0.15 * effect.intensity}) 0%, transparent 60%)`,
          pointerEvents: 'none'
        }
      });
    }
    if (effect.type === 'hare-fur') {
      const lines = [];
      for (let i = 0; i < 8; i++) {
        const x = 10 + (i + 0.5) * (80 / 8);
        const offset = (Math.random() - 0.5) * 10;
        lines.push(
          React.createElement('span', {
            key: i,
            style: {
              position: 'absolute',
              left: `${x + offset}%`,
              top: '10%',
              width: '1px',
              height: '80%',
              background: 'linear-gradient(to bottom, transparent, rgba(180,140,80,0.5), transparent)',
              opacity: effect.intensity * 0.7,
              pointerEvents: 'none'
            }
          })
        );
      }
      return lines;
    }
    return null;
  };

  // 根据当前参数生成名称
  const getResultName = () => {
    if (activePreset) return GLAZE_PRESETS[activePreset].name;
    // 简易命名
    const totalColor = fe * 1 + cu * 4 + co * 8;
    if (totalColor < 0.5) return '透明釉';
    if (co > 0.1) return isReduction ? '霁蓝釉' : '翠蓝釉';
    if (cu > 0.3) return isReduction ? '铜红釉系' : '铜绿釉系';
    if (fe > 5) return isReduction ? '乌金釉系' : '酱黑釉系';
    if (fe > 3) return isReduction ? '黑釉系' : '柿红/酱釉系';
    if (fe > 1) return isReduction ? '青釉系' : '米黄釉系';
    return '淡色釉';
  };

  const getResultDesc = () => {
    if (activePreset) return GLAZE_PRESETS[activePreset].desc;
    return `当前配方：Fe ${fe.toFixed(1)}% · Cu ${cu.toFixed(1)}% · Co ${co.toFixed(1)}% · ${isReduction ? '还原焰' : '氧化焰'} · ${temp}℃。釉色效果：${effect.name}。`;
  };

  return React.createElement('section', { className: 'lab-section section', id: 'lab' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '伍 · CHAPTER V'),
      React.createElement('h2', { className: 'section-title' }, '窑变实验室'),
      React.createElement('p', { className: 'section-subtitle' }, 'KILN CHANGE LAB — DESIGN YOUR OWN GLAZE'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'lab-wrap' },
      // 预览区
      React.createElement('div', { className: 'lab-preview reveal' },
        React.createElement('div', {
          className: 'glaze-tile',
          style: {
            width: 320,
            height: 320,
            background: `
              radial-gradient(ellipse at 30% 20%, ${lighter} 0%, transparent 45%),
              ${color}
            `
          }
        },
          React.createElement('div', { className: 'tile-frame' }),
          renderEffect()
        ),
        React.createElement('div', { className: 'lab-result' },
          React.createElement('div', { className: 'lab-result-name' }, getResultName()),
          React.createElement('div', { className: 'lab-result-desc' }, getResultDesc())
        )
      ),

      // 控制面板
      React.createElement('div', { className: 'lab-controls reveal' },
        // 预设
        React.createElement('div', { className: 'control-group' },
          React.createElement('div', { className: 'control-group-title' }, '经典釉色预设'),
          React.createElement('div', { className: 'preset-btns' },
            presets.map(key => React.createElement('button', {
              key: key,
              className: `preset-btn ${activePreset === key ? 'active' : ''}`,
              onClick: () => applyPreset(key)
            }, GLAZE_PRESETS[key].name))
          )
        ),

        // 配方
        React.createElement('div', { className: 'control-group' },
          React.createElement('div', { className: 'control-group-title' }, '釉料配方'),
          React.createElement('div', { className: 'slider-control' },
            React.createElement('div', { className: 'slider-label-row' },
              React.createElement('span', { className: 'slider-label' }, '铁 Fe 含量'),
              React.createElement('span', { className: 'slider-value' }, fe.toFixed(1) + '%')
            ),
            React.createElement('input', {
              type: 'range', min: '0', max: '10', step: '0.1',
              value: fe,
              onChange: e => handleSliderChange(setFe, parseFloat(e.target.value)),
              className: 'custom-slider fe'
            })
          ),
          React.createElement('div', { className: 'slider-control' },
            React.createElement('div', { className: 'slider-label-row' },
              React.createElement('span', { className: 'slider-label' }, '铜 Cu 含量'),
              React.createElement('span', { className: 'slider-value' }, cu.toFixed(1) + '%')
            ),
            React.createElement('input', {
              type: 'range', min: '0', max: '3', step: '0.1',
              value: cu,
              onChange: e => handleSliderChange(setCu, parseFloat(e.target.value)),
              className: 'custom-slider cu'
            })
          ),
          React.createElement('div', { className: 'slider-control' },
            React.createElement('div', { className: 'slider-label-row' },
              React.createElement('span', { className: 'slider-label' }, '钴 Co 含量'),
              React.createElement('span', { className: 'slider-value' }, co.toFixed(1) + '%')
            ),
            React.createElement('input', {
              type: 'range', min: '0', max: '2', step: '0.05',
              value: co,
              onChange: e => handleSliderChange(setCo, parseFloat(e.target.value)),
              className: 'custom-slider co'
            })
          )
        ),

        // 烧制气氛
        React.createElement('div', { className: 'control-group' },
          React.createElement('div', { className: 'control-group-title' }, '烧制气氛'),
          React.createElement('div', { className: 'atmosphere-btns' },
            React.createElement('button', {
              className: `atm-btn ${!isReduction ? 'active-ox' : ''}`,
              onClick: () => { setIsReduction(false); setActivePreset(null); }
            }, '氧化焰 O₂'),
            React.createElement('button', {
              className: `atm-btn ${isReduction ? 'active-re' : ''}`,
              onClick: () => { setIsReduction(true); setActivePreset(null); }
            }, '还原焰 CO')
          )
        ),

        // 温度
        React.createElement('div', { className: 'control-group' },
          React.createElement('div', { className: 'control-group-title' }, '烧制温度'),
          React.createElement('div', { className: 'temp-btns' },
            [1100, 1200, 1250, 1280, 1300, 1350].map(t => React.createElement('button', {
              key: t,
              className: `temp-btn ${temp === t ? 'active' : ''}`,
              onClick: () => { setTemp(t); setActivePreset(null); }
            }, `${t}℃`))
          ),
          React.createElement('div', {
            style: {
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(245,241,234,0.06)',
              fontSize: '12px',
              color: 'var(--porcelain-dark)'
            }
          },
            React.createElement('span', {
              style: { color: 'var(--persimmon)', fontFamily: 'var(--font-display)' }
            }, `当前阶段：`),
            stage.name
          )
        )
      )
    )
  );
}

Object.assign(window, { KilnLab });
