import Image from "next/image";
import Link from "next/link";

import { resetPasswordAssets } from "./reset-password-assets";
import { ResetPasswordField } from "./reset-password-field";

type ResetPasswordPageProps = {
  status?: "input" | "success";
};

export function ResetPasswordPage({
  status = "input",
}: ResetPasswordPageProps) {
  return (
    <main className="reset-password-page" data-state={status}>
      <section className="reset-password-shell" aria-label="FitLog 重設密碼">
        <ResetPasswordBrandPanel />
        <section className="reset-password-content-panel">
          {status === "success" ? <ResetPasswordSuccess /> : <ResetPasswordForm />}
        </section>
      </section>
    </main>
  );
}

function ResetPasswordBrandPanel() {
  return (
    <aside className="reset-password-brand-panel" aria-label="FitLog">
      <Image
        alt="FitLog"
        className="reset-password-brand-logo"
        height={178}
        priority
        src={resetPasswordAssets.fitlog}
        width={200}
      />
    </aside>
  );
}

function ResetPasswordForm() {
  return (
    <div className="reset-password-card reset-password-card--form">
      <header className="reset-password-hero">
        <div className="reset-password-icon-frame">
          <Image
            alt=""
            className="reset-password-hero-icon"
            height={38}
            priority
            src={resetPasswordAssets.resetPassword}
            width={38}
          />
        </div>
        <div className="reset-password-copy">
          <h1>重設密碼</h1>
          <p>請輸入你的新密碼</p>
        </div>
      </header>
      <form className="reset-password-form">
        <div className="reset-password-fields">
          <ResetPasswordField
            autoComplete="new-password"
            hint="需包含英文與數字"
            iconSrc={resetPasswordAssets.lock}
            id="new-password"
            label="新密碼"
            placeholder="至少 8 個字元"
            trailingIconSrc={resetPasswordAssets.eye}
            trailingLabel="顯示新密碼"
          />
          <ResetPasswordField
            autoComplete="new-password"
            iconSrc={resetPasswordAssets.lock}
            id="confirm-new-password"
            label="確認新密碼"
            placeholder="再輸入一次"
          />
        </div>
        <Link className="reset-password-primary" href="/reset-password/success">
          確認重設
        </Link>
      </form>
    </div>
  );
}

function ResetPasswordSuccess() {
  return (
    <div className="reset-password-card reset-password-card--success">
      <div className="reset-password-success-icon-frame">
        <Image
          alt=""
          className="reset-password-success-icon"
          height={23}
          priority
          src={resetPasswordAssets.checkSuccess}
          width={30}
        />
      </div>
      <div className="reset-password-success-copy">
        <h1>密碼已更新</h1>
        <p>請使用新密碼登入</p>
      </div>
      <Link className="reset-password-primary" href="/">
        前往登入
      </Link>
    </div>
  );
}
