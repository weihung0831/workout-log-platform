import { weightRecordAssets } from "./weight-record-assets";

export type WeightRangeKey = "month" | "quarter" | "all";

export type WeightSummaryMetric = {
  id: string;
  label: string;
  tone: "default" | "positive" | "target";
  value: string;
  unit: string;
};

export type WeightHistoryRecord = {
  id: string;
  dateLabel: string;
  timeLabel: string;
  weightKg: string;
  delta: string;
  direction: "down" | "up";
  highlighted?: boolean;
};

export type WeightTrendPoint = {
  label: string;
  value: number;
};

export type WeightRecordDataset = {
  summary: WeightSummaryMetric[];
  trend: {
    title: string;
    yLabels: string[];
    points: WeightTrendPoint[];
  };
  history: WeightHistoryRecord[];
};

export const weightRangeTabs: Array<{ key: WeightRangeKey; label: string }> = [
  { key: "month", label: "1月" },
  { key: "quarter", label: "3月" },
  { key: "all", label: "全部" },
];

export const weightRecordDataset: WeightRecordDataset = {
  summary: [
    {
      id: "current",
      label: "目前體重",
      tone: "default",
      value: "75.2",
      unit: "kg",
    },
    {
      id: "change",
      label: "近3個月",
      tone: "positive",
      value: "-5.3",
      unit: "kg",
    },
    {
      id: "target",
      label: "目標體重",
      tone: "target",
      value: "70",
      unit: "kg",
    },
  ],
  trend: {
    title: "體重趨勢",
    yLabels: ["81", "78", "75"],
    points: [
      { label: "1/1", value: 75.0 },
      { label: "1/8", value: 75.8 },
      { label: "1/15", value: 76.2 },
      { label: "1/22", value: 76.4 },
      { label: "1/29", value: 76.8 },
      { label: "2/5", value: 77.4 },
      { label: "2/12", value: 78.0 },
      { label: "今", value: 78.6 },
    ],
  },
  history: [
    {
      id: "today",
      dateLabel: "今天 · 4月6日",
      timeLabel: "早上 07:30",
      weightKg: "75.2",
      delta: "0.3",
      direction: "down",
      highlighted: true,
    },
    {
      id: "yesterday",
      dateLabel: "昨天 · 4月5日",
      timeLabel: "早上 07:15",
      weightKg: "75.5",
      delta: "0.2",
      direction: "down",
    },
    {
      id: "apr-03",
      dateLabel: "4月3日",
      timeLabel: "早上 07:20",
      weightKg: "75.7",
      delta: "0.1",
      direction: "up",
    },
    {
      id: "apr-01",
      dateLabel: "4月1日",
      timeLabel: "早上 08:00",
      weightKg: "75.6",
      delta: "0.4",
      direction: "down",
    },
  ],
};

export const weightNavItems = [
  {
    label: "首頁",
    href: "/home",
    active: false,
    icon: weightRecordAssets.navHome,
    sideIcon: weightRecordAssets.navHomeSmall,
  },
  {
    label: "記錄",
    href: "#",
    active: false,
    icon: weightRecordAssets.navRecord,
    sideIcon: weightRecordAssets.navRecordSmall,
  },
  {
    label: "日誌",
    href: "#",
    active: false,
    icon: weightRecordAssets.navJournal,
    sideIcon: weightRecordAssets.navJournalSmall,
  },
  {
    label: "統計",
    href: "/stats",
    active: false,
    icon: weightRecordAssets.navStats,
    sideIcon: weightRecordAssets.navStatsSmall,
  },
  {
    label: "我的",
    href: "/profile/weight",
    active: true,
    icon: weightRecordAssets.navProfileActive,
    sideIcon: weightRecordAssets.navProfileActiveSmall,
  },
];
