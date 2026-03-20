"use client";

import { useState } from "react";

export default function VideoCard({ title, views, embedSrc }) {
  const [overlayDismissed, setOverlayDismissed] = useState(false);

  return (
    <div className="group w-full aspect-[9/16] bg-[#5E7A7A] relative overflow-hidden border border-[#F7F5F0]/10 rounded-xl">
      <iframe
        src={embedSrc}
        title={title}
        className="absolute inset-0 w-full h-full"
        loading="lazy"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        allowFullScreen
      />
      <button
        type="button"
        onClick={() => setOverlayDismissed(true)}
        aria-label={`Play ${title}`}
        className={`absolute inset-0 w-full h-full text-left transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F7F5F0] focus-visible:ring-offset-2 focus-visible:ring-offset-[#5E7A7A] ${
          overlayDismissed ? "opacity-0 pointer-events-none" : "opacity-100"
        } group-hover:opacity-0`}
      >
        <div className="absolute inset-0 bg-black/35 group-hover:bg-black/10 transition-colors" />
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#3B5252] to-transparent pointer-events-none">
          <div className="text-sm font-bold text-white mb-1">{title}</div>
          <div className="text-xs uppercase tracking-widest text-[#E8E4DB] opacity-80 flex items-center gap-2">
            {views}
          </div>
        </div>
      </button>
    </div>
  );
}
