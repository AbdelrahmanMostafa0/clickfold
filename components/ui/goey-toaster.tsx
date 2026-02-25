"use client";

import { GoeyToaster } from "goey-toast";
import "goey-toast/styles.css";

export function GoeyToasterProvider() {
  return <GoeyToaster position="bottom-right" theme="dark" />;
}
