"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/base-path";

const EKRANIDZE_PATH = `${BASE_PATH}/ekranidze`;

// Static export can't use next.config.js redirects or the server
// `redirect()` function (both are unsupported with `output: "export"`),
// so the root path redirects client-side to the default restaurant.
// The hand-built href/meta-refresh below need BASE_PATH themselves —
// unlike next/link, they don't get it prefixed automatically.
export function HomeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace(EKRANIDZE_PATH);
  }, [router]);

  return (
    <>
      {/* No-JS / slow-JS fallback — React 19 hoists this into <head>. */}
      <meta httpEquiv="refresh" content={`0; url=${EKRANIDZE_PATH}`} />
      <p className="p-6 text-sm text-muted-foreground">
        Переходим на <a href={EKRANIDZE_PATH} className="underline">Экранидзе</a>…
      </p>
    </>
  );
}
