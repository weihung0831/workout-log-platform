import { SignInBrandPanel } from "./sign-in-brand-panel";
import { SignInForm } from "./sign-in-form";

export function SignInPage() {
  return (
    <main className="sign-in-page">
      <section className="sign-in-shell" aria-label="FitLog 登入">
        <SignInBrandPanel />
        <section className="sign-in-form-panel">
          <SignInForm />
        </section>
      </section>
    </main>
  );
}
