"use client";

import Link from "next/link";

export function SpaIndexRoute() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">What this is</h2>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Your app is still using Next.js routing. This page embeds a small
        TanStack Router SPA under <span className="font-medium">/spa</span> so
        you can use TanStack Router alongside Next when desired.
      </p>
      <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm dark:border-zinc-800 dark:bg-zinc-900/30">
        Tip: go back to the Next home page at{" "}
        <Link href="/" className="font-medium underline">
          /
        </Link>
        .
      </div>
    </div>
  );
}
