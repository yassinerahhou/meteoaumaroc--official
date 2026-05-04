"use client";

import Link from "next/link";
import { useLanguage } from "@/app/lib/LanguageContext";

interface Props {
  current: string;
}

export default function Breadcrumb({ current }: Props) {
  const { t } = useLanguage();
  return (
    <div style={{ background: "var(--color-surface)", borderBottom: "1px solid var(--color-border)", padding: "0.75rem 0" }}>
      <div className="container">
        <nav style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.8rem", color: "var(--color-text-muted)" }}>
          <Link href="/" style={{ color: "var(--color-primary)" }}>{t("city.breadcrumb.home")}</Link>
          <span>›</span>
          <span style={{ color: "var(--color-text)", fontWeight: 600 }}>{current}</span>
        </nav>
      </div>
    </div>
  );
}
