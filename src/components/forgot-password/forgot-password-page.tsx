import Image from "next/image";
import Link from "next/link";

import { forgotPasswordAssets } from "./forgot-password-assets";

type ForgotPasswordPageProps = {
  email?: string;
  status?: "input" | "sent";
};

export function ForgotPasswordPage({
  email = "alex@example.com",
  status = "input",
}: ForgotPasswordPageProps) {
  const isSent = status === "sent";

  return (
    <main className="forgot-password-page" data-state={status}>
      <section className="forgot-password-shell" aria-label="FitLog 忘記密碼">
        <ForgotPasswordBrandPanel />
        <section className="forgot-password-content-panel">
          {isSent ? (
            <ForgotPasswordSent email={email} />
          ) : (
            <ForgotPasswordForm />
          )}
        </section>
      </section>
    </main>
  );
}

function ForgotPasswordBrandPanel() {
  return (
    <aside className="forgot-password-brand-panel" aria-label="FitLog">
      <Image
        alt="FitLog"
        className="forgot-password-brand-logo"
        height={178}
        priority
        src={forgotPasswordAssets.fitlog}
        width={200}
      />
    </aside>
  );
}

function ForgotPasswordTopBar() {
  return (
    <header className="forgot-password-topbar">
      <Link
        aria-label="返回登入"
        className="forgot-password-topbar-back"
        href="/"
      >
        <Image
          alt=""
          aria-hidden
          height={20}
          src={forgotPasswordAssets.backArrow}
          width={20}
        />
      </Link>
      <p className="forgot-password-topbar-title">忘記密碼</p>
    </header>
  );
}

function ForgotPasswordForm() {
  return (
    <article className="forgot-password-card forgot-password-card--form">
      <ForgotPasswordTopBar />
      <div className="forgot-password-form-layout">
        <header className="forgot-password-hero forgot-password-hero--form">
          <Image
            alt=""
            aria-hidden
            className="forgot-password-lock-icon"
            height={56}
            priority
            src={forgotPasswordAssets.lock}
            width={56}
          />
          <div className="forgot-password-copy">
            <h1>忘記密碼？</h1>
            <p>
              <span>輸入你的信箱，</span>
              <span>我們將傳送重設連結給你</span>
            </p>
          </div>
        </header>
        <form action="/forgot-password/sent" className="forgot-password-form">
          <label className="forgot-password-field">
            <span>電子信箱</span>
            <span className="forgot-password-input-wrap">
              <Image
                alt=""
                aria-hidden
                className="forgot-password-input-icon"
                height={18}
                src={forgotPasswordAssets.email}
                width={18}
              />
              <input
                autoComplete="email"
                name="email"
                placeholder="you@example.com"
                type="email"
              />
            </span>
          </label>
          <button className="forgot-password-primary" type="submit">
            傳送重設連結
          </button>
          <Link className="forgot-password-secondary" href="/">
            ← 返回登入
          </Link>
        </form>
      </div>
    </article>
  );
}

type ForgotPasswordSentProps = {
  email: string;
};

function ForgotPasswordSent({ email }: ForgotPasswordSentProps) {
  return (
    <article className="forgot-password-card forgot-password-card--sent">
      <header className="forgot-password-hero forgot-password-hero--sent">
        <Image
          alt=""
          aria-hidden
          className="forgot-password-sent-icon"
          height={47}
          priority
          src={forgotPasswordAssets.sentEmail}
          width={57}
        />
        <div className="forgot-password-copy forgot-password-copy--sent">
          <h1>重設連結已寄出</h1>
          <p>
            請查看
            <strong>{email}</strong>
            的收件匣
          </p>
        </div>
      </header>
      <div className="forgot-password-sent-body">
        <p className="forgot-password-note">
          連結有效期限為 <strong>30 分鐘</strong>，如未收到請檢查垃圾郵件。
        </p>
        <button className="forgot-password-primary" type="button">
          重新寄送
        </button>
      </div>
    </article>
  );
}
