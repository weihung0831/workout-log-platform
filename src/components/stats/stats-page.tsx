import Image from "next/image";
import type { CSSProperties } from "react";

import { statsAssets } from "./stats-assets";

const periodTabs = ["週", "月", "季", "年"];

const navItems = [
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

const metricCards = [
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
];

const barData = [
  { label: "W1", value: 45 },
  { label: "W2", value: 65 },
  { label: "W3", value: 30 },
  { label: "W4", value: 75 },
  { label: "W5", value: 50 },
  { label: "W6", value: 80 },
  { label: "W7", value: 60 },
  { label: "本週", value: 55, active: true },
];

const muscleGroups = [
  { label: "胸部", value: "30%", color: "#ff6b35" },
  { label: "背部", value: "25%", color: "#4ecdc4" },
  { label: "腿部", value: "20%", color: "#f08080" },
  { label: "肩部", value: "15%", color: "#45b7d1" },
  { label: "其他", value: "10%", color: "#e5e5ea" },
];

const prRecords = [
  { title: "核心訓練", date: "2026 · 3月 22日 09:15", desktopDate: "3/22 09:15", weight: "100", delta: "+5kg" },
  { title: "胸部訓練", date: "2026 · 3月 15日 07:30", desktopDate: "3/15 07:30", weight: "120", delta: "+10kg" },
  { title: "背部訓練", date: "2026 · 2月 28日 10:00", desktopDate: "2/28 10:00", weight: "140", delta: "+15kg" },
  { title: "胸部・肩部訓練", date: "2026 · 4月 3日 08:45", desktopDate: "4/3 08:45", weight: "85", delta: "+5kg" },
];

const maxChartValue = Math.max(...barData.map((item) => item.value));

export function StatsPage() {
  return (
    <main className="stats-page">
      <section className="stats-shell" aria-label="FitLog 統計分析">
        <StatsSidebar />
        <MobileHeader />
        <section className="stats-workspace">
          <DesktopHeader />
          <StatsContent />
        </section>
        <MobileTabBar />
      </section>
    </main>
  );
}

function MobileHeader() {
  return (
    <header className="stats-mobile-header">
      <h1>統計分析</h1>
      <MonthSwitcher size="compact" />
    </header>
  );
}

function DesktopHeader() {
  return (
    <header className="stats-desktop-header">
      <h1>統計分析</h1>
      <div className="stats-desktop-tools">
        <PeriodTabs />
        <MonthSwitcher />
        <span className="stats-avatar">陳</span>
      </div>
    </header>
  );
}

function StatsContent() {
  return (
    <div className="stats-content">
      <div className="stats-mobile-tabs">
        <PeriodTabs />
      </div>
      <section className="stats-metric-grid" aria-label="本月統計摘要">
        {metricCards.map((card) => (
          <MetricCard key={card.id} {...card} />
        ))}
        <StreakCard />
      </section>
      <div className="stats-analysis-grid">
        <TrainingDurationCard />
        <MuscleDistributionCard />
      </div>
      <PrRecordsCard />
    </div>
  );
}

function PeriodTabs() {
  return (
    <div className="stats-period-tabs" role="tablist" aria-label="統計週期">
      {periodTabs.map((period) => (
        <button
          aria-selected={period === "月"}
          className={period === "月" ? "stats-period-tab stats-period-tab--active" : "stats-period-tab"}
          key={period}
          role="tab"
          type="button"
        >
          {period}
        </button>
      ))}
    </div>
  );
}

function MonthSwitcher({ size = "default" }: { size?: "default" | "compact" }) {
  return (
    <div className={`stats-month-switcher stats-month-switcher--${size}`} aria-label="目前月份">
      <button aria-label="上一個月" type="button">
        <ChevronIcon direction="left" />
      </button>
      <strong>2026年4月</strong>
      <button aria-label="下一個月" type="button">
        <ChevronIcon direction="right" />
      </button>
    </div>
  );
}

function MetricCard({
  icon,
  iconSrc,
  label,
  trend,
  unit,
  value,
}: {
  icon: string;
  iconSrc: string;
  label: string;
  trend: string;
  unit: string;
  value: string;
}) {
  return (
    <article className={`stats-metric-card stats-metric-card--${icon}`}>
      <div className="stats-metric-card-top">
        <span className="stats-metric-icon" aria-hidden>
          <Image aria-hidden src={iconSrc} alt="" width={18} height={18} />
        </span>
        <span className="stats-trend-badge">{trend}</span>
      </div>
      <p className="stats-metric-value">
        <strong>{value}</strong>
        <span>{unit}</span>
      </p>
      <p className="stats-metric-label">{label}</p>
    </article>
  );
}

function StreakCard() {
  return (
    <article className="stats-streak-card">
      <div className="stats-streak-title">
        <Image aria-hidden src={statsAssets.streakFlame} alt="" width={16} height={16} />
        <span>當前連續訓練</span>
      </div>
      <p>
        <strong>7</strong>
        <span>天</span>
      </p>
      <small>最長 21 天</small>
    </article>
  );
}

function TrainingDurationCard() {
  return (
    <section className="stats-panel stats-duration-card" aria-labelledby="stats-duration-title">
      <div className="stats-panel-heading">
        <div>
          <h2 id="stats-duration-title">
            每週訓練時長<span>（分鐘）</span>
          </h2>
          <p>近 8 週趨勢</p>
        </div>
        <p className="stats-average">
          <strong>58</strong>
          <span>分均</span>
        </p>
      </div>
      <div className="stats-bar-plot" aria-label="近 8 週訓練分鐘趨勢">
        {barData.map((item) => (
          <div className="stats-bar-column" key={item.label}>
            <span className={item.active ? "stats-bar-value stats-bar-value--active" : "stats-bar-value"}>
              {item.value}
            </span>
            <span
              className={item.active ? "stats-bar stats-bar--active" : "stats-bar"}
              style={{ "--bar-height": `${(item.value / maxChartValue) * 100}%` } as CSSProperties}
            />
            <span className={item.active ? "stats-bar-label stats-bar-label--active" : "stats-bar-label"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function MuscleDistributionCard() {
  return (
    <section className="stats-panel stats-muscle-card" aria-labelledby="stats-muscle-title">
      <h2 id="stats-muscle-title">肌群訓練分佈</h2>
      <div className="stats-muscle-content">
        <div className="stats-donut" aria-hidden>
          <div className="stats-donut-center">
            <strong>18次</strong>
            <span>本月</span>
          </div>
        </div>
        <dl className="stats-muscle-list">
          {muscleGroups.map((group) => (
            <div key={group.label}>
              <dt>
                <span style={{ backgroundColor: group.color }} />
                {group.label}
              </dt>
              <dd>{group.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function PrRecordsCard() {
  return (
    <section className="stats-panel stats-pr-card" aria-labelledby="stats-pr-title">
      <h2 id="stats-pr-title">PR 紀錄</h2>
      <div className="stats-pr-list">
        {prRecords.map((record) => (
          <article className="stats-pr-record" key={record.title}>
            <div className="stats-pr-main">
              <span className="stats-pr-icon" aria-hidden>
                <Image aria-hidden src={statsAssets.prRecord} alt="" width={18} height={18} />
              </span>
              <div>
                <h3>{record.title}</h3>
                <p>{record.date}</p>
              </div>
            </div>
            <div className="stats-pr-result">
              <p>
                <strong>{record.weight}</strong>
                <span>kg</span>
              </p>
              <small>
                ↑ {record.delta}
                <span> · {record.desktopDate}</span>
              </small>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function StatsSidebar() {
  return (
    <aside className="home-sidebar" aria-label="主要導覽">
      <div className="home-sidebar-logo">
        <Image className="home-sidebar-logo-image" src={statsAssets.logo} alt="FitLog" width={371} height={112} priority />
      </div>
      <nav className="home-sidebar-nav" aria-label="主要導覽">
        {navItems.map((item) => (
          <a
            aria-current={item.active ? "page" : undefined}
            className={item.active ? "home-nav-link home-nav-link--active" : "home-nav-link"}
            href={item.href}
            key={item.label}
          >
            <Image aria-hidden src={item.sideIcon} alt="" width={20} height={20} />
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="home-sidebar-user">
        <span className="home-avatar">陳</span>
        <div>
          <strong>陳先仁</strong>
          <span>健身 · 12週</span>
        </div>
      </div>
    </aside>
  );
}

function MobileTabBar() {
  return (
    <nav className="home-tabbar" aria-label="主要導覽">
      {navItems.map((item) => (
        <a
          aria-current={item.active ? "page" : undefined}
          className={item.active ? "home-tabbar-link home-tabbar-link--active" : "home-tabbar-link"}
          href={item.href}
          key={item.label}
        >
          <Image aria-hidden src={item.icon} alt="" width={24} height={24} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 20 20" aria-hidden>
      <path d={direction === "left" ? "M12 5 7 10l5 5" : "m8 5 5 5-5 5"} />
    </svg>
  );
}
