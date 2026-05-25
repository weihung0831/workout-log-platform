"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import { AppSidebar } from "@/components/navigation/app-sidebar";

import { statsAssets } from "./stats-assets";
import {
  navItems,
  periodTabs,
  statsDatasets,
  type MetricCardData,
  type PeriodKey,
  type PrRecord,
  type StatsDataset,
} from "./stats-data";

const sidebarUser = {
  avatar: "陳",
  name: "陳先仁",
  caption: "健身 · 12週",
};

export function StatsPage() {
  const [activePeriod, setActivePeriod] = useState<PeriodKey>("month");
  const statsData = statsDatasets[activePeriod];

  return (
    <main className="stats-page">
      <section className="stats-shell" aria-label="FitLog 統計分析">
        <AppSidebar items={navItems} logoSrc={statsAssets.logo} user={sidebarUser} />
        <MobileHeader statsData={statsData} />
        <section className="stats-workspace">
          <DesktopHeader activePeriod={activePeriod} onPeriodChange={setActivePeriod} statsData={statsData} />
          <StatsContent activePeriod={activePeriod} onPeriodChange={setActivePeriod} statsData={statsData} />
        </section>
        <MobileTabBar />
      </section>
    </main>
  );
}

function MobileHeader({
  statsData,
}: {
  statsData: StatsDataset;
}) {
  return (
    <header className="stats-mobile-header">
      <h1>統計分析</h1>
      <RangeSwitcher size="compact" statsData={statsData} />
    </header>
  );
}

function DesktopHeader({
  activePeriod,
  onPeriodChange,
  statsData,
}: {
  activePeriod: PeriodKey;
  onPeriodChange: (period: PeriodKey) => void;
  statsData: StatsDataset;
}) {
  return (
    <header className="stats-desktop-header">
      <h1>統計分析</h1>
      <div className="stats-desktop-tools">
        <PeriodTabs activePeriod={activePeriod} onPeriodChange={onPeriodChange} />
        <RangeSwitcher statsData={statsData} />
        <span className="stats-avatar">陳</span>
      </div>
    </header>
  );
}

function StatsContent({
  activePeriod,
  onPeriodChange,
  statsData,
}: {
  activePeriod: PeriodKey;
  onPeriodChange: (period: PeriodKey) => void;
  statsData: StatsDataset;
}) {
  return (
    <div className={`stats-content stats-content--${activePeriod}`}>
      <div className="stats-mobile-tabs">
        <PeriodTabs activePeriod={activePeriod} onPeriodChange={onPeriodChange} />
      </div>
      <section className="stats-metric-grid" aria-label={statsData.metricAria}>
        {statsData.metrics.map((card) => (
          <MetricCard key={card.id} {...card} />
        ))}
        {statsData.streak ? <StreakCard streak={statsData.streak} /> : null}
      </section>
      <div className="stats-analysis-grid">
        <TrainingDurationCard duration={statsData.duration} />
        <MuscleDistributionCard muscle={statsData.muscle} />
      </div>
      <PrRecordsCard records={statsData.prRecords} />
    </div>
  );
}

function PeriodTabs({
  activePeriod,
  onPeriodChange,
}: {
  activePeriod: PeriodKey;
  onPeriodChange: (period: PeriodKey) => void;
}) {
  return (
    <div className="stats-period-tabs" role="tablist" aria-label="統計週期">
      {periodTabs.map((period) => (
        <button
          aria-selected={period.key === activePeriod}
          className={period.key === activePeriod ? "stats-period-tab stats-period-tab--active" : "stats-period-tab"}
          key={period.key}
          onClick={() => onPeriodChange(period.key)}
          role="tab"
          type="button"
        >
          {period.label}
        </button>
      ))}
    </div>
  );
}

function RangeSwitcher({
  size = "default",
  statsData,
}: {
  size?: "default" | "compact";
  statsData: StatsDataset;
}) {
  return (
    <div className={`stats-month-switcher stats-month-switcher--${size}`} aria-label="目前週期">
      <button aria-label={statsData.previousLabel} type="button">
        <Image aria-hidden src={statsAssets.rangePrevious} alt="" width={14} height={14} />
      </button>
      <strong>{statsData.rangeLabel}</strong>
      <button aria-label={statsData.nextLabel} type="button">
        <Image aria-hidden src={statsAssets.rangeNext} alt="" width={14} height={14} />
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
}: MetricCardData) {
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

function StreakCard({ streak }: { streak: NonNullable<StatsDataset["streak"]> }) {
  return (
    <article className="stats-streak-card">
      <div className="stats-streak-title">
        <Image aria-hidden src={statsAssets.streakFlame} alt="" width={16} height={16} />
        <span>{streak.title}</span>
      </div>
      <p>
        <strong>{streak.value}</strong>
        <span>{streak.unit}</span>
      </p>
      <small>{streak.caption}</small>
    </article>
  );
}

function TrainingDurationCard({ duration }: { duration: StatsDataset["duration"] }) {
  const maxChartValue = Math.max(...duration.bars.map((item) => item.value));

  return (
    <section className="stats-panel stats-duration-card" aria-labelledby="stats-duration-title">
      <div className="stats-panel-heading">
        <div>
          <h2 id="stats-duration-title">
            {duration.title}
            <span>{duration.suffix}</span>
          </h2>
          <p>{duration.subtitle}</p>
        </div>
        <p className="stats-average">
          <strong>{duration.average}</strong>
          <span>分均</span>
        </p>
      </div>
      <div
        className="stats-bar-plot"
        aria-label={duration.aria}
        style={{ "--bar-count": duration.bars.length } as CSSProperties}
      >
        {duration.bars.map((item) => {
          const isOutlined = item.variant === "outline";
          const barStyle = {
            "--bar-height": `${(item.value / maxChartValue) * 100}%`,
            backgroundColor: item.hiddenValue ? "#e5e5ea" : undefined,
          } as CSSProperties;

          return (
            <div className="stats-bar-column" key={item.label}>
              <span className={item.active && !isOutlined ? "stats-bar-value stats-bar-value--active" : "stats-bar-value"}>
                {item.hiddenValue ? "" : item.displayValue ?? item.value}
              </span>
              <span
                className={[
                  "stats-bar",
                  item.active ? "stats-bar--active" : "",
                  isOutlined ? "stats-bar--outline" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                style={barStyle}
              />
              <span className={item.active ? "stats-bar-label stats-bar-label--active" : "stats-bar-label"}>
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function MuscleDistributionCard({ muscle }: { muscle: StatsDataset["muscle"] }) {
  return (
    <section className="stats-panel stats-muscle-card" aria-labelledby="stats-muscle-title">
      <h2 id="stats-muscle-title">{muscle.title}</h2>
      <div className="stats-muscle-content">
        <div className="stats-donut" aria-hidden style={{ background: muscle.gradient }}>
          <div className="stats-donut-center">
            <strong>{muscle.centerValue}</strong>
            <span>{muscle.centerLabel}</span>
          </div>
        </div>
        <dl className="stats-muscle-list">
          {muscle.groups.map((group) => (
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

function PrRecordsCard({ records }: { records: PrRecord[] }) {
  return (
    <section className="stats-panel stats-pr-card" aria-labelledby="stats-pr-title">
      <h2 id="stats-pr-title">PR 紀錄</h2>
      <div className="stats-pr-list">
        {records.map((record) => (
          <article
            className={record.desktopOnly ? "stats-pr-record stats-pr-record--desktop-extra" : "stats-pr-record"}
            key={record.title}
          >
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
              <small className={record.positive ? "stats-pr-status stats-pr-status--positive" : "stats-pr-status"}>
                {record.status}
                <span> · {record.desktopDate}</span>
              </small>
            </div>
          </article>
        ))}
      </div>
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
