"use client";

import { useState } from "react";

const YOUTUBE_ID = "opShRwVFX10";

/** Shows a still picture first and only loads YouTube when someone presses play (keeps the page fast). */
export function HeroVideo() {
  const [playing, setPlaying] = useState(false);
  return (
    <figure style={{ margin: 0 }}>
      <div style={{ position: "relative", aspectRatio: "16 / 9", borderRadius: 24, overflow: "hidden", background: "#0A0A0A", boxShadow: "0 30px 60px -20px rgba(10,10,10,0.35)" }}>
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&autoplay=1`}
            title="Welcome to Figures: intro from Joshua Lee"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0 }}
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label="Play the intro video: Welcome to Figures" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", padding: 0, border: 0, background: "transparent", cursor: "pointer" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/redesign/video-poster.jpg" alt="Welcome to Figures: why us in 49 seconds, an intro video from Joshua Lee" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          </button>
        )}
      </div>
    </figure>
  );
}
