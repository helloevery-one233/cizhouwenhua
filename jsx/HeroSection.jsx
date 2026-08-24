// Hero 首屏
function HeroSection() {
  React.useEffect(() => {
    // 粒子效果
    const canvas = document.getElementById('hero-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w = canvas.width = canvas.offsetWidth;
    let h = canvas.height = canvas.offsetHeight;

    const particles = [];
    const count = 40;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.5 + Math.random() * 2,
        vy: -0.2 - Math.random() * 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        alpha: 0.1 + Math.random() * 0.4,
        color: Math.random() > 0.7 ? '#c0482a' : '#d4a853'
      });
    }

    let raf;
    function animate() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < 0 || p.x > w) p.vx *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      raf = requestAnimationFrame(animate);
    }
    animate();

    const handleResize = () => {
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return React.createElement('section', { className: 'hero', id: 'hero' },
    React.createElement('div', { className: 'hero-bg' }),
    React.createElement('canvas', { id: 'hero-canvas', className: 'hero-particles' }),
    React.createElement('div', { className: 'hero-content' },
      React.createElement('div', { className: 'hero-pretitle' }, 'CIZHOU KILN · 磁州窑'),
      React.createElement('h1', { className: 'hero-title' },
        '釉',
        React.createElement('span', { className: 'accent' }, '变'),
        React.createElement('br'),
        '数',
        React.createElement('span', { className: 'accent' }, '映')
      ),
      React.createElement('p', { className: 'hero-desc' },
        '穿越千年窑火，以数驭物',
        React.createElement('br'),
        '解密白地黑花背后的化学、物理与艺术'
      )
    ),
    React.createElement('div', { className: 'hero-scroll' },
      React.createElement('span', null, '向下探索'),
      React.createElement('div', { className: 'hero-scroll-line' })
    )
  );
}

Object.assign(window, { HeroSection });
