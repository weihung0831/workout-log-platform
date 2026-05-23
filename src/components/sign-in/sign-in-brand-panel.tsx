import Image from "next/image";

import { signInAssets } from "./sign-in-assets";
import { SignInIntro } from "./sign-in-intro";

export function SignInBrandPanel() {
  return (
    <aside className="sign-in-brand-panel" aria-label="FitLog">
      <Image
        className="sign-in-logo sign-in-logo--compact"
        src={signInAssets.fitlogCompact}
        alt="FitLog"
        width={130}
        height={141}
        priority
      />
      <Image
        className="sign-in-logo sign-in-logo--desktop"
        src={signInAssets.fitlogDesktop}
        alt="FitLog"
        width={200}
        height={178}
        priority
      />
      <SignInIntro />
    </aside>
  );
}
