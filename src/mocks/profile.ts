export type UnitSystem = "kg" | "lbs";

export type ProfileSummaryStat = {
  label: string;
  value: string;
  active?: boolean;
  icon?: "streak";
};

export type ProfileBodyMetric = {
  label: string;
  value: string;
  unit?: string;
};

export type ProfileGoal = {
  label: string;
  value: string;
  progress: number;
  tone: "orange" | "mint" | "cyan";
  desktopOnly?: boolean;
};

export type ProfileAction = {
  id: string;
  label: string;
  caption?: string;
  icon: "scale" | "target" | "bell" | "lock" | "logout" | "trash";
  tone: "orange" | "mint" | "blue" | "yellow" | "red";
  danger?: boolean;
};

export const profileMockData = {
  user: {
    avatar: "陳",
    name: "陳先仁",
    subtitle: "健身 12 週 · 加入於 2026年1月",
    sidebarCaption: "健身 · 12週",
  },
  summaryStats: [
    { label: "次訓練", value: "86" },
    { label: "最長連續天", value: "21" },
    { label: "當前連續", value: "7", active: true, icon: "streak" },
  ] satisfies ProfileSummaryStat[],
  bodyMetrics: [
    { label: "體重", value: "75.2", unit: "kg" },
    { label: "身高", value: "178", unit: "cm" },
    { label: "BMI", value: "23.7" },
  ] satisfies ProfileBodyMetric[],
  goals: [
    { label: "每週訓練次數", value: "4/5 次", progress: 80, tone: "orange" },
    { label: "目標體重", value: "75.2→70 kg", progress: 47, tone: "mint" },
    { label: "每月訓練量", value: "24,180/30,000", progress: 80, tone: "cyan", desktopOnly: true },
  ] satisfies ProfileGoal[],
  weightRecord: {
    label: "體重紀錄",
    caption: "最新：75.2 kg · 今天",
  },
  reminder: {
    label: "訓練提醒",
    caption: "每天 07:00",
  },
  accountActions: [
    { id: "privacy", label: "隱私與安全", icon: "lock", tone: "blue" },
    { id: "logout", label: "登出", icon: "logout", tone: "orange" },
    { id: "delete", label: "刪除帳號", icon: "trash", tone: "red", danger: true },
  ] satisfies ProfileAction[],
};
