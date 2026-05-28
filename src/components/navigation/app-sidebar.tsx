import Image from "next/image";
import type { ReactNode } from "react";

export type AppSidebarItem = {
  label: string;
  href: string;
  active: boolean;
  sideIcon?: string;
  sideIconElement?: ReactNode;
};

type AppSidebarUser = {
  avatar: string;
  name: string;
  caption: string;
};

type AppSidebarProps = {
  logoSrc?: string;
  logo?: ReactNode;
  items: AppSidebarItem[];
  user: AppSidebarUser;
};

export function AppSidebar({ items, logo, logoSrc, user }: AppSidebarProps) {
  return (
    <aside className="home-sidebar" aria-label="主要導覽">
      <div className="home-sidebar-logo">
        {logo ?? (
          logoSrc ? (
            <Image
              className="home-sidebar-logo-image"
              src={logoSrc}
              alt="FitLog"
              width={371}
              height={112}
              priority
            />
          ) : (
            <span>FitLog</span>
          )
        )}
      </div>
      <nav className="home-sidebar-nav" aria-label="主要導覽">
        {items.map((item) => (
          <a
            aria-current={item.active ? "page" : undefined}
            className={item.active ? "home-nav-link home-nav-link--active" : "home-nav-link"}
            href={item.href}
            key={item.label}
          >
            {item.sideIconElement ??
              (item.sideIcon ? <Image aria-hidden src={item.sideIcon} alt="" width={20} height={20} /> : null)}
            <span>{item.label}</span>
          </a>
        ))}
      </nav>
      <div className="home-sidebar-user">
        <span className="home-avatar">{user.avatar}</span>
        <div>
          <strong>{user.name}</strong>
          <span>{user.caption}</span>
        </div>
      </div>
    </aside>
  );
}
