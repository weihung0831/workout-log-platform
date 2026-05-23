"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { signInAssets } from "./sign-in-assets";
import { SignInField } from "./sign-in-field";
import { SignInIntro } from "./sign-in-intro";

export function SignInForm() {
  const [hasPasswordError, setHasPasswordError] = useState(false);

  return (
    <form
      className="sign-in-form"
      onSubmit={(event) => {
        event.preventDefault();
        setHasPasswordError(true);
      }}
    >
      <SignInIntro desktop />
      <div className="sign-in-fields">
        <SignInField
          id="email"
          label="電子信箱"
          type="email"
          placeholder="you@example.com"
          iconSrc={signInAssets.email}
          autoComplete="email"
        />
        <div className="sign-in-password-group">
          <SignInField
            id="password"
            label="密碼"
            type="password"
            placeholder="輸入密碼"
            iconSrc={signInAssets.lock}
            autoComplete="current-password"
            errorMessage={
              hasPasswordError ? "密碼錯誤，請重新輸入" : undefined
            }
            onChange={() => setHasPasswordError(false)}
            trailingIconSrc={signInAssets.eye}
            trailingLabel="顯示密碼"
          />
          <Link className="sign-in-forgot" href="/forgot-password">
            忘記密碼？
          </Link>
        </div>
      </div>
      <button className="sign-in-primary" type="submit">
        登入
      </button>
      <div className="sign-in-divider">
        <span>或</span>
      </div>
      <button className="sign-in-google" type="button">
        <Image src={signInAssets.google} alt="" width={20} height={20} />
        <span>使用 Google 登入</span>
      </button>
      <p className="sign-in-register">
        還沒有帳號？
        <a href="#">立即註冊</a>
      </p>
    </form>
  );
}
