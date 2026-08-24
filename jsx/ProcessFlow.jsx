// 工艺流程图解
function ProcessFlow() {
  const [activeStep, setActiveStep] = React.useState(null);

  const steps = [
    { name: '选料', desc: '甄选瓷土', detail: '磁州窑使用本地大青土、缸土等原料，经人工挑选、晾晒、破碎，去除杂质。优质瓷土是好瓷的基础，工匠们深谙"土为瓷之母"的道理。' },
    { name: '制坯', desc: '拉坯成型', detail: '将练好的泥料置于辘轳车（陶轮）上，凭借手的控制与离心力，拉出碗、盘、瓶、罐等各种器型。工匠的手法与经验决定了器物的形态与品质。' },
    { name: '施化妆土', desc: '敷施白碱', detail: '将精选淘洗的白碱土制成泥浆，以浇、蘸、浸、涂等方式施于坯体表面。这道工序遮盖了瓷胎的灰黄色，为后续装饰提供洁白的"画布"。' },
    { name: '绘画', desc: '毛笔彩绘', detail: '工匠以斑花石研磨的黑彩为墨，以化妆白面为纸，直接手绘各种纹饰。诗词、花鸟、人物、故事皆可入画，笔触写意洒脱，充满民间生活气息。' },
    { name: '施釉', desc: '罩透明釉', detail: '在装饰完成的坯体上均匀施加一层透明釉。釉料以长石、石英、石灰石等配制，高温下熔融形成玻璃态，既保护纹饰又赋予瓷器莹润光泽。' },
    { name: '装窑', desc: '匣钵码放', detail: '将施釉后的坯体装入匣钵（耐火容器），避免落渣与烟气直接接触。碗盘类多采用叠烧法以提高产量。装窑的疏密与位置影响烧成效果。' },
    { name: '烧制', desc: '柴火成瓷', detail: '传统馒头窑以柴或煤为燃料，经小火、中火、大火三阶段，历时约24小时升至1250-1300℃。气氛的把控是窑变的关键，全凭把桩师傅的经验。' },
    { name: '出窑', desc: '开窑见宝', detail: '自然冷却后开窑出瓷。一窑之中，因位置不同、气氛各异，每件器物釉色都略有不同。"入窑一色，出窑万彩"，窑变的惊喜与遗憾，都在开窑一瞬间揭晓。' }
  ];

  return React.createElement('section', { className: 'process-section section', id: 'process' },
    React.createElement('div', { className: 'section-header reveal' },
      React.createElement('div', { className: 'section-number' }, '陆 · CHAPTER VI'),
      React.createElement('h2', { className: 'section-title' }, '七十二道工序'),
      React.createElement('p', { className: 'section-subtitle' }, 'SEVENTY-TWO STEPS — FROM CLAY TO PORCELAIN'),
      React.createElement('div', { className: 'section-divider' })
    ),

    React.createElement('div', { className: 'process-flow reveal' },
      steps.map((s, i) => React.createElement('div', {
        key: i,
        className: 'process-step',
        onClick: () => setActiveStep(activeStep === i ? null : i)
      },
        React.createElement('div', { className: 'step-num' }, i + 1),
        React.createElement('svg', { className: 'step-icon', viewBox: '0 0 24 24' },
          i === 0 && React.createElement('path', { d: 'M4 20 L8 10 L12 20 M10 14 L14 8 L18 20 M20 20 L4 20' }),
          i === 1 && React.createElement('path', { d: 'M8 20 Q8 14 12 14 Q16 14 16 20 M12 14 L12 8 M10 8 L14 8 M12 6 L12 4' }),
          i === 2 && React.createElement('path', { d: 'M6 18 L18 18 M8 18 Q8 10 12 10 Q16 10 16 18 M12 10 L12 6' }),
          i === 3 && React.createElement('path', { d: 'M3 20 L8 15 L16 7 L19 10 L11 18 L6 20 Z M15 5 L19 9' }),
          i === 4 && React.createElement('path', { d: 'M6 20 Q6 14 12 14 Q18 14 18 20 M12 14 L12 8 M9 8 L15 8 M12 4 L12 2' }),
          i === 5 && React.createElement('path', { d: 'M4 20 L20 20 M6 20 L6 8 L18 8 L18 20 M8 8 L8 4 L16 4 L16 8' }),
          i === 6 && React.createElement('path', { d: 'M6 20 L18 20 L18 12 L15 8 L9 8 L6 12 Z M12 8 L12 4 M10 4 L14 4 M8 14 L16 14' }),
          i === 7 && React.createElement('path', { d: 'M5 18 L19 18 M7 18 Q7 12 12 12 Q17 12 17 18 M12 12 L12 6 M9 6 L15 6 M10 6 L9 3 M14 6 L15 3' })
        ),
        React.createElement('div', { className: 'step-name' }, s.name),
        React.createElement('div', { className: 'step-desc' }, s.desc)
      ))
    ),

    React.createElement('div', { className: `process-detail ${activeStep !== null ? 'active' : ''}` },
      activeStep !== null && React.createElement(React.Fragment, null,
        React.createElement('div', { className: 'detail-title' },
          `第 ${activeStep + 1} 步 · ${steps[activeStep].name}`
        ),
        React.createElement('p', { className: 'detail-content' }, steps[activeStep].detail)
      )
    )
  );
}

Object.assign(window, { ProcessFlow });
