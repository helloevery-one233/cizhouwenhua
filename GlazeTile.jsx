// 釉面砖组件
function GlazeTile({ color, size = 200, label, effect = { type: 'none', intensity: 0 } }) {
  const { calculateGlazeColor, getKilnEffect, hexToRgb, rgbToHex } = window.GlazeUtils;

  // 生成渐变背景模拟釉面质感
  const rgb = hexToRgb(color);
  const lighter = rgbToHex(
    Math.min(255, rgb.r * 1.2 + 20),
    Math.min(255, rgb.g * 1.2 + 20),
    Math.min(255, rgb.b * 1.2 + 20)
  );
  const darker = rgbToHex(
    rgb.r * 0.75,
    rgb.g * 0.75,
    rgb.b * 0.75
  );

  const bgStyle = {
    background: `
      radial-gradient(ellipse at 30% 20%, ${lighter} 0%, transparent 45%),
      radial-gradient(ellipse at 70% 80%, ${darker} 0%, transparent 50%),
      ${color}
    `,
    width: size,
    height: size
  };

  // 窑变纹理
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
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(ellipse at 50% 50%,
              rgba(255,255,255,${0.15 * effect.intensity}) 0%,
              transparent 60%
            )
          `,
          pointerEvents: 'none'
        }
      });
    }
    if (effect.type === 'hare-fur') {
      const lines = [];
      const count = 8;
      for (let i = 0; i < count; i++) {
        const x = 10 + (i + 0.5) * (80 / count);
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

  return React.createElement('div', { className: 'tile-display' },
    React.createElement('div', { className: 'glaze-tile', style: bgStyle },
      React.createElement('div', { className: 'tile-frame' }),
      renderEffect()
    ),
    label && React.createElement('div', { className: 'tile-label' }, label)
  );
}

Object.assign(window, { GlazeTile });
