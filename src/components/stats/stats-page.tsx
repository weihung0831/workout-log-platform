"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";

import { AppSidebar } from "@/components/navigation/app-sidebar";

import { statsAssets } from "./stats-assets";
import {
  navItems,
  periodTabs,
  type MetricCardData,
  type PeriodKey,
  type PrRecord,
  type StatsDataset,
} from "./stats-data";
import { statsDatasets } from "./stats-mock-data";

const sidebarUser = {
  avatar: "陳",
  name: "陳先仁",
  caption: "健身 · 12週",
};

export function StatsPage() {
  const [activePeriod, setActivePeriod] = useState<PeriodKey>("month");
  const statsData = statsDatasets[activePeriod];
  const isEmpty = Boolean(statsData.emptyState);

  return (
    <main className="stats-page">
      <section className="stats-shell" aria-label="FitLog 統計分析">
        <AppSidebar items={navItems} logoSrc={statsAssets.logo} user={sidebarUser} />
        <MobileHeader statsData={statsData} />
        <section className={isEmpty ? "stats-workspace stats-workspace--empty" : "stats-workspace"}>
          <DesktopHeader activePeriod={activePeriod} isEmpty={isEmpty} onPeriodChange={setActivePeriod} statsData={statsData} />
          <StatsContent activePeriod={activePeriod} onPeriodChange={setActivePeriod} statsData={statsData} />
        </section>
        <MobileTabBar />
      </section>
    </main>
  );
}

function MobileHeader({ statsData }: { statsData: StatsDataset }) {
  return (
    <header className="stats-mobile-header">
      <h1>統計分析</h1>
      <RangeSwitcher size="compact" statsData={statsData} />
    </header>
  );
}

function DesktopHeader({
  activePeriod,
  isEmpty,
  onPeriodChange,
  statsData,
}: {
  activePeriod: PeriodKey;
  isEmpty: boolean;
  onPeriodChange: (period: PeriodKey) => void;
  statsData: StatsDataset;
}) {
  return (
    <header className={isEmpty ? "stats-desktop-header stats-desktop-header--empty" : "stats-desktop-header"}>
      <div className="stats-desktop-heading">
        <h1>統計分析</h1>
        <div className="stats-tablet-range">
          <RangeSwitcher statsData={statsData} />
        </div>
      </div>
      <div className="stats-desktop-tools">
        <PeriodTabs activePeriod={activePeriod} onPeriodChange={onPeriodChange} />
        <div className="stats-desktop-range">
          <RangeSwitcher statsData={statsData} />
        </div>
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
  if (statsData.emptyState) {
    return (
      <div className={`stats-content stats-content--${activePeriod} stats-content--empty`}>
        <div className="stats-mobile-tabs stats-mobile-tabs--empty">
          <PeriodTabs activePeriod={activePeriod} onPeriodChange={onPeriodChange} />
        </div>
        <StatsEmptyState emptyState={statsData.emptyState} />
      </div>
    );
  }

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

function StatsEmptyState({ emptyState }: { emptyState: NonNullable<StatsDataset["emptyState"]> }) {
  return (
    <section className="stats-empty-state" aria-labelledby="stats-empty-title">
      <div className="stats-empty-icon" aria-hidden>
        <Image aria-hidden src={statsAssets.emptyStats} alt="" width={56} height={56} />
      </div>
      <h2 id="stats-empty-title">{emptyState.title}</h2>
      <p className="stats-empty-copy">
        <span className="stats-empty-copy-default">
          {emptyState.description.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </span>
        {emptyState.desktopDescription ? (
          <span className="stats-empty-copy-desktop">{emptyState.desktopDescription}</span>
        ) : null}
      </p>
      <button className="stats-empty-action" type="button">
        {emptyState.actionLabel}
      </button>
      {emptyState.caption ? <p className="stats-empty-caption">{emptyState.caption}</p> : null}
    </section>
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
        <Image aria-hidden src={streak.iconSrc ?? statsAssets.streakFlame} alt="" width={16} height={16} />
        <span className="stats-streak-title-default">{streak.title}</span>
        {streak.compactTitle ? <span className="stats-streak-title-compact">{streak.compactTitle}</span> : null}
      </div>
      <p>
        <strong>{streak.value}</strong>
        <span>{streak.unit}</span>
      </p>
      <small>
        <span className="stats-streak-caption-mobile">{streak.caption}</span>
        {streak.desktopCaption ? <span className="stats-streak-caption-desktop">{streak.desktopCaption}</span> : null}
      </small>
    </article>
  );
}

function TrainingDurationCard({ duration }: { duration: StatsDataset["duration"] }) {
  const maxChartValue = duration.maxValue ?? Math.max(...duration.bars.map((item) => item.value));

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
          {duration.desktopAverageUnit ? (
            <>
              <span className="stats-average-unit-mobile">{duration.averageUnit ?? "分均"}</span>
              <span className="stats-average-unit-desktop">{duration.desktopAverageUnit}</span>
            </>
          ) : (
            <span>{duration.averageUnit ?? "分均"}</span>
          )}
        </p>
      </div>
      <div
        className="stats-bar-plot"
        aria-label={duration.aria}
        style={{ "--bar-count": duration.bars.length } as CSSProperties}
      >
        {duration.bars.map((item) => {
          const isOutlined = item.variant === "outline";
          const isMuted = item.variant === "muted";
          const isMutedOutline = item.variant === "muted-outline";
          const barValue = item.displayValue ?? item.value;
          const barColumnStyle = {
            "--bar-height": `${(item.value / maxChartValue) * 100}%`,
          } as CSSProperties;
          const barStyle = {
            ...barColumnStyle,
            backgroundColor: item.hiddenValue ? "#e5e5ea" : undefined,
          } as CSSProperties;

          return (
            <div className="stats-bar-column" key={item.label} style={barColumnStyle}>
              <span className={item.active && !isOutlined ? "stats-bar-value stats-bar-value--active" : "stats-bar-value"}>
                {item.hiddenValue ? "" : (
                  <>
                    <span
                      className={
                        item.desktopDisplayValue
                          ? "stats-bar-value-mobile stats-bar-value-mobile--alternate"
                          : "stats-bar-value-mobile"
                      }
                    >
                      {barValue}
                    </span>
                    {item.desktopDisplayValue ? (
                      <span className="stats-bar-value-desktop">{item.desktopDisplayValue}</span>
                    ) : null}
                  </>
                )}
              </span>
              <span
                className={[
                  "stats-bar",
                  item.active ? "stats-bar--active" : "",
                  isOutlined ? "stats-bar--outline" : "",
                  isMuted ? "stats-bar--muted" : "",
                  isMutedOutline ? "stats-bar--muted-outline" : "",
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
  const isSummary = muscle.variant === "summary";

  return (
    <section
      className={isSummary ? "stats-panel stats-muscle-card stats-muscle-card--summary" : "stats-panel stats-muscle-card"}
      aria-labelledby="stats-muscle-title"
    >
      <h2 id="stats-muscle-title">{muscle.title}</h2>
      <div className="stats-muscle-content">
        {isSummary ? (
          <div className="stats-muscle-total">
            <strong>{muscle.centerValue}</strong>
            <span>{muscle.centerLabel}</span>
          </div>
        ) : (
          <div className="stats-donut" aria-hidden style={{ background: muscle.gradient }}>
            <div className="stats-donut-center">
              <strong>{muscle.centerValue}</strong>
              <span>{muscle.centerLabel}</span>
            </div>
          </div>
        )}
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
                <span className="stats-pr-status-mobile">{record.status}</span>
                <span className="stats-pr-status-desktop">{record.desktopStatus ?? record.status}</span>
                <span className="stats-pr-status-date"> · {record.desktopDate}</span>
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
