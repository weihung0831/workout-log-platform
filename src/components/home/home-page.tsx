import Image from "next/image";

import { homeMockData, type HomeMockData, type WorkoutPreview } from "@/mocks/home";

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
    href: "/stats",
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

export function HomePage() {
  const homeState = getHomeState(homeMockData);
  const hasPausedWorkouts = homeState === "paused" || homeState === "paused-multiple";
  const isEmpty = homeState === "empty";
  const todaySummary = getTodaySummary(homeMockData);
  const recentWorkouts = getRecentWorkouts(homeMockData);
  const pageStateClass = `home-page--${homeState}`;

  return (
    <main className={`home-page ${pageStateClass}`}>
      <section className="home-shell" aria-label="FitLog 首頁">
        <HomeSidebar />
        <MobileHeader />
        <section className="home-content">
          <div className="home-content-grid">
            <div className="home-main-column">
              {hasPausedWorkouts ? (
                <PausedTrainingSection workouts={homeMockData.pausedWorkouts} />
              ) : null}
              {isEmpty ? (
                <EmptyHomeState date={homeMockData.today.date} />
              ) : (
                <>
                  <TodaySummary summary={todaySummary} />
                  <StreakCard className="home-streak--main" title="連續訓練" />
                  {!hasPausedWorkouts ? (
                    <button className="home-start-button" type="button">
                      <Image aria-hidden src={homeAssets.add} alt="" width={20} height={20} />
                      <span>開始新訓練</span>
                    </button>
                  ) : null}
                  {recentWorkouts.length > 0 ? (
                    <RecentWorkouts workouts={recentWorkouts} />
                  ) : null}
                </>
              )}
            </div>
            {!isEmpty ? (
              <aside className="home-aside" aria-label="本週摘要">
                <StreakCard title="連續訓練天數" />
                <WeeklyOverview stats={homeMockData.weeklyStats} />
              </aside>
            ) : null}
          </div>
        </section>
        <MobileTabBar />
      </section>
    </main>
  );
}

function getHomeState(data: HomeMockData) {
  if (data.pausedWorkouts.length > 1) {
    return "paused-multiple";
  }

  if (data.pausedWorkouts.length === 1) {
    return "paused";
  }

  if (data.recentWorkouts.length === 0) {
    return "empty";
  }

  return "default";
}

function MobileHeader() {
  return (
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
  );
}

function getTodaySummary(data: HomeMockData) {
  const pausedCount = data.pausedWorkouts.length;

  if (pausedCount === 1) {
    return {
      title: "繼續今日訓練",
      date: data.today.date,
      completed: false,
      stats: data.today.pendingStats,
    };
  }

  if (pausedCount > 1) {
    return {
      title: "開始今日訓練",
      date: data.today.date,
      completed: false,
      stats: data.today.pendingStats,
    };
  }

  return {
    title: "今日訓練完成",
    date: data.today.date,
    completed: true,
    stats: data.today.completedStats,
  };
}

function getRecentWorkouts(data: HomeMockData) {
  if (data.pausedWorkouts.length > 1) {
    return [];
  }

  if (data.pausedWorkouts.length === 1) {
    return data.recentWorkouts.slice(0, 1);
  }

  return data.recentWorkouts;
}

function EmptyHomeState({ date }: { date: string }) {
  return (
    <>
      <section className="home-empty-summary" aria-label="今日訓練空狀態">
        <p>{date}</p>
        <h1>還沒有訓練紀錄</h1>
        <span>開始今天的第一次訓練吧！</span>
      </section>
      <section className="home-empty-card" aria-label="開始訓練">
        <span className="home-empty-icon">
          <Image aria-hidden src={homeAssets.emptyWorkout} alt="" width={40} height={40} />
        </span>
        <h2>開始你的訓練旅程</h2>
        <p>
          記錄每一次訓練，見證自己的成長。<span>從今天開始！</span>
        </p>
        <button className="home-empty-button" type="button">
          <Image aria-hidden src={homeAssets.add} alt="" width={20} height={20} />
          <span>開始第一次訓練</span>
        </button>
      </section>
    </>
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

function PausedTrainingSection({ workouts }: { workouts: WorkoutPreview[] }) {
  return (
    <section className="home-paused" aria-labelledby="home-paused-title">
      <div className="home-paused-heading">
        <h1 id="home-paused-title">暫存中的訓練</h1>
        <span>{workouts.length}</span>
      </div>
      <div className="home-paused-list">
        {workouts.map((workout) => (
          <article className="home-paused-card" key={workout.title}>
            <div className="home-paused-card-main">
              <div className="home-paused-card-body">
                <Image
                  className="home-paused-image"
                  src={workout.image ?? homeAssets.chest}
                  alt=""
                  width={56}
                  height={56}
                />
                <div className="home-paused-copy">
                  <h2>{workout.title}</h2>
                  <p>{workout.meta}</p>
                  <div className="home-paused-tags" aria-label={`${workout.title} 訓練肌群`}>
                    {workout.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <span className="home-paused-status">暫停中</span>
            </div>
            <div className="home-paused-actions">
              <button className="home-paused-continue" type="button">
                繼續訓練
              </button>
              <button className="home-paused-delete" type="button" aria-label="刪除暫存訓練">
                <span className="home-delete-mobile" aria-hidden>
                  棄
                </span>
                <span className="home-delete-desktop">刪除</span>
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function TodaySummary({ summary }: { summary: ReturnType<typeof getTodaySummary> }) {
  return (
    <section className="home-today-card" aria-label="今日訓練摘要">
      <p>{summary.date}</p>
      <h2>
        {summary.title}
        {summary.completed ? (
          <Image aria-hidden src={homeAssets.check} alt="" width={16} height={16} />
        ) : null}
      </h2>
      <div className="home-today-stats">
        {summary.stats.map((stat) => (
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

function RecentWorkouts({ workouts }: { workouts: WorkoutPreview[] }) {
  return (
    <section className="home-recent" aria-labelledby="home-recent-title">
      <div className="home-section-heading">
        <h2 id="home-recent-title">最近訓練</h2>
        <a href="#">查看全部</a>
      </div>
      <div className="home-workout-list">
        {workouts.map((workout) => (
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
              {workout.stats?.map((stat) => {
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

function WeeklyOverview({ stats }: { stats: HomeMockData["weeklyStats"] }) {
  return (
    <section className="home-weekly-card" aria-labelledby="home-weekly-title">
      <h2 id="home-weekly-title">本週總覽</h2>
      <dl className="home-weekly-grid">
        {stats.map((stat) => (
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
