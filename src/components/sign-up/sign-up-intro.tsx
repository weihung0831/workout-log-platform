type SignUpIntroProps = {
  desktop?: boolean;
};

export function SignUpIntro({ desktop = false }: SignUpIntroProps) {
  return (
    <div
      className={
        desktop
          ? "sign-up-intro sign-up-intro--desktop"
          : "sign-up-intro sign-up-intro--brand"
      }
    >
      <h1>建立帳號</h1>
      <p>開始你的健身記錄之旅</p>
    </div>
  );
}
