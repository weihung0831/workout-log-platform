import Image from "next/image";

import { homeAssets } from "./home-assets";

const navItems = [
  {
    label: "首頁",
    href: "/home",
    active: true,
    icon: homeAssets.navHomeActive,
    sideIcon: homeAssets.navHomeActiveSmall,
  },
  {
    label: "記錄",
    href: "#",
    active: false,
    icon: homeAssets.navRecord,
    sideIcon: homeAssets.navRecordSmall,
  },
  {
    label: "日誌",
    href: "#",
    active: false,
    icon: homeAssets.navJournal,
    sideIcon: homeAssets.navJournalSmall,
  },
  {
    label: "統計",
    href: "#",
    active: false,
    icon: homeAssets.navStats,
    sideIcon: homeAssets.navStatsSmall,
  },
  {
    label: "我的",
    href: "#",
    active: false,
    icon: homeAssets.navProfile,
    sideIcon: homeAssets.navProfileSmall,
  },
];

const todayStats = [
  { value: "6", unit: "組", label: "訓練組數" },
  { value: "2,450", unit: "kg", label: "總重量" },
  { value: "45", unit: "分鐘", label: "時長" },
];

const recentWorkouts = [
  {
    date: "昨天 · 4月4日",
    title: "胸部・肩部訓練",
    tags: ["上胸大肌", "三角肌前束"],
    stats: ["8 組", "3,200 kg", "52 分鐘"],
  },
  {
    date: "4月2日",
    title: "背部・手臂訓練",
    tags: ["闊背肌", "肱二頭肌"],
    stats: ["10 組", "2,800 kg", "48 分鐘"],
  },
  {
    date: "3月31日",
    title: "大腿・臀部・小腿訓練",
    tags: ["股四頭肌", "臀大肌", "腓腸肌"],
    stats: ["12 組", "4,100 kg", "65 分鐘"],
  },
];

const weeklyStats = [
  { value: "4", label: "次訓練" },
  { value: "210", label: "分鐘" },
  { value: "36", label: "總組數" },
  { value: "12,550", label: "kg 總重" },
];

export function HomePage() {
  return (
    <main className="home-page">
      <section className="home-shell" aria-label="FitLog 首頁">
        <HomeSidebar />
        <div className="home-mobile-header">
          <div className="home-greeting">
            <span>早安，</span>
            <strong>Alex</strong>
            <Image
              aria-hidden
              className="home-greeting-mark"
              src={homeAssets.greetingMark}
              alt=""
              width={18}
              height={18}
            />
          </div>
          <span className="home-avatar home-avatar--mobile">A</span>
        </div>
        <section className="home-content">
          <div className="home-content-grid">
            <div className="home-main-column">
              <TodaySummary />
              <StreakCard className="home-streak--main" title="連續訓練" />
              <button className="home-start-button" type="button">
                <Image aria-hidden src={homeAssets.add} alt="" width={20} height={20} />
                <span>開始新訓練</span>
              </button>
              <RecentWorkouts />
            </div>
            <aside className="home-aside" aria-label="本週摘要">
              <StreakCard title="連續訓練天數" />
              <WeeklyOverview />
            </aside>
          </div>
        </section>
        <MobileTabBar />
      </section>
    </main>
  );
}

function HomeSidebar() {
  return (
    <aside className="home-sidebar" aria-label="主要導覽">
      <div className="home-sidebar-logo">
        <Image
          className="home-sidebar-logo-image"
          src={homeAssets.logo}
          alt="FitLog"
          width={371}
          height={112}
          priority
        />
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

function TodaySummary() {
  return (
    <section className="home-today-card" aria-label="今日訓練摘要">
      <p>今天 · 2026年4月5日</p>
      <h1>
        今日訓練完成
        <Image aria-hidden src={homeAssets.check} alt="" width={16} height={16} />
      </h1>
      <div className="home-today-stats">
        {todayStats.map((stat) => (
          <div className="home-today-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.unit}</span>
            <em>{stat.label}</em>
          </div>
        ))}
      </div>
    </section>
  );
}

function StreakCard({ className, title }: { className?: string; title: string }) {
  return (
    <section className={className ? `home-streak-card ${className}` : "home-streak-card"}>
      <div className="home-streak-copy">
        <span className="home-streak-icon">
          <Image aria-hidden src={homeAssets.streak} alt="" width={22} height={22} />
        </span>
        <div>
          <h2>{title}</h2>
          <p>保持節奏，繼續加油！</p>
        </div>
      </div>
      <div className="home-streak-days">
        <strong>7</strong>
        <span>天</span>
      </div>
    </section>
  );
}

function RecentWorkouts() {
  return (
    <section className="home-recent" aria-labelledby="home-recent-title">
      <div className="home-section-heading">
        <h2 id="home-recent-title">最近訓練</h2>
        <a href="#">查看全部</a>
      </div>
      <div className="home-workout-list">
        {recentWorkouts.map((workout) => (
          <article className="home-workout-card" key={workout.title}>
            <div className="home-workout-head">
              <div>
                <p>{workout.date}</p>
                <h3>{workout.title}</h3>
              </div>
              <Image aria-hidden src={homeAssets.chevron} alt="" width={18} height={18} />
            </div>
            <div className="home-workout-tags" aria-label={`${workout.title} 訓練肌群`}>
              {workout.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <dl className="home-workout-stats">
              {workout.stats.map((stat) => {
                const [value, ...unit] = stat.split(" ");
                return (
                  <div key={stat}>
                    <dt>{unit.join(" ")}</dt>
                    <dd>{value}</dd>
                  </div>
                );
              })}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

function WeeklyOverview() {
  return (
    <section className="home-weekly-card" aria-labelledby="home-weekly-title">
      <h2 id="home-weekly-title">本週總覽</h2>
      <dl className="home-weekly-grid">
        {weeklyStats.map((stat) => (
          <div key={stat.label}>
            <dt>{stat.label}</dt>
            <dd>{stat.value}</dd>
          </div>
        ))}
      </dl>
    </section>
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
