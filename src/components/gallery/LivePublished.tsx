"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type LiveItem = { id: string; title: string };

export function LivePublished() {
  const [items, setItems] = useState<LiveItem[]>([]);

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("gallery-public-skills")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "skills",
          filter: "visibility=eq.public",
        },
        (payload) => {
          const row = payload.new as LiveItem;
          if (!row?.id) return;
          setItems((prev) =>
            [{ id: row.id, title: row.title }, ...prev].slice(0, 4),
          );
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <div className="mb-10 rounded-xl border border-[#E7DFCD] bg-white/70 p-4">
      <p className="font-mono text-xs uppercase tracking-widest text-[#C9512C]">
        Just published
      </p>
      <ul className="mt-2 space-y-1">
        {items.map((item) => (
          <li key={item.id} className="text-sm text-[#56514a]">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#F5B62B]" />
            {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
