// 釉色计算工具 —— 基于配方（铁/铜/钴含量）、温度、气氛计算釉面颜色
// 注意：这是科普级别的视觉模拟，非精确化学模型

// hex 混合工具
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return {
    r: parseInt(h.substring(0, 2), 16),
    g: parseInt(h.substring(2, 4), 16),
    b: parseInt(h.substring(4, 6), 16)
  };
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map(x => {
    const v = Math.max(0, Math.min(255, Math.round(x)));
    return v.toString(16).padStart(2, '0');
  }).join('');
}

// 按权重混合颜色
function mixColors(colors) {
  // colors: [{ color: '#xxx', weight: 0-1 }]
  let totalW = 0;
  let r = 0, g = 0, b = 0;
  for (const c of colors) {
    if (c.weight <= 0) continue;
    const rgb = hexToRgb(c.color);
    r += rgb.r * c.weight;
    g += rgb.g * c.weight;
    b += rgb.b * c.weight;
    totalW += c.weight;
  }
  if (totalW === 0) return '#f5f1ea';
  r /= totalW;
  g /= totalW;
  b /= totalW;
  return rgbToHex(r, g, b);
}

// 铁系釉色 —— 最核心
function getIronGlaze(fePercent, isReduction, temp) {
  // fePercent: 0 - 10 (百分比)
  // 氧化焰：Fe³+ 主导，黄褐系
  // 还原焰：Fe²+ 主导，青黑系
  // 温度：越高颜色越深、越饱和（在熔融温度以上）

  const meltThreshold = 1100; // 釉料熔融起始温度
  const maxTemp = 1350;

  // 熔融度系数 0-1
  const meltFactor = temp < meltThreshold
    ? (temp / meltThreshold) * 0.3 // 未熔融，颜色偏淡偏灰
    : 0.3 + 0.7 * Math.min(1, (temp - meltThreshold) / (maxTemp - meltThreshold));

  if (isReduction) {
    // 还原焰：青 → 灰青 → 黑
    // 低铁：淡青色 #b8c4b0
    // 中铁：青灰 #6a7a68
    // 高铁：铁黑/乌金 #1a2018
    const lowFe = '#b8c4b0';
    const midFe = '#5a6a58';
    const highFe = '#1c241a';
    const maxFe = 8;

    let base;
    if (fePercent < 2) {
      const t = fePercent / 2;
      base = mixColors([
        { color: lowFe, weight: 1 - t },
        { color: midFe, weight: t }
      ]);
    } else {
      const t = Math.min(1, (fePercent - 2) / (maxFe - 2));
      base = mixColors([
        { color: midFe, weight: 1 - t },
        { color: highFe, weight: t }
      ]);
    }
    // 温度影响：温度高 → 更深更纯；温度低 → 偏灰偏淡
    const rgb = hexToRgb(base);
    const dimFactor = 0.6 + 0.4 * meltFactor;
    return rgbToHex(rgb.r * dimFactor, rgb.g * dimFactor, rgb.b * dimFactor);
  } else {
    // 氧化焰：淡黄 → 酱褐 → 深褐黑
    // 低铁：米黄 #e8d8b8
    // 中铁：柿红酱褐 #8a4a22
    // 高铁：酱黑 #2a1810
    const lowFe = '#e8d8b8';
    const midFe = '#8a4a22';
    const highFe = '#2a1810';
    const maxFe = 8;

    let base;
    if (fePercent < 2) {
      const t = fePercent / 2;
      base = mixColors([
        { color: lowFe, weight: 1 - t },
        { color: midFe, weight: t }
      ]);
    } else {
      const t = Math.min(1, (fePercent - 2) / (maxFe - 2));
      base = mixColors([
        { color: midFe, weight: 1 - t },
        { color: highFe, weight: t }
      ]);
    }
    const rgb = hexToRgb(base);
    const dimFactor = 0.6 + 0.4 * meltFactor;
    return rgbToHex(rgb.r * dimFactor, rgb.g * dimFactor, rgb.b * dimFactor);
  }
}

// 铜系釉色
function getCopperGlaze(cuPercent, isReduction, temp) {
  // 铜红釉只在还原焰下呈现红色（胶体铜粒子）
  // 氧化焰：绿色/蓝绿色
  const meltFactor = temp < 1100 ? 0.3 : 0.3 + 0.7 * Math.min(1, (temp - 1100) / 250);

  if (isReduction) {
    // 还原焰：铜红 —— 极少量即有明显效果
    // 低铜：淡粉 #e8a898
    // 中铜：钧红 #b04030
    // 高铜：深红 #6a1818
    const lowCu = '#e8b0a0';
    const midCu = '#b04030';
    const highCu = '#601818';
    const maxCu = 3;

    let base;
    if (cuPercent < 0.8) {
      const t = cuPercent / 0.8;
      base = mixColors([
        { color: lowCu, weight: 1 - t },
        { color: midCu, weight: t }
      ]);
    } else {
      const t = Math.min(1, (cuPercent - 0.8) / (maxCu - 0.8));
      base = mixColors([
        { color: midCu, weight: 1 - t },
        { color: highCu, weight: t }
      ]);
    }
    const rgb = hexToRgb(base);
    const dimFactor = 0.55 + 0.45 * meltFactor;
    return rgbToHex(rgb.r * dimFactor, rgb.g * dimFactor, rgb.b * dimFactor);
  } else {
    // 氧化焰：铜绿
    const lowCu = '#a8c8a0';
    const midCu = '#4a7a48';
    const highCu = '#1a3a20';
    const maxCu = 5;

    let base;
    if (cuPercent < 1) {
      const t = cuPercent / 1;
      base = mixColors([
        { color: lowCu, weight: 1 - t },
        { color: midCu, weight: t }
      ]);
    } else {
      const t = Math.min(1, (cuPercent - 1) / (maxCu - 1));
      base = mixColors([
        { color: midCu, weight: 1 - t },
        { color: highCu, weight: t }
      ]);
    }
    const rgb = hexToRgb(base);
    const dimFactor = 0.6 + 0.4 * meltFactor;
    return rgbToHex(rgb.r * dimFactor, rgb.g * dimFactor, rgb.b * dimFactor);
  }
}

// 钴系釉色 —— 氧化/还原下都稳定呈蓝
function getCobaltGlaze(coPercent, temp) {
  const meltFactor = temp < 1100 ? 0.3 : 0.3 + 0.7 * Math.min(1, (temp - 1100) / 250);

  const lowCo = '#a0b0d0';
  const midCo = '#3a5080';
  const highCo = '#152040';
  const maxCo = 2;

  let base;
  if (coPercent < 0.5) {
    const t = coPercent / 0.5;
    base = mixColors([
      { color: lowCo, weight: 1 - t },
      { color: midCo, weight: t }
    ]);
  } else {
    const t = Math.min(1, (coPercent - 0.5) / (maxCo - 0.5));
    base = mixColors([
      { color: midCo, weight: 1 - t },
      { color: highCo, weight: t }
    ]);
  }
  const rgb = hexToRgb(base);
  const dimFactor = 0.6 + 0.4 * meltFactor;
  return rgbToHex(rgb.r * dimFactor, rgb.g * dimFactor, rgb.b * dimFactor);
}

// 综合釉色计算
function calculateGlazeColor(params) {
  const { fe = 1, cu = 0, co = 0, isReduction = false, temp = 1250 } = params;

  const basePorcelain = '#f0ebe0'; // 瓷胎底色

  // 分别计算各着色元素贡献
  const feColor = getIronGlaze(fe, isReduction, temp);
  const cuColor = cu > 0 ? getCopperGlaze(cu, isReduction, temp) : null;
  const coColor = co > 0 ? getCobaltGlaze(co, temp) : null;

  // 着色强度权重 —— 钴着色力最强，铜次之，铁最弱（同含量下）
  const feWeight = fe * 1.0;
  const cuWeight = cu * 4.0;
  const coWeight = co * 8.0;
  const totalColorWeight = feWeight + cuWeight + coWeight;

  if (totalColorWeight < 0.05) {
    // 几乎无色 —— 透明釉，透胎色
    return basePorcelain;
  }

  const colors = [
    { color: feColor, weight: feWeight }
  ];
  if (cuColor) colors.push({ color: cuColor, weight: cuWeight });
  if (coColor) colors.push({ color: coColor, weight: coWeight });

  return mixColors(colors);
}

// 温度阶段信息
function getTempStage(temp) {
  if (temp < 300) return { name: '小火预热', desc: '排出坯体残余水分，防止开裂。窑内水气蒸腾，坯体由湿渐干。', color: '#7a8a6f' };
  if (temp < 600) return { name: '低温脱水', desc: '结晶水脱出，有机物开始分解挥发。坯体强度逐渐增加，体积略有收缩。', color: '#a89a6a' };
  if (temp < 900) return { name: '中火升温', desc: '碳酸盐分解，石英晶型转变。釉料开始熔融前的准备阶段，坯体趋于致密。', color: '#d4a853' };
  if (temp < 1100) return { name: '高温成瓷', desc: '瓷胎开始烧结，釉料逐步熔融。长石玻璃相形成，填充坯体间隙，胎釉结合。', color: '#d46a2a' };
  if (temp < 1250) return { name: '大火熔融', desc: '釉料完全熔融，形成玻璃态。胎釉反应层形成，着色元素发生价态变化。', color: '#c0482a' };
  return { name: '顶峰烧成', desc: '瓷胎完全瓷化，釉面玻化充分。窑变在此阶段孕育，气氛控制决定最终釉色。', color: '#8a2f1c' };
}

// 预设配方
const GLAZE_PRESETS = {
  white: {
    name: '白釉',
    fe: 0.3, cu: 0, co: 0,
    isReduction: false, temp: 1250,
    desc: '低铁含量透明釉，覆盖于化妆土之上，呈现温润玉白。磁州窑白地黑花的基底釉色。'
  },
  black: {
    name: '黑釉',
    fe: 6, cu: 0, co: 0,
    isReduction: true, temp: 1280,
    desc: '高铁含量釉料，还原焰下Fe²+富集，釉面乌黑如漆，又称"乌金釉"。'
  },
  persimmon: {
    name: '柿红釉',
    fe: 4, cu: 0, co: 0,
    isReduction: false, temp: 1260,
    desc: '氧化焰中三价铁主导，高温析出均匀结晶，呈现如熟透柿子般的红褐光泽。'
  },
  sauce: {
    name: '酱釉',
    fe: 5, cu: 0, co: 0,
    isReduction: false, temp: 1280,
    desc: '氧化铁含量较高的高温釉，氧化焰烧成，釉色如酱，古朴厚重。'
  },
  celadon: {
    name: '青釉',
    fe: 1.5, cu: 0, co: 0,
    isReduction: true, temp: 1260,
    desc: '还原焰中少量二价铁使釉面呈现淡雅青色，如玉般温润含蓄。'
  },
  copperRed: {
    name: '铜红釉',
    fe: 0.5, cu: 1.2, co: 0,
    isReduction: true, temp: 1280,
    desc: '以铜为着色剂，还原焰下胶体铜粒子形成红色。烧成难度极高，有"千窑一宝"之说。'
  },
  cobaltBlue: {
    name: '钴蓝釉',
    fe: 0.3, cu: 0, co: 0.8,
    isReduction: false, temp: 1260,
    desc: '钴元素着色力极强，无论氧化还是还原气氛都呈现稳定艳丽的蓝色。'
  },
  starry: {
    name: '满天星',
    fe: 7, cu: 0, co: 0,
    isReduction: true, temp: 1300,
    desc: '黑釉窑变精品。适宜温度下胎内矿物质自然沁溢，釉面形成红黄星点，如繁星满天。'
  }
};

// 窑变特殊效果（纹理叠加信息）
function getKilnEffect(params, presetKey) {
  // 返回纹理类型和强度
  const { fe, temp, isReduction } = params;

  if (presetKey === 'starry' || (fe > 5 && temp > 1280 && isReduction)) {
    return { type: 'crystals', intensity: Math.min(1, (temp - 1250) / 80), name: '结晶星点' };
  }
  if (presetKey === 'persimmon' || (fe > 3 && fe < 6 && !isReduction && temp > 1250)) {
    return { type: 'silver-sheen', intensity: 0.6, name: '银光结晶' };
  }
  if (fe > 4 && temp > 1280) {
    return { type: 'hare-fur', intensity: 0.4, name: '兔毫纹' };
  }
  return { type: 'none', intensity: 0, name: '素面' };
}

window.GlazeUtils = {
  calculateGlazeColor,
  getTempStage,
  GLAZE_PRESETS,
  getKilnEffect,
  mixColors,
  hexToRgb,
  rgbToHex
};
