"use client";

import React, { useMemo, useState } from "react";

type Confidence = "High" | "Medium" | "Low";

type Segment = {
  id: string;
  street: string;
  confidence: Confidence;
  distanceMeters: number;
  updatedMinutesAgo: number;
};

const initialSegments: Segment[] = [
  { id: "a", street: "Courtenay Place", confidence: "Low", distanceMeters: 220, updatedMinutesAgo: 2 },
  { id: "b", street: "Tory Street", confidence: "Medium", distanceMeters: 350, updatedMinutesAgo: 5 },
  { id: "c", street: "Kent Terrace", confidence: "High", distanceMeters: 480, updatedMinutesAgo: 1 },
  { id: "d", street: "Cambridge Terrace", confidence: "Medium", distanceMeters: 610, updatedMinutesAgo: 8 },
];

function confidenceBadgeClass(confidence: Confidence) {
  if (confidence === "High") return "bg-green-600/20 text-green-200 border-green-500/30";
  if (confidence === "Medium") return "bg-yellow-600/20 text-yellow-200 border-yellow-500/30";
  return "bg-red-600/20 text-red-200 border-red-500/30";
}

function bumpConfidence(confidence: Confidence): Confidence {
  if (confidence === "Low") return "Medium";
  if (confidence === "Medium") return "High";
  return "High";
}

export default function ParkyPage() {
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [message, setMessage] = useState<string | null>(null);

  const top3 = useMemo(() => {
    const score = (c: Confidence) => (c === "High" ? 3 : c === "Medium" ? 2 : 1);
    return [...segments]
      .sort((a, b) => score(b.confidence) - score(a.confidence) || a.distanceMeters - b.distanceMeters)
      .slice(0, 3);
  }, [segments]);

  function handleReportLeftSpot() {
    const nearest = [...segments].sort((a, b) => a.distanceMeters - b.distanceMeters)[0];

    setSegments((prev) =>
      prev.map((s) =>
        s.id === nearest.id
          ? { ...s, confidence: bumpConfidence(s.confidence), updatedMinutesAgo: 0 }
          : s
      )
    );

    setMessage(`Report submitted (mock): increased confidence for ${nearest.street}`);
    window.setTimeout(() => setMessage(null), 2500);
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">Parky</h1>
          <p className="text-zinc-400">Prototype loop: mock confidence + mock reporting.</p>
        </header>

        {message ? (
          <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-900/60 px-4 py-3 text-sm">
            {message}
          </div>
        ) : null}

        <section className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2 rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <div className="flex flex-col gap-3">
              <label className="text-sm text-zinc-300">Destination</label>
              <input
                className="w-full rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-600"
                placeholder="Search a destination (mock)"
              />

              <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium">Parking confidence (mock)</h2>
                  <span className="text-xs text-zinc-500">Wellington sample data</span>
                </div>

                <div className="mt-4 grid gap-3">
                  {segments.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-3"
                    >
                      <div className="flex flex-col">
                        <span className="font-medium">{s.street}</span>
                        <span className="text-sm text-zinc-400">
                          {s.distanceMeters}m away • updated {s.updatedMinutesAgo} min ago
                        </span>
                      </div>

                      <span className={`rounded-full border px-3 py-1 text-sm ${confidenceBadgeClass(s.confidence)}`}>
                        {s.confidence}
                      </span>
                    </div>
                  ))}
                </div>

                <button
                  className="mt-4 w-full rounded-lg bg-zinc-100 px-3 py-2 text-zinc-900 hover:bg-white"
                  type="button"
                  onClick={handleReportLeftSpot}
                >
                  I left a spot (mock)
                </button>

                <p className="mt-2 text-xs text-zinc-500">
                  Next: replace this mock handler with a real backend report API.
                </p>
              </div>
            </div>
          </div>

          <aside className="rounded-xl border border-zinc-800 bg-zinc-900/30 p-5">
            <h2 className="text-lg font-medium">Top streets to try</h2>
            <p className="mt-1 text-sm text-zinc-400">Sorted by confidence, then distance.</p>

            <div className="mt-4 grid gap-3">
              {top3.map((s, idx) => (
                <div key={s.id} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-zinc-500">#{idx + 1}</span>
                    <span className={`rounded-full border px-2 py-1 text-xs ${confidenceBadgeClass(s.confidence)}`}>
                      {s.confidence}
                    </span>
                  </div>
                  <div className="mt-2 font-medium">{s.street}</div>
                  <div className="mt-1 text-sm text-zinc-400">{s.distanceMeters}m away</div>
                </div>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}