"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { signUpAssets } from "./sign-up-assets";
import { SignUpField } from "./sign-up-field";
import { SignUpIntro } from "./sign-up-intro";

function PasswordStrength() {
  return (
    <div className="sign-up-password-strength" aria-hidden>
      <span className="is-active" />
      <span className="is-active" />
      <span />
      <span />
    </div>
  );
}

export function SignUpForm() {
  const [hasEmailError, setHasEmailError] = useState(false);

  return (
    <form
      className="sign-up-form"
      onSubmit={(event) => {
        event.preventDefault();
        setHasEmailError(true);
      }}
    >
      <SignUpIntro desktop />
      <div className="sign-up-fields">
        <SignUpField
          autoComplete="name"
          iconType="user"
          id="name"
          label="姓名"
          placeholder="你的名字"
          type="text"
        />
        <SignUpField
          autoComplete="email"
          iconSrc={signUpAssets.email}
          id="email"
          label="電子信箱"
          placeholder="you@example.com"
          type="email"
          errorActionHref="/"
          errorActionLabel="直接登入"
          errorMessage={hasEmailError ? "此信箱已被註冊，請" : undefined}
          onChange={() => setHasEmailError(false)}
        />
        <div className="sign-up-password-group">
          <SignUpField
            autoComplete="new-password"
            iconSrc={signUpAssets.lock}
            id="password"
            label="密碼"
            placeholder="至少 8 個字元"
            type="password"
          />
          <p className="sign-up-password-hint">需包含英文與數字</p>
          <PasswordStrength />
        </div>
        <SignUpField
          autoComplete="new-password"
          id="confirm-password"
          label="確認密碼"
          placeholder="再輸入一次"
          type="password"
        />
      </div>
      <button
        className={
          hasEmailError
            ? "sign-up-primary sign-up-primary--muted"
            : "sign-up-primary"
        }
        type="submit"
      >
        建立帳號
      </button>
      <div className="sign-up-divider">
        <span>或</span>
      </div>
      <button className="sign-up-google" type="button">
        <Image alt="" height={20} src={signUpAssets.google} width={20} />
        <span>使用 Google 繼續</span>
      </button>
      <p className="sign-up-login">
        已有帳號？
        <Link href="/">登入</Link>
      </p>
    </form>
  );
}
