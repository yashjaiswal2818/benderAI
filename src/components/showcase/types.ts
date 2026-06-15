import type { FC } from "react";

export type ShowcaseScreen = {
  id: string;
  /** Short step label, e.g. "Onboarding". */
  label: string;
  Screen: FC;
};

export type ShowcaseApp = {
  id: string;
  /** The generated app's name. */
  name: string;
  niche: string;
  /** The visual style it was generated in, e.g. "glassmorphism". */
  themeLabel: string;
  /** The prompt-like one-liner shown in the preview. */
  prompt: string;
  /** First screen doubles as the card cover. */
  screens: ShowcaseScreen[];
};
