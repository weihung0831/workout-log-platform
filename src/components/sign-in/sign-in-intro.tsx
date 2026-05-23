type SignInIntroProps = {
  desktop?: boolean;
};

export function SignInIntro({ desktop = false }: SignInIntroProps) {
  return (
    <div
      className={
        desktop
          ? "sign-in-intro sign-in-intro--desktop"
          : "sign-in-intro sign-in-intro--brand"
      }
    >
      <h1>歡迎回來</h1>
      <p>登入以繼續你的訓練記錄</p>
    </div>
  );
}
