"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";

export default function ToolCard({
  title,
  slug,
  desc,
}: {
  title: string;
  slug: string;
  desc: string;
}) {
  const handleClick = () => {
    track("tool_clicked", { tool: slug });
  };

  return (
    <Link href={`/tools/${slug}`} className="group" onClick={handleClick}>
      <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl card-hover h-full flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-accent transition-colors">
            {title}
          </h2>
          <p className="text-text-secondary-light text-sm">{desc}</p>
        </div>
        <div className="mt-6 text-accent text-sm">Open →</div>
      </div>
    </Link>
  );
}

