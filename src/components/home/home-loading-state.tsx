import Image from "next/image";
import { type CSSProperties } from "react";

import { homeAssets } from "./home-assets";

const loadingNavItems = [
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

const loadingStyles: Record<string, CSSProperties> = {
  skeleton: {
    display: "block",
    flex: "0 0 auto",
    background: "#e1e3e6",
  },
  mobileHeaderCopy: {
    display: "flex",
    minWidth: 0,
    flex: "1 1 auto",
    alignItems: "center",
    gap: 4,
  },
  mobileHeaderActions: {
    display: "flex",
    flex: "0 0 auto",
    alignItems: "center",
    gap: 12,
  },
  sidebarUserCopy: {
    display: "grid",
    gap: 4,
  },
  layout: {
    display: "grid",
    width: "100%",
    gap: 16,
  },
  mainColumn: {
    display: "grid",
    width: "100%",
    gap: 16,
  },
  todayCard: {
    display: "grid",
    minHeight: 162,
    alignContent: "start",
    gap: 10,
    border: "1px solid #dfe2e6",
    borderRadius: 28,
    background: "#eceef1",
    boxShadow: "0 2px 8px rgba(31, 35, 40, 0.04)",
    padding: 24,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 12,
    marginTop: 14,
  },
  stat: {
    display: "grid",
    minWidth: 0,
    gap: 6,
  },
  streakCard: {
    display: "flex",
    minHeight: 92,
    alignItems: "center",
    gap: 12,
    border: "1px solid #e6e8eb",
    borderRadius: 28,
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(31, 35, 40, 0.04)",
    padding: 24,
  },
  streakCopy: {
    display: "grid",
    minWidth: 0,
    flex: "1 1 auto",
    gap: 6,
  },
  recent: {
    display: "grid",
    gap: 12,
  },
  recentHeading: {
    display: "flex",
    minHeight: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  workoutCard: {
    display: "grid",
    minHeight: 140,
    alignContent: "start",
    gap: 8,
    border: "1px solid #e6e8eb",
    borderRadius: 28,
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(31, 35, 40, 0.04)",
    padding: 24,
  },
  tags: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    marginTop: 2,
  },
  weeklyCard: {
    display: "grid",
    minHeight: 210,
    gap: 14,
    border: "1px solid #e6e8eb",
    borderRadius: 28,
    background: "#ffffff",
    boxShadow: "0 2px 8px rgba(31, 35, 40, 0.04)",
    padding: 24,
  },
  weeklyGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: 12,
  },
};

type SkeletonProps = {
  className?: string;
  width: CSSProperties["width"];
  height?: CSSProperties["height"];
  radius?: CSSProperties["borderRadius"];
  style?: CSSProperties;
};

function Skeleton({ className, width, height = 12, radius = 6, style }: SkeletonProps) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        ...loadingStyles.skeleton,
        width,
        height,
        borderRadius: radius,
        ...style,
      }}
    />
  );
}

export function HomeLoadingScreen() {
  return (
    <main className="home-page home-page--loading" aria-busy="true">
      <section className="home-shell" aria-label="FitLog 首頁讀取中">
        <HomeLoadingSidebar />
        <MobileHeaderLoading />
        <section className="home-content">
          <div className="home-content-grid">
            <HomeLoadingLayout />
          </div>
        </section>
        <LoadingMobileTabBar />
      </section>
    </main>
  );
}

export function MobileHeaderLoading() {
  return (
    <div className="home-mobile-header home-mobile-header--loading" aria-hidden>
      <div style={loadingStyles.mobileHeaderCopy}>
        <Skeleton width={60} />
        <Skeleton width={100} height={18} />
      </div>
      <div style={loadingStyles.mobileHeaderActions}>
        <Skeleton width={36} height={36} radius="50%" />
        <Skeleton width={36} height={36} radius="50%" />
      </div>
    </div>
  );
}

export function HomeLoadingLayout() {
  return (
    <div className="home-loading-layout" style={loadingStyles.layout}>
      <div
        className="home-main-column home-loading-main"
        role="status"
        aria-label="首頁資料讀取中"
        style={loadingStyles.mainColumn}
      >
        <section className="home-loading-today" aria-hidden style={loadingStyles.todayCard}>
          <Skeleton width={120} />
          <Skeleton width={180} height={22} />
          <div style={loadingStyles.statsGrid}>
            {[0, 1, 2].map((item) => (
              <span key={item} style={loadingStyles.stat}>
                <Skeleton width="100%" height={28} />
                <Skeleton width="100%" />
              </span>
            ))}
          </div>
        </section>
        <LoadingStreakCard className="home-loading-streak--main" />
        <Skeleton className="home-loading-button" width="100%" height={54} radius={16} />
        <section className="home-loading-recent" aria-hidden style={loadingStyles.recent}>
          <div className="home-loading-recent-heading" style={loadingStyles.recentHeading}>
            <Skeleton width={80} />
            <Skeleton width={60} />
          </div>
          <LoadingWorkoutCard variant="primary" />
          <LoadingWorkoutCard variant="secondary" />
        </section>
      </div>
      <aside className="home-aside home-loading-aside" aria-label="本週摘要讀取中">
        <LoadingStreakCard />
        <section className="home-loading-weekly" aria-hidden style={loadingStyles.weeklyCard}>
          <Skeleton width={80} height={16} />
          <div style={loadingStyles.weeklyGrid}>
            {[0, 1, 2, 3].map((item) => (
              <Skeleton key={item} width="100%" height={60} radius={10} />
            ))}
          </div>
        </section>
      </aside>
    </div>
  );
}

function HomeLoadingSidebar() {
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
        {loadingNavItems.map((item) => (
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
      <div className="home-sidebar-user home-sidebar-user--loading" aria-hidden>
        <Skeleton width={32} height={32} radius="50%" />
        <div style={loadingStyles.sidebarUserCopy}>
          <Skeleton width={60} />
          <Skeleton width={100} />
        </div>
      </div>
    </aside>
  );
}

function LoadingMobileTabBar() {
  return (
    <nav className="home-tabbar" aria-label="主要導覽">
      {loadingNavItems.map((item) => (
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

function LoadingStreakCard({ className }: { className?: string }) {
  return (
    <section
      className={className ? `home-loading-streak ${className}` : "home-loading-streak"}
      aria-hidden
      style={loadingStyles.streakCard}
    >
      <Skeleton width={44} height={44} radius={12} />
      <span style={loadingStyles.streakCopy}>
        <Skeleton width={80} height={14} />
        <Skeleton width={140} />
      </span>
      <Skeleton width={40} height={40} radius={8} />
    </section>
  );
}

function LoadingWorkoutCard({ variant }: { variant: "primary" | "secondary" }) {
  const isPrimary = variant === "primary";

  return (
    <article className="home-loading-workout" style={loadingStyles.workoutCard}>
      <Skeleton width={isPrimary ? 100 : 80} />
      <Skeleton width={isPrimary ? 160 : 140} height={16} />
      <span style={loadingStyles.tags}>
        <Skeleton width={50} height={22} radius={999} />
        {isPrimary ? <Skeleton width={50} height={22} radius={999} /> : null}
      </span>
      <span style={loadingStyles.meta}>
        <Skeleton width={50} />
        <Skeleton width={70} />
        {isPrimary ? <Skeleton width={60} /> : null}
      </span>
    </article>
  );
}
