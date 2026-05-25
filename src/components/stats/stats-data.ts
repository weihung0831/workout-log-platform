import { statsAssets } from "./stats-assets";
import { yearDataset } from "./stats-year-data";

export type PeriodKey = "week" | "month" | "quarter" | "year";

export type MetricCardData = {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: string;
  icon: string;
  iconSrc: string;
};

export type BarItem = {
  label: string;
  value: number;
  active?: boolean;
  displayValue?: string;
  desktopDisplayValue?: string;
  hiddenValue?: boolean;
  variant?: "outline" | "muted" | "muted-outline";
};

export type MuscleGroup = {
  label: string;
  value: string;
  color: string;
};

export type PrRecord = {
  title: string;
  date: string;
  desktopDate: string;
  weight: string;
  status: string;
  desktopStatus?: string;
  positive?: boolean;
  desktopOnly?: boolean;
};

export type StatsDataset = {
  rangeLabel: string;
  previousLabel: string;
  nextLabel: string;
  metricAria: string;
  metrics: MetricCardData[];
  streak?: {
    title: string;
    compactTitle?: string;
    value: string;
    unit: string;
    caption: string;
    desktopCaption?: string;
    iconSrc?: string;
  };
  duration: {
    title: string;
    suffix: string;
    subtitle: string;
    average: string;
    averageUnit?: string;
    desktopAverageUnit?: string;
    maxValue?: number;
    aria: string;
    bars: BarItem[];
  };
  muscle: {
    title: string;
    centerValue: string;
    centerLabel: string;
    gradient: string;
    variant?: "summary";
    groups: MuscleGroup[];
  };
  prRecords: PrRecord[];
};

export const periodTabs: Array<{ key: PeriodKey; label: string }> = [
  { key: "week", label: "週" },
  { key: "month", label: "月" },
  { key: "quarter", label: "季" },
  { key: "year", label: "年" },
];

export const navItems = [
  {
    label: "首頁",
    href: "/home",
    active: false,
    icon: statsAssets.navHome,
    sideIcon: statsAssets.navHomeSmall,
  },
  {
    label: "記錄",
    href: "#",
    active: false,
    icon: statsAssets.navRecord,
    sideIcon: statsAssets.navRecordSmall,
  },
  {
    label: "日誌",
    href: "#",
    active: false,
    icon: statsAssets.navJournal,
    sideIcon: statsAssets.navJournalSmall,
  },
  {
    label: "統計",
    href: "/stats",
    active: true,
    icon: statsAssets.navStatsActive,
    sideIcon: statsAssets.navStatsActiveSmall,
  },
  {
    label: "我的",
    href: "#",
    active: false,
    icon: statsAssets.navProfile,
    sideIcon: statsAssets.navProfileSmall,
  },
];

const monthDataset: StatsDataset = {
  rangeLabel: "2026年4月",
  previousLabel: "上一個月",
  nextLabel: "下一個月",
  metricAria: "本月統計摘要",
  metrics: [
    {
      id: "sessions",
      label: "本月訓練次數",
      value: "18",
      unit: "次",
      trend: "↑ 20%",
      icon: "dumbbell",
      iconSrc: statsAssets.metricDumbbell,
    },
    {
      id: "volume",
      label: "總訓練量",
      value: "24,180",
      unit: "kg",
      trend: "↑ 12%",
      icon: "trophy",
      iconSrc: statsAssets.metricTrophy,
    },
    {
      id: "active-days",
      label: "活躍天數",
      value: "15",
      unit: "天",
      trend: "↑ 25%",
      icon: "calendar",
      iconSrc: statsAssets.metricCalendar,
    },
  ],
  streak: {
    title: "當前連續訓練",
    value: "7",
    unit: "天",
    caption: "最長 21 天",
  },
  duration: {
    title: "每週訓練時長",
    suffix: "（分鐘）",
    subtitle: "近 8 週趨勢",
    average: "58",
    aria: "近 8 週訓練分鐘趨勢",
    bars: [
      { label: "W1", value: 45 },
      { label: "W2", value: 65 },
      { label: "W3", value: 30 },
      { label: "W4", value: 75 },
      { label: "W5", value: 50 },
      { label: "W6", value: 80 },
      { label: "W7", value: 60 },
      { label: "本週", value: 55, active: true },
    ],
  },
  muscle: {
    title: "肌群訓練分佈",
    centerValue: "18次",
    centerLabel: "本月",
    gradient: "conic-gradient(#ff6b35 0 30%, #4ecdc4 30% 55%, #f08080 55% 75%, #45b7d1 75% 90%, #e5e5ea 90% 100%)",
    variant: "summary",
    groups: [
      { label: "胸部", value: "30%", color: "#ff6b35" },
      { label: "背部", value: "25%", color: "#4ecdc4" },
      { label: "腿部", value: "20%", color: "#f08080" },
      { label: "肩部", value: "15%", color: "#45b7d1" },
      { label: "其他", value: "10%", color: "#e5e5ea" },
    ],
  },
  prRecords: [
    { title: "核心訓練", date: "2026 · 3月 22日 09:15", desktopDate: "3/22 09:15", weight: "100", status: "↑ +5kg", positive: true },
    { title: "胸部訓練", date: "2026 · 3月 15日 07:30", desktopDate: "3/15 07:30", weight: "120", status: "↑ +10kg", positive: true },
    { title: "背部訓練", date: "2026 · 2月 28日 10:00", desktopDate: "2/28 10:00", weight: "140", status: "↑ +15kg", positive: true },
    { title: "胸部・肩部訓練", date: "2026 · 4月 3日 08:45", desktopDate: "4/3 08:45", weight: "85", status: "↑ +5kg", positive: true },
  ],
};

export const statsDatasets: Record<PeriodKey, StatsDataset> = {
  week: {
    rangeLabel: "3/31 – 4/6",
    previousLabel: "上一週",
    nextLabel: "下一週",
    metricAria: "本週統計摘要",
    metrics: [
      {
        id: "sessions",
        label: "本週訓練次數",
        value: "4",
        unit: "次",
        trend: "↑ 33%",
        icon: "dumbbell",
        iconSrc: statsAssets.metricDumbbell,
      },
      {
        id: "volume",
        label: "本週訓練量",
        value: "6,240",
        unit: "kg",
        trend: "↑ 8%",
        icon: "trophy",
        iconSrc: statsAssets.metricTrophy,
      },
      {
        id: "active-days",
        label: "活躍天數",
        value: "4",
        unit: "天",
        trend: "↑ 週目標 5天",
        icon: "calendar",
        iconSrc: statsAssets.metricCalendar,
      },
      {
        id: "duration",
        label: "總訓練時長",
        value: "220",
        unit: "分",
        trend: "↑ 10%",
        icon: "duration",
        iconSrc: statsAssets.metricDuration,
      },
    ],
    duration: {
      title: "每日訓練時長",
      suffix: "（分鐘）",
      subtitle: "3/31 – 4/6 本週",
      average: "55",
      aria: "本週每日訓練分鐘趨勢",
      bars: [
        { label: "一", value: 60 },
        { label: "二", value: 55 },
        { label: "三", value: 10, hiddenValue: true },
        { label: "四", value: 70 },
        { label: "五", value: 35 },
        { label: "六", value: 10, hiddenValue: true },
        { label: "日", value: 10, displayValue: "今", active: true, variant: "outline" },
      ],
    },
    muscle: {
      title: "本週肌群分佈",
      centerValue: "4次",
      centerLabel: "本週",
      gradient: "conic-gradient(#ff6b35 0 40%, #4ecdc4 40% 65%, #f08080 65% 90%, #e5e5ea 90% 100%)",
      variant: "summary",
      groups: [
        { label: "胸部", value: "40%", color: "#ff6b35" },
        { label: "背部", value: "25%", color: "#4ecdc4" },
        { label: "腿部", value: "25%", color: "#f08080" },
        { label: "其他", value: "10%", color: "#e5e5ea" },
      ],
    },
    prRecords: [
      {
        title: "胸部・肩部訓練",
        date: "2026 · 4月 3日 08:45",
        desktopDate: "4/3 08:45",
        weight: "85",
        status: "↑ 本週新 PR",
        positive: true,
      },
      { title: "核心訓練", date: "2026 · 4月 1日", desktopDate: "4/1 07:00", weight: "100", status: "持平" },
      { title: "胸部訓練", date: "2026 · 3月 15日", desktopDate: "3/15 07:30", weight: "120", status: "持平", desktopOnly: true },
      { title: "背部訓練", date: "2026 · 2月 28日", desktopDate: "2/28 10:00", weight: "140", status: "持平", desktopOnly: true },
    ],
  },
  month: monthDataset,
  quarter: {
    rangeLabel: "2026 Q2",
    previousLabel: "上一季",
    nextLabel: "下一季",
    metricAria: "本季統計摘要",
    metrics: [
      {
        id: "sessions",
        label: "本季訓練次數",
        value: "21",
        unit: "次",
        trend: "↑ 40%",
        icon: "dumbbell",
        iconSrc: statsAssets.metricDumbbell,
      },
      {
        id: "volume",
        label: "本季總訓練量",
        value: "28,400",
        unit: "kg",
        trend: "↑ 18%",
        icon: "trophy",
        iconSrc: statsAssets.metricTrophy,
      },
      {
        id: "active-days",
        label: "本季活躍天數",
        value: "17",
        unit: "天",
        trend: "↑ 30%",
        icon: "calendar",
        iconSrc: statsAssets.metricCalendar,
      },
      {
        id: "covered-months",
        label: "涵蓋月份",
        value: "3",
        unit: "個月",
        trend: "4月 · 5月 · 6月",
        icon: "months",
        iconSrc: statsAssets.metricMonths,
      },
    ],
    duration: {
      title: "各季訓練次數",
      suffix: "（次）",
      subtitle: "2026 年度四季比較",
      average: "7",
      averageUnit: "次/月均",
      aria: "2026 年度四季訓練次數比較",
      bars: [
        { label: "Q1", value: 48 },
        { label: "Q2", value: 21, active: true },
        { label: "Q3", value: 16, variant: "muted-outline" },
        { label: "Q4", value: 32, variant: "muted-outline" },
      ],
    },
    muscle: {
      title: "本季肌群分佈",
      centerValue: "21次",
      centerLabel: "本季",
      gradient: "",
      variant: "summary",
      groups: [
        { label: "胸部", value: "28%", color: "#ff6b35" },
        { label: "背部", value: "24%", color: "#4ecdc4" },
        { label: "腿部", value: "20%", color: "#f08080" },
        { label: "肩部", value: "16%", color: "#45b7d1" },
        { label: "其他", value: "12%", color: "#e5e5ea" },
      ],
    },
    prRecords: [
      {
        title: "核心訓練",
        date: "4月 1日",
        desktopDate: "4/1 07:00",
        weight: "100",
        status: "↑ Q2 新 PR",
        desktopStatus: "↑ +5kg",
        positive: true,
      },
      { title: "胸部訓練", date: "3月 15日（Q1）", desktopDate: "3/15 07:30", weight: "120", status: "持平" },
      { title: "背部訓練", date: "2月 28日", desktopDate: "2/28 10:00", weight: "140", status: "持平", desktopOnly: true },
      {
        title: "胸部・肩部訓練",
        date: "4月 3日",
        desktopDate: "4/3 08:45",
        weight: "85",
        status: "↑ +5kg",
        positive: true,
        desktopOnly: true,
      },
    ],
  },
  year: yearDataset,
};
