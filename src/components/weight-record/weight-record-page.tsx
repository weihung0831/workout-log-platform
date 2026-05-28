"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

import { AppSidebar } from "@/components/navigation/app-sidebar";

import { weightRecordAssets } from "./weight-record-assets";
import {
  weightNavItems,
  weightRangeTabs,
  weightRecordDataset,
  type WeightHistoryRecord,
  type WeightRangeKey,
  type WeightRecordDataset,
  type WeightSummaryMetric,
} from "./weight-record-data";

const sidebarUser = {
  avatar: "陳",
  name: "陳先仁",
  caption: "健身 · 12週",
};

const figmaTrendCoordinates = [
  { x: 4, y: 75 },
  { x: 18.29, y: 62.5 },
  { x: 32.57, y: 55 },
  { x: 46.86, y: 48.75 },
  { x: 61.14, y: 40 },
  { x: 75.43, y: 30 },
  { x: 89.71, y: 20.63 },
  { x: 98.29, y: 13.75 },
];

export function WeightRecordPage() {
  const [activeRange, setActiveRange] = useState<WeightRangeKey>("month");
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <main className="weight-page">
      <section className="weight-shell" aria-label="FitLog 體重紀錄">
        <AppSidebar items={weightNavItems} logoSrc={weightRecordAssets.logo} user={sidebarUser} />
        <MobileHeader onAddWeight={() => setModalOpen(true)} />
        <section className="weight-workspace">
          <DesktopHeader onAddWeight={() => setModalOpen(true)} />
          <WeightRecordContent
            activeRange={activeRange}
            data={weightRecordDataset}
            onRangeChange={setActiveRange}
          />
        </section>
        <MobileTabBar />
        {modalOpen ? <AddWeightModal onClose={() => setModalOpen(false)} /> : null}
      </section>
    </main>
  );
}

function MobileHeader({ onAddWeight }: { onAddWeight: () => void }) {
  return (
    <header className="weight-mobile-header">
      <button aria-label="返回我的頁面" className="weight-icon-button weight-icon-button--large" type="button">
        <Image aria-hidden src={weightRecordAssets.back} alt="" width={20} height={20} />
      </button>
      <h1>體重紀錄</h1>
      <AddWeightButton label="新增" variant="compact" onClick={onAddWeight} />
    </header>
  );
}

function DesktopHeader({ onAddWeight }: { onAddWeight: () => void }) {
  return (
    <header className="weight-desktop-header">
      <div className="weight-desktop-title">
        <button aria-label="返回我的頁面" className="weight-icon-button" type="button">
          <Image aria-hidden src={weightRecordAssets.backSmall} alt="" width={16} height={16} />
        </button>
        <h1>體重紀錄</h1>
      </div>
      <AddWeightButton label="新增體重紀錄" onClick={onAddWeight} />
    </header>
  );
}

function AddWeightButton({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "compact";
}) {
  return (
    <button className={`weight-add-button weight-add-button--${variant}`} onClick={onClick} type="button">
      <Image aria-hidden src={weightRecordAssets.add} alt="" width={13} height={13} />
      <span>{label}</span>
    </button>
  );
}

function WeightRecordContent({
  activeRange,
  data,
  onRangeChange,
}: {
  activeRange: WeightRangeKey;
  data: WeightRecordDataset;
  onRangeChange: (range: WeightRangeKey) => void;
}) {
  return (
    <div className="weight-content">
      <SummaryStrip summary={data.summary} />
      <div className="weight-main-grid">
        <TrendCard activeRange={activeRange} data={data} onRangeChange={onRangeChange} />
        <HistoryCard records={data.history} />
      </div>
    </div>
  );
}

function SummaryStrip({ summary }: { summary: WeightSummaryMetric[] }) {
  return (
    <section className="weight-summary" aria-label="體重摘要">
      {summary.map((metric) => (
        <article className="weight-summary-item" key={metric.id}>
          <p className={`weight-summary-value weight-summary-value--${metric.tone}`}>
            <strong>{metric.value}</strong>
            <span>{metric.unit}</span>
          </p>
          <h2>{metric.label}</h2>
        </article>
      ))}
    </section>
  );
}

function TrendCard({
  activeRange,
  data,
  onRangeChange,
}: {
  activeRange: WeightRangeKey;
  data: WeightRecordDataset;
  onRangeChange: (range: WeightRangeKey) => void;
}) {
  return (
    <section className="weight-card weight-trend-card" aria-labelledby="weight-trend-title">
      <div className="weight-card-heading">
        <h2 id="weight-trend-title">{data.trend.title}</h2>
        <RangeTabs activeRange={activeRange} onRangeChange={onRangeChange} />
      </div>
      <WeightTrendChart data={data} />
    </section>
  );
}

function RangeTabs({
  activeRange,
  onRangeChange,
}: {
  activeRange: WeightRangeKey;
  onRangeChange: (range: WeightRangeKey) => void;
}) {
  return (
    <div className="weight-range-tabs" role="tablist" aria-label="體重趨勢區間">
      {weightRangeTabs.map((tab) => (
        <button
          aria-selected={tab.key === activeRange}
          className={tab.key === activeRange ? "weight-range-tab weight-range-tab--active" : "weight-range-tab"}
          key={tab.key}
          onClick={() => onRangeChange(tab.key)}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

function WeightTrendChart({ data }: { data: WeightRecordDataset }) {
  const chart = useMemo(() => {
    const points = data.trend.points.map((point, index) => {
      const fallbackX = data.trend.points.length === 1 ? 50 : 4 + (index / (data.trend.points.length - 1)) * 94.29;
      const coordinate = figmaTrendCoordinates[index] ?? { x: fallbackX, y: 50 };

      return { ...point, x: coordinate.x, y: coordinate.y };
    });
    const pointString = points.map((point) => `${point.x},${point.y}`).join(" ");
    const areaPath = `M ${points.map((point) => `${point.x},${point.y}`).join(" L ")} L 98.29 100 L 4 100 Z`;

    return { areaPath, points, pointString };
  }, [data.trend.points]);

  return (
    <div className="weight-chart" aria-label="體重從 1 月 1 日到今天的上升趨勢圖">
      <div className="weight-chart-body">
        <div className="weight-chart-y-labels" aria-hidden>
          {data.trend.yLabels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <div className="weight-chart-plot">
          <svg
            aria-hidden
            className="weight-chart-svg"
            focusable="false"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line className="weight-chart-gridline" x1="0" x2="100" y1="6.25" y2="6.25" />
            <line className="weight-chart-gridline" x1="0" x2="100" y1="34.38" y2="34.38" />
            <line className="weight-chart-gridline" x1="0" x2="100" y1="62.5" y2="62.5" />
            <line className="weight-chart-axis" x1="0" x2="100" y1="90.63" y2="90.63" />
            <path className="weight-chart-area" d={chart.areaPath} />
            <polyline className="weight-chart-line" points={chart.pointString} />
          </svg>
          <div className="weight-chart-points" aria-hidden>
            {chart.points.map((point, index) => {
              const isCurrent = index === chart.points.length - 1;

              return (
                <span
                  className={isCurrent ? "weight-chart-point weight-chart-point--current" : "weight-chart-point"}
                  key={point.label}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                />
              );
            })}
          </div>
        </div>
      </div>
      <div className="weight-chart-x-labels" aria-hidden>
        {data.trend.points.map((point) => (
          <span className={point.label === "今" ? "weight-chart-current-label" : undefined} key={point.label}>
            {point.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function HistoryCard({ records }: { records: WeightHistoryRecord[] }) {
  return (
    <section className="weight-card weight-history-card" aria-labelledby="weight-history-title">
      <h2 id="weight-history-title">
        <span>紀錄歷史</span>
      </h2>
      <div className="weight-history-list">
        {records.map((record) => (
          <HistoryRecord key={record.id} record={record} />
        ))}
      </div>
    </section>
  );
}

function HistoryRecord({ record }: { record: WeightHistoryRecord }) {
  const isDown = record.direction === "down";

  return (
    <article className="weight-history-record">
      <span
        className={record.highlighted ? "weight-history-icon weight-history-icon--active" : "weight-history-icon"}
        aria-hidden
      >
        <Image
          aria-hidden
          src={record.highlighted ? weightRecordAssets.historyActive : weightRecordAssets.historyMuted}
          alt=""
          width={18}
          height={18}
        />
      </span>
      <div className="weight-history-main">
        <h3>{record.dateLabel}</h3>
        <p>{record.timeLabel}</p>
      </div>
      <div className="weight-history-value">
        <strong>{record.weightKg} kg</strong>
        <span className={isDown ? "weight-history-delta weight-history-delta--down" : "weight-history-delta weight-history-delta--up"}>
          {isDown ? "▼" : "▲"} {record.delta}
        </span>
      </div>
    </article>
  );
}

function AddWeightModal({ onClose }: { onClose: () => void }) {
  const [weight, setWeight] = useState("75.2");
  const [recordDate, setRecordDate] = useState("2026年4月7日");
  const [recordTime, setRecordTime] = useState("08:00");

  return (
    <div
      className="weight-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <form
        aria-labelledby="weight-modal-title"
        aria-modal="true"
        className="weight-modal"
        onSubmit={(event) => {
          event.preventDefault();
          onClose();
        }}
        role="dialog"
      >
        <span className="weight-modal-handle" aria-hidden />
        <header className="weight-modal-header">
          <div>
            <h2 id="weight-modal-title">新增體重紀錄</h2>
            <p>今天 · 4月7日</p>
          </div>
          <button aria-label="關閉新增體重紀錄" className="weight-modal-close" onClick={onClose} type="button">
            ×
          </button>
        </header>
        <section className="weight-modal-scale" aria-labelledby="weight-modal-scale-label">
          <label className="weight-modal-scale-label" htmlFor="weight-modal-value" id="weight-modal-scale-label">
            體重 (kg)
          </label>
          <div className="weight-modal-number-row">
            <input
              className="weight-modal-number-input"
              id="weight-modal-value"
              inputMode="decimal"
              onChange={(event) => setWeight(event.target.value)}
              type="text"
              value={weight}
            />
            <span>kg</span>
          </div>
          <p>上次：75.2 kg（今天 07:30）</p>
        </section>
        <div className="weight-modal-fields">
          <label className="weight-modal-field">
            <span>記錄日期</span>
            <input onChange={(event) => setRecordDate(event.target.value)} type="text" value={recordDate} />
          </label>
          <label className="weight-modal-field">
            <span>記錄時間</span>
            <input onChange={(event) => setRecordTime(event.target.value)} type="text" value={recordTime} />
          </label>
        </div>
        <button className="weight-modal-save" type="submit">
          儲存體重紀錄
        </button>
      </form>
    </div>
  );
}

function MobileTabBar() {
  return (
    <nav className="home-tabbar weight-tabbar" aria-label="主要導覽">
      {weightNavItems.map((item) => (
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
