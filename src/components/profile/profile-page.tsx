"use client";

import Image from "next/image";
import { useState, type CSSProperties, type ReactNode } from "react";

import { AppSidebar, type AppSidebarItem } from "@/components/navigation/app-sidebar";
import {
  profileMockData,
  type ProfileAction,
  type ProfileBodyMetric,
  type ProfileGoal,
  type ProfileSummaryStat,
  type UnitSystem,
} from "@/mocks/profile";

import { AppIcon, FitLogLogo, type IconName } from "./profile-icons";

const editIconSrc = "/assets/figma/profile/icons/Icon-26.svg";
const scaleIconSrc = "/assets/figma/profile/icons/Icon-33.svg";

const baseNavItems = [
  { label: "首頁", href: "/home", active: false, tabIcon: "home" },
  { label: "記錄", href: "#", active: false, tabIcon: "record" },
  { label: "日誌", href: "#", active: false, tabIcon: "journal" },
  { label: "統計", href: "/stats", active: false, tabIcon: "stats" },
  { label: "我的", href: "/profile", active: true, tabIcon: "profile" },
] satisfies Array<Omit<AppSidebarItem, "sideIcon" | "sideIconElement"> & { tabIcon: IconName }>;

const navItems: Array<AppSidebarItem & { tabIcon: IconName }> = baseNavItems.map((item) => ({
  ...item,
  sideIconElement: <AppIcon name={item.tabIcon} size={20} />,
}));

export function ProfilePage() {
  const [unitSystem, setUnitSystem] = useState<UnitSystem>("kg");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const { user } = profileMockData;

  return (
    <main className="profile-page">
      <section className="profile-shell" aria-label="FitLog 個人檔案">
        <AppSidebar
          items={navItems}
          logo={<FitLogLogo />}
          user={{ avatar: user.avatar, name: user.name, caption: user.sidebarCaption }}
        />
        <MobileHeader />
        <section className="profile-workspace">
          <DesktopHeader avatar={user.avatar} />
          <div className="profile-content">
            <ProfileHero />
            <div className="profile-card-grid">
              <BodyDataCard />
              <GoalsCard />
              <SettingsCard
                reminderEnabled={reminderEnabled}
                setReminderEnabled={setReminderEnabled}
                setUnitSystem={setUnitSystem}
                unitSystem={unitSystem}
              />
              <AccountCard />
            </div>
          </div>
        </section>
        <MobileTabBar />
      </section>
    </main>
  );
}

function MobileHeader() {
  return (
    <header className="profile-mobile-header">
      <h1>我的</h1>
    </header>
  );
}

function DesktopHeader({ avatar }: { avatar: string }) {
  return (
    <header className="profile-desktop-header">
      <h1>個人檔案</h1>
      <span className="profile-avatar profile-avatar--header">{avatar}</span>
    </header>
  );
}

function ProfileHero() {
  const { summaryStats, user } = profileMockData;

  return (
    <section className="profile-hero" aria-labelledby="profile-user-name">
      <div className="profile-user">
        <span className="profile-avatar profile-avatar--hero">{user.avatar}</span>
        <div className="profile-user-copy">
          <h2 id="profile-user-name">{user.name}</h2>
          <p>{user.subtitle}</p>
          <button className="profile-edit-button" type="button">
            <Image
              aria-hidden
              className="profile-edit-icon"
              src={editIconSrc}
              alt=""
              width={14}
              height={14}
            />
            <span>編輯資料</span>
          </button>
        </div>
      </div>
      <StatStrip stats={summaryStats} />
    </section>
  );
}

function StatStrip({ stats }: { stats: ProfileSummaryStat[] }) {
  return (
    <dl className="profile-stat-strip" aria-label="訓練摘要">
      {stats.map((stat) => (
        <div className={stat.active ? "profile-stat profile-stat--active" : "profile-stat"} key={stat.label}>
          <dt>
            {stat.icon ? <AppIcon name="flame" size={18} /> : null}
            <span>{stat.label}</span>
          </dt>
          <dd>{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function BodyDataCard() {
  const { bodyMetrics, weightRecord } = profileMockData;

  return (
    <section className="profile-card profile-body-card" aria-labelledby="profile-body-title">
      <CardTitle id="profile-body-title">身體數據</CardTitle>
      <dl className="profile-metric-grid">
        {bodyMetrics.map((metric) => (
          <BodyMetric key={metric.label} metric={metric} />
        ))}
      </dl>
      <button className="profile-row profile-row--button" type="button">
        <span className="profile-icon-badge profile-icon-badge--orange" aria-hidden>
          <Image src={scaleIconSrc} alt="" width={18} height={18} />
        </span>
        <span className="profile-row-copy">
          <strong>{weightRecord.label}</strong>
          <small>{weightRecord.caption}</small>
        </span>
        <AppIcon name="chevron" size={16} />
      </button>
    </section>
  );
}

function BodyMetric({ metric }: { metric: ProfileBodyMetric }) {
  return (
    <div>
      <dt>{metric.label}</dt>
      <dd>
        <strong>{metric.value}</strong>
        {metric.unit ? <span>{metric.unit}</span> : null}
      </dd>
    </div>
  );
}

function GoalsCard() {
  const visibleGoals = profileMockData.goals;

  return (
    <section className="profile-card profile-goals-card" aria-labelledby="profile-goals-title">
      <CardTitle id="profile-goals-title">訓練目標</CardTitle>
      <div className="profile-goal-list">
        {visibleGoals.map((goal) => (
          <GoalProgress goal={goal} key={goal.label} />
        ))}
      </div>
      <button className="profile-row profile-row--button profile-row--goal" type="button">
        <IconBadge icon="target" tone="mint" />
        <span className="profile-row-copy">
          <strong>編輯目標</strong>
        </span>
        <AppIcon name="chevron" size={16} />
      </button>
    </section>
  );
}

function GoalProgress({ goal }: { goal: ProfileGoal }) {
  const progressStyle = { "--progress": `${goal.progress}%` } as CSSProperties;
  const className = goal.desktopOnly ? "profile-goal profile-goal--desktop" : "profile-goal";

  return (
    <div className={className}>
      <div className="profile-goal-copy">
        <strong>{goal.label}</strong>
        <span>{goal.value}</span>
      </div>
      <div className={`profile-progress profile-progress--${goal.tone}`} style={progressStyle}>
        <span />
      </div>
    </div>
  );
}

function SettingsCard({
  reminderEnabled,
  setReminderEnabled,
  setUnitSystem,
  unitSystem,
}: {
  reminderEnabled: boolean;
  setReminderEnabled: (enabled: boolean) => void;
  setUnitSystem: (unit: UnitSystem) => void;
  unitSystem: UnitSystem;
}) {
  return (
    <section className="profile-card profile-settings-card" aria-labelledby="profile-settings-title">
      <CardTitle id="profile-settings-title">設定</CardTitle>
      <div className="profile-row">
        <span className="profile-icon-badge profile-icon-badge--blue" aria-hidden>
          <Image src={scaleIconSrc} alt="" width={18} height={18} />
        </span>
        <span className="profile-row-copy">
          <strong>重量單位</strong>
        </span>
        <UnitControl activeUnit={unitSystem} onChange={setUnitSystem} />
      </div>
      <div className="profile-row">
        <IconBadge icon="bell" tone="yellow" />
        <span className="profile-row-copy">
          <strong>{profileMockData.reminder.label}</strong>
          <small>{profileMockData.reminder.caption}</small>
        </span>
        <ReminderSwitch enabled={reminderEnabled} onToggle={() => setReminderEnabled(!reminderEnabled)} />
      </div>
    </section>
  );
}

function UnitControl({ activeUnit, onChange }: { activeUnit: UnitSystem; onChange: (unit: UnitSystem) => void }) {
  const units: UnitSystem[] = ["kg", "lbs"];

  return (
    <div className="profile-unit-control" aria-label="重量單位" role="group">
      {units.map((unit) => (
        <button
          aria-pressed={activeUnit === unit}
          className={activeUnit === unit ? "profile-unit-option profile-unit-option--active" : "profile-unit-option"}
          key={unit}
          onClick={() => onChange(unit)}
          type="button"
        >
          {unit}
        </button>
      ))}
    </div>
  );
}

function ReminderSwitch({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      aria-checked={enabled}
      aria-label="切換訓練提醒"
      className={enabled ? "profile-switch profile-switch--on" : "profile-switch"}
      onClick={onToggle}
      role="switch"
      type="button"
    >
      <span />
    </button>
  );
}

function AccountCard() {
  return (
    <section className="profile-card profile-account-card" aria-labelledby="profile-account-title">
      <CardTitle id="profile-account-title">帳號</CardTitle>
      {profileMockData.accountActions.map((action) => (
        <AccountRow action={action} key={action.id} />
      ))}
    </section>
  );
}

function AccountRow({ action }: { action: ProfileAction }) {
  return (
    <button
      className={action.danger ? "profile-row profile-row--button profile-row--danger" : "profile-row profile-row--button"}
      type="button"
    >
      <IconBadge icon={action.icon} tone={action.tone} />
      <span className="profile-row-copy">
        <strong>{action.label}</strong>
      </span>
      <AppIcon name="chevron" size={16} />
    </button>
  );
}

function CardTitle({ children, id }: { children: ReactNode; id: string }) {
  return (
    <h2 className="profile-card-title" id={id}>
      {children}
    </h2>
  );
}

function IconBadge({ icon, tone }: { icon: IconName; tone: ProfileAction["tone"] | "mint" }) {
  return (
    <span className={`profile-icon-badge profile-icon-badge--${tone}`} aria-hidden>
      <AppIcon name={icon} size={18} />
    </span>
  );
}

function MobileTabBar() {
  return (
    <nav className="profile-tabbar" aria-label="主要導覽">
      {navItems.map((item) => (
        <a
          aria-current={item.active ? "page" : undefined}
          className={item.active ? "profile-tabbar-link profile-tabbar-link--active" : "profile-tabbar-link"}
          href={item.href}
          key={item.label}
        >
          <AppIcon name={item.tabIcon} size={24} />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
