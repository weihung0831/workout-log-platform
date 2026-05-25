import { statsAssets } from "./stats-assets";

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
  emptyState?: {
    title: string;
    description: string[];
    desktopDescription?: string;
    actionLabel: string;
    caption?: string;
  };
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
