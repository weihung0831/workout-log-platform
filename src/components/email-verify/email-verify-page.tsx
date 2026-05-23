import Image from "next/image";

import { emailVerifyAssets } from "./email-verify-assets";

type EmailVerifyPageProps = {
  email?: string;
  resendSeconds?: number;
  status?: "input" | "success";
};

const codeDigits = ["5", "8", "3"];
const emptySlots = 2;

export function EmailVerifyPage({
  email = "alex@example.com",
  resendSeconds = 57,
  status = "input",
}: EmailVerifyPageProps) {
  const isSuccess = status === "success";

  return (
    <main className="email-verify-page" data-state={status}>
      <section className="email-verify-shell" aria-label="FitLog 信箱驗證">
        <EmailVerifyBrandPanel />
        <section className="email-verify-content-panel">
          {isSuccess ? (
            <EmailVerifySuccess />
          ) : (
            <EmailVerifyForm email={email} resendSeconds={resendSeconds} />
          )}
        </section>
      </section>
    </main>
  );
}

function EmailVerifyBrandPanel() {
  return (
    <aside className="email-verify-brand-panel" aria-label="FitLog">
      <Image
        className="email-verify-brand-logo"
        src={emailVerifyAssets.fitlog}
        alt="FitLog"
        width={200}
        height={178}
        priority
      />
    </aside>
  );
}

type EmailVerifyFormProps = {
  email: string;
  resendSeconds: number;
};

function EmailVerifyForm({ email, resendSeconds }: EmailVerifyFormProps) {
  return (
    <div className="email-verify-card email-verify-card--form">
      <header className="email-verify-hero">
        <div className="email-verify-icon-frame">
          <Image
            className="email-verify-icon email-verify-icon--mobile-desktop"
            src={emailVerifyAssets.emailMobileDesktop}
            alt=""
            width={57}
            height={47}
            priority
          />
          <Image
            className="email-verify-icon email-verify-icon--tablet"
            src={emailVerifyAssets.emailTablet}
            alt=""
            width={50}
            height={41}
            priority
          />
        </div>
        <div className="email-verify-copy">
          <h1>驗證信箱</h1>
          <p>
            驗證碼已發送至
            <strong>{email}</strong>
          </p>
        </div>
      </header>
      <div className="email-verify-form-body">
        <OtpDisplay />
        <p className="email-verify-deadline">驗證碼有效期限 10 分鐘</p>
        <button className="email-verify-primary" type="button">
          驗證
        </button>
        <p className="email-verify-resend">
          <span>沒收到？</span>
          <button type="button">重新發送</button>
          <span className="email-verify-resend-time">（{resendSeconds} 秒後）</span>
        </p>
      </div>
    </div>
  );
}

function OtpDisplay() {
  return (
    <div className="email-verify-otp" aria-label="已輸入 3 碼驗證碼，共 6 碼">
      {codeDigits.map((digit, index) => (
        <span className="email-verify-otp-box is-filled" key={`digit-${index}`}>
          {digit}
        </span>
      ))}
      <span className="email-verify-otp-box is-active" aria-label="目前輸入格">
        <span className="email-verify-cursor" />
      </span>
      {Array.from({ length: emptySlots }).map((_, index) => (
        <span
          aria-hidden="true"
          className="email-verify-otp-box"
          key={`empty-${index}`}
        />
      ))}
    </div>
  );
}

function EmailVerifySuccess() {
  return (
    <div className="email-verify-card email-verify-card--success">
      <div className="email-verify-success-icon-frame">
        <Image
          className="email-verify-success-icon"
          src={emailVerifyAssets.checkSuccess}
          alt=""
          width={30}
          height={23}
          priority
        />
      </div>
      <div className="email-verify-success-copy">
        <h1>驗證成功！</h1>
        <p>正在前往首頁…</p>
      </div>
    </div>
  );
}
