// 主应用
function App() {
  const [activeSection, setActiveSection] = React.useState('hero');
  const [menuOpen, setMenuOpen] = React.useState(false);

  const navLinks = [
    { id: 'history', label: '千年窑火' },
    { id: 'material', label: '化妆土' },
    { id: 'art', label: '白地黑花' },
    { id: 'temperature', label: '窑火炼金' },
    { id: 'flame', label: '氧化还原' },
    { id: 'lab', label: '窑变实验室' },
    { id: 'process', label: '工艺流程' },
    { id: 'knowledge', label: '多学科' }
  ];

  // 滚动入场动画
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // 滚动监听 —— 当前 section 高亮
  React.useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 150;
      const sections = navLinks.map(l => document.getElementById(l.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= scrollY) {
          setActiveSection(navLinks[i].id);
          return;
        }
      }
      setActiveSection('hero');
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return React.createElement('div', null,
    // 导航
    React.createElement('nav', { className: 'site-nav' },
      React.createElement('div', { className: 'nav-logo' },
        '釉',
        React.createElement('span', null, '·'),
        '变'
      ),
      React.createElement('ul', { className: 'nav-links' },
        navLinks.map(link => React.createElement('li', { key: link.id },
          React.createElement('a', {
            href: `#${link.id}`,
            className: activeSection === link.id ? 'active' : '',
            onClick: (e) => { e.preventDefault(); handleNavClick(link.id); }
          }, link.label)
        ))
      ),
      React.createElement('button', {
        className: 'nav-menu-btn',
        onClick: () => setMenuOpen(o => !o),
        'aria-label': '菜单'
      },
        React.createElement('svg', { width: '22', height: '22', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: '1.5' },
          React.createElement('path', { d: 'M4 7 L20 7 M4 12 L20 12 M4 17 L20 17' })
        )
      )
    ),

    // 移动端菜单
    menuOpen && React.createElement('div', {
      style: {
        position: 'fixed',
        top: 'var(--nav-h)',
        left: 0, right: 0,
        background: 'rgba(26,22,19,0.97)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(245,241,234,0.08)',
        zIndex: 99,
        padding: '16px 0',
        display: window.innerWidth > 768 ? 'none' : 'block'
      }
    },
      navLinks.map(link => React.createElement('div', {
        key: link.id,
        style: {
          padding: '12px 32px',
          cursor: 'pointer',
          color: activeSection === link.id ? 'var(--porcelain)' : 'var(--porcelain-dark)',
          fontSize: '14px',
          letterSpacing: '2px'
        },
        onClick: () => handleNavClick(link.id)
      }, link.label))
    ),

    // 各模块
    React.createElement(HeroSection),
    React.createElement(HistorySection),
    React.createElement(MaterialSection),
    React.createElement(ArtSection),
    React.createElement(TemperatureSimulator),
    React.createElement(FlameSwitcher),
    React.createElement(KilnLab),
    React.createElement(ProcessFlow),
    React.createElement(KnowledgeCards),

    // 页脚
    React.createElement('footer', { className: 'site-footer' },
      React.createElement('div', { className: 'footer-text' }, '釉变·数映'),
      React.createElement('div', { className: 'footer-sub' }, '磁州窑烧制原理数字化科普体验 · 多学科融合设计')
    )
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
