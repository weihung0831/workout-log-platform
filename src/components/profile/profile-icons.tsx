export type IconName =
  | "home"
  | "record"
  | "journal"
  | "stats"
  | "profile"
  | "flame"
  | "scale"
  | "target"
  | "bell"
  | "lock"
  | "logout"
  | "trash"
  | "chevron";

export function FitLogLogo() {
  return (
    <span className="profile-logo" aria-label="FitLog">
      <svg aria-hidden viewBox="0 0 28 28">
        <path d="M6 17v-6M22 17v-6M9 20V8a5 5 0 0 1 10 0v12M3 14h22" />
      </svg>
      <span>FITLOG</span>
    </span>
  );
}

export function AppIcon({ name, size = 18 }: { name: IconName; size?: number }) {
  const common = {
    "aria-hidden": true,
    className: "profile-icon",
    fill: "none",
    height: size,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
    width: size,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m4 11 8-7 8 7" />
          <path d="M6.5 10.5V20h11v-9.5" />
          <path d="M10 20v-5h4v5" />
        </svg>
      );
    case "record":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case "journal":
      return (
        <svg {...common}>
          <path d="M6 5h12v15H6z" />
          <path d="M9 3v4M15 3v4M8.5 11h7M8.5 15h5" />
        </svg>
      );
    case "stats":
      return (
        <svg {...common}>
          <path d="M4 13h3l2.5-6 5 11 2.5-5h3" />
        </svg>
      );
    case "profile":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="3.2" />
          <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
        </svg>
      );
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 21c3.2-1 5-3.3 5-6.1 0-2.4-1.3-4.1-3.4-6.4-.2 1.7-.9 2.8-2 3.6.1-2.4-.9-4.7-3.1-6.1.4 3.1-2 5.1-2 8.4C6.5 17.9 8.7 20.2 12 21Z" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M6 7h12v12H6z" />
          <path d="M9 11a3 3 0 0 1 6 0M12 11l2-2" />
        </svg>
      );
    case "target":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 17h12l-1.5-2.5V10a4.5 4.5 0 0 0-9 0v4.5z" />
          <path d="M10 20h4" />
        </svg>
      );
    case "lock":
      return (
        <svg {...common}>
          <path d="M7 11h10v8H7z" />
          <path d="M9 11V8a3 3 0 0 1 6 0v3" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M8 8h8v8" />
          <path d="M16 8 7 17" />
        </svg>
      );
    case "trash":
      return (
        <svg {...common}>
          <path d="M5 7h14" />
          <path d="M9 7V5h6v2M8 10l.5 9h7l.5-9M11 11v5M14 11v5" />
        </svg>
      );
    case "chevron":
      return (
        <svg {...common}>
          <path d="m10 7 5 5-5 5" />
        </svg>
      );
  }
}
