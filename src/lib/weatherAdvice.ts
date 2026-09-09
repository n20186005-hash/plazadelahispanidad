/**
 * 面向普通游客的天气“智能建议”引擎（纯函数，无 I18n 依赖）。
 *
 * 思路：根据当日预报（天气状况 / 最高最低温 / 降水概率 / 最大风力 / 紫外线）
 * 直接产出「可执行的建议」，而不是让游客自己看数据猜测该干嘛。
 *
 * 输出为 { group, key } 列表，key 指向多语文案；不满足条件的条目直接不返回，
 * 从而保证界面只展示“有用”的提示。group 用于分类：
 *   risk  → 风险提醒（置顶，有才显示）
 *   outfit/play/items → 出行穿搭 / 游玩安排 / 随身物品
 */

export type AdviceGroup = 'risk' | 'outfit' | 'play' | 'items';

export type AdviceItem = {
  group: AdviceGroup;
  key: string;
};

/** WMO 天气码 → 当日降雨强度大类 */
type RainKind = 'none' | 'light' | 'heavy' | 'thunder' | 'fog';

function rainKind(code: number): RainKind {
  if (code >= 95) return 'thunder'; // 雷暴 95-99
  if (code === 45 || code === 48) return 'fog';
  // 毛毛雨 51-57 / 小雨 61,66 / 小阵雨 80
  if ((code >= 51 && code <= 57) || code === 61 || code === 66 || code === 80) return 'light';
  // 中到大雨 63,65,67 / 强阵雨 81,82
  if (code === 63 || code === 65 || code === 67 || code === 81 || code === 82) return 'heavy';
  return 'none';
}

export function uvLevelLabel(value: number): 'low' | 'moderate' | 'strong' | 'veryStrong' {
  if (value < 3) return 'low';
  if (value < 5) return 'moderate';
  if (value < 8) return 'strong';
  return 'veryStrong';
}

export type DailyAdviceInput = {
  code: number;
  max: number | null;
  min: number | null;
  precip: number | null;
  windMax: number | null;
  uvMax: number | null;
};

export function dailyAdvice(day: DailyAdviceInput, humidity: number | null): AdviceItem[] {
  const out: AdviceItem[] = [];
  const add = (group: AdviceGroup, key: string) => {
    if (!out.some((x) => x.key === key)) out.push({ group, key });
  };

  const kind = rainKind(day.code);
  const pp = day.precip;
  const wind = day.windMax;
  const uv = day.uvMax;
  const max = day.max;
  const min = day.min;
  const diff = typeof max === 'number' && typeof min === 'number' ? max - min : null;

  /* ---------- 降水相关 ---------- */
  if (kind === 'fog') {
    // 大雾
    add('risk', 'fogRisk');
    add('play', 'fogPlay');
    add('items', 'fogItems');
  } else if (kind === 'thunder') {
    // 雷雨
    add('risk', 'stormRisk');
    add('play', 'stormPlay');
    add('items', 'stormItems');
  } else if (kind === 'heavy') {
    // 中到大雨
    add('risk', 'heavyRisk');
    add('play', 'heavyPlay');
    add('items', 'heavyItems');
  } else if (kind === 'light') {
    // 小雨 / 毛毛雨 / 小阵雨
    add('outfit', 'lightOutfit');
    add('play', 'lightPlay');
    add('items', 'lightItems');
  } else if (typeof pp === 'number' && pp >= 60) {
    // 无降水码但概率很高（提醒 ≠ 一定下）
    add('outfit', 'precipOutfit');
    add('play', 'precipPlay');
    add('items', 'precipItems');
  }

  /* ---------- 风力 ---------- */
  if (typeof wind === 'number') {
    if (wind >= 50) {
      // ≥7 级
      add('risk', 'windRisk');
      add('play', 'windStrongPlay');
    } else if (wind >= 29) {
      // 5-6 级
      add('outfit', 'windOutfit');
      add('play', 'windPlay');
      add('items', 'windItems');
    }
  }

  /* ---------- 低温 / 温差 ---------- */
  if (typeof max === 'number' && max <= 10) {
    add('outfit', 'coldOutfit');
    add('items', 'coldItems');
  } else if (typeof diff === 'number' && diff > 8) {
    add('outfit', 'diffOutfit');
  }

  /* ---------- 高温 ---------- */
  if (typeof max === 'number' && max >= 32) {
    add('outfit', 'heatOutfit');
    add('play', 'heatPlay');
    add('items', 'heatItems');
  }

  /* ---------- 紫外线 ---------- */
  if (typeof uv === 'number' && uv >= 5) {
    add('outfit', 'uvOutfit');
    add('items', 'uvItems');
  }

  /* ---------- 高湿闷热（把“湿度数字”翻译成人话） ---------- */
  if (
    typeof humidity === 'number' &&
    typeof max === 'number' &&
    humidity >= 78 &&
    max >= 27 &&
    kind === 'none'
  ) {
    add('outfit', 'humidOutfit');
  }

  /* ---------- 晴天 / 阴天（仅无雨时补充） ---------- */
  const pleasant = kind === 'none' && (day.code === 0 || day.code === 1 || day.code === 2);
  const cloudy = kind === 'none' && day.code === 3;

  if (pleasant) {
    if (typeof max !== 'number' || max < 32) add('play', 'sunnyPlay');
  } else if (cloudy) {
    add('outfit', 'overcastOutfit');
    add('play', 'overcastPlay');
  }

  return out;
}
