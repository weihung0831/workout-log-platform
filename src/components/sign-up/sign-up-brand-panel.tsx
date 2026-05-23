import Image from "next/image";

import { signUpAssets } from "./sign-up-assets";
import { SignUpIntro } from "./sign-up-intro";

export function SignUpBrandPanel() {
  return (
    <aside className="sign-up-brand-panel" aria-label="FitLog">
      <Image
        alt="FitLog"
        className="sign-up-logo sign-up-logo--compact"
        height={141}
        priority
        src={signUpAssets.fitlogCompact}
        width={130}
      />
      <Image
        alt="FitLog"
        className="sign-up-logo sign-up-logo--desktop"
        height={178}
        priority
        src={signUpAssets.fitlogDesktop}
        width={200}
      />
      <SignUpIntro />
    </aside>
  );
}
