import { SignUpBrandPanel } from "./sign-up-brand-panel";
import { SignUpForm } from "./sign-up-form";

export function SignUpPage() {
  return (
    <main className="sign-up-page">
      <section className="sign-up-shell" aria-label="FitLog 註冊">
        <SignUpBrandPanel />
        <section className="sign-up-form-panel">
          <SignUpForm />
        </section>
      </section>
    </main>
  );
}
