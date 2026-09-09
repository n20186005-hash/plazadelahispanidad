/**
 * 圣多明戈（约 18.48°N, 69.89°W）常年逐月气候参考（长期气候态，非实时）。
 *
 * 数据口径：
 * - hi / lo / rainMm：采用 NOAA 1991–2020 气候正常值（圣多明戈站）；
 * - seaC：近海典型海水温度，取自多年海洋气候态（OISST 类产品）的近似整值；
 * - suit / tags：编辑对多年平均的“宜游气候”与生态季历做出的归纳，逐年会有浮动。
 *
 * 文案层（多语言）在 messages 中按 m 下标与其对齐，本文件只维护数值与结构。
 */
export type SuitLevel = 'best' | 'good' | 'fair';

export type SeasonTag =
  | 'whale'
  | 'turtles'
  | 'hatchlings'
  | 'sargassum'
  | 'hurricane'
  | 'hurricaneCore'
  | 'festive';

export interface MonthClimate {
  /** 月份 1–12 */
  m: number;
  /** 常年日均最高气温 °C */
  hi: number;
  /** 常年日均最低气温 °C */
  lo: number;
  /** 常年月降水量 mm */
  rainMm: number;
  /** 近海典型海水温度 °C */
  seaC: number;
  /** 常年气候宜游度（编辑归纳） */
  suit: SuitLevel;
  /** 该月值得留意的自然/生态标签 */
  tags: SeasonTag[];
}

export const monthClimate: MonthClimate[] = [
  { m: 1, hi: 30.0, lo: 21.2, rainMm: 68.1, seaC: 27, suit: 'best', tags: ['whale'] },
  { m: 2, hi: 30.0, lo: 21.2, rainMm: 59.1, seaC: 26, suit: 'best', tags: ['whale'] },
  { m: 3, hi: 30.5, lo: 21.7, rainMm: 54.1, seaC: 27, suit: 'best', tags: ['whale', 'turtles'] },
  { m: 4, hi: 30.9, lo: 22.5, rainMm: 86.3, seaC: 27, suit: 'good', tags: ['turtles'] },
  { m: 5, hi: 31.3, lo: 23.5, rainMm: 151.3, seaC: 28, suit: 'good', tags: ['turtles', 'sargassum'] },
  { m: 6, hi: 31.9, lo: 24.2, rainMm: 119.0, seaC: 28, suit: 'fair', tags: ['hurricane', 'sargassum'] },
  {
    m: 7,
    hi: 32.2,
    lo: 24.2,
    rainMm: 156.7,
    seaC: 28,
    suit: 'fair',
    tags: ['hurricane', 'sargassum', 'hatchlings'],
  },
  {
    m: 8,
    hi: 32.3,
    lo: 24.3,
    rainMm: 195.0,
    seaC: 29,
    suit: 'fair',
    tags: ['hurricaneCore', 'sargassum', 'hatchlings'],
  },
  { m: 9, hi: 32.4, lo: 24.1, rainMm: 191.7, seaC: 29, suit: 'fair', tags: ['hurricaneCore', 'hatchlings'] },
  { m: 10, hi: 32.0, lo: 23.8, rainMm: 176.9, seaC: 29, suit: 'fair', tags: ['hurricaneCore', 'hatchlings'] },
  { m: 11, hi: 31.3, lo: 22.9, rainMm: 147.5, seaC: 28, suit: 'good', tags: ['hatchlings'] },
  { m: 12, hi: 30.6, lo: 21.9, rainMm: 76.5, seaC: 27, suit: 'best', tags: ['festive'] },
];

/** 月降水量柱状图的最大参考刻度（mm） */
export const MAX_MONTH_RAIN = 195;

/** 常年年降水量参考（mm），用于文案脚注 */
export const ANNUAL_RAIN_MM = 1482;
