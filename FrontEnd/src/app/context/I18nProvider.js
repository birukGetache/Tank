"use client"; // This must be a client component

import { I18nextProvider } from "react-i18next";
import i18n from "@/app/i18n"; // Adjust the path based on your structure

export default function I18nProvider({ children }) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
