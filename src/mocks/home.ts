export type SummaryStat = {
  value: string;
  unit: string;
  label: string;
};

export type WorkoutPreview = {
  date?: string;
  title: string;
  tags: string[];
  stats?: string[];
  meta?: string;
  image?: string;
};

export type HomeMockData = {
  pausedWorkouts: WorkoutPreview[];
  today: {
    date: string;
    completedStats: SummaryStat[];
    pendingStats: SummaryStat[];
  };
  recentWorkouts: WorkoutPreview[];
  weeklyStats: Array<{
    value: string;
    label: string;
  }>;
};

export const homeMockData: HomeMockData = {
  pausedWorkouts: [],
  today: {
    date: "今天 · 2026年4月5日",
    completedStats: [
      { value: "6", unit: "組", label: "訓練組數" },
      { value: "2,450", unit: "kg", label: "總重量" },
      { value: "45", unit: "分鐘", label: "時長" },
    ],
    pendingStats: [
      { value: "0", unit: "組", label: "今日完成" },
      { value: "—", unit: "kg", label: "總重量" },
      { value: "—", unit: "分鐘", label: "時長" },
    ],
  },
  recentWorkouts: [
    {
      date: "今天 · 4月5日",
      title: "胸部・肩部訓練",
      tags: ["上胸大肌", "三角肌前束"],
      stats: ["6 組", "2,450 kg", "45 分鐘"],
    },
    {
      date: "昨天 · 4月4日",
      title: "背部・手臂訓練",
      tags: ["闊背肌", "肱二頭肌"],
      stats: ["10 組", "2,800 kg", "48 分鐘"],
    },
    {
      date: "4月2日",
      title: "大腿・臀部・小腿訓練",
      tags: ["股四頭肌", "臀大肌", "腓腸肌"],
      stats: ["12 組", "4,100 kg", "65 分鐘"],
    },
  ],
  weeklyStats: [
    { value: "4", label: "次訓練" },
    { value: "210", label: "分鐘" },
    { value: "36", label: "總組數" },
    { value: "12,550", label: "kg 總重" },
  ],
};
