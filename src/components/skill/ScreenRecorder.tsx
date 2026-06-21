"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Status = "idle" | "recording" | "ready" | "error";

const SAMPLE_INTERVAL_MS = 2000;
const MAX_COLLECTED = 40;
const MAX_SENT = 8;
const MAX_FRAME_WIDTH = 1280;

// Pick k items spread evenly across the array, including first and last.
function evenSample<T>(arr: T[], k: number): T[] {
  if (arr.length <= k) return arr;
  const out: T[] = [];
  const step = (arr.length - 1) / (k - 1);
  for (let i = 0; i < k; i++) out.push(arr[Math.round(i * step)]);
  return out;
}

function formatElapsed(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function ScreenRecorder({
  onFramesChange,
}: {
  onFramesChange: (frames: string[]) => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [liveCount, setLiveCount] = useState(0);
  const [frames, setFrames] = useState<string[]>([]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const collectedRef = useRef<string[]>([]);
  const sampleTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const clockTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const supported =
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getDisplayMedia === "function";

  const teardownStream = useCallback(() => {
    if (sampleTimerRef.current) clearInterval(sampleTimerRef.current);
    if (clockTimerRef.current) clearInterval(clockTimerRef.current);
    sampleTimerRef.current = null;
    clockTimerRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
  }, []);

  const captureFrame = useCallback(() => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c || !v.videoWidth) return;

    const scale = Math.min(1, MAX_FRAME_WIDTH / v.videoWidth);
    c.width = Math.round(v.videoWidth * scale);
    c.height = Math.round(v.videoHeight * scale);
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0, c.width, c.height);

    const data = c.toDataURL("image/jpeg", 0.6).split(",")[1];
    if (!data) return;

    const next = collectedRef.current;
    next.push(data);
    // Bound memory: once we hit the cap, thin to every other frame.
    if (next.length > MAX_COLLECTED) {
      collectedRef.current = next.filter((_, i) => i % 2 === 0);
    }
    setLiveCount(collectedRef.current.length);
  }, []);

  const finalize = useCallback(() => {
    const sampled = evenSample(collectedRef.current, MAX_SENT);
    setFrames(sampled);
    onFramesChange(sampled);
    setStatus(sampled.length ? "ready" : "idle");
  }, [onFramesChange]);

  const stop = useCallback(() => {
    teardownStream();
    finalize();
  }, [teardownStream, finalize]);

  const start = useCallback(async () => {
    setError(null);
    if (!supported) {
      setStatus("error");
      setError(
        "Screen recording needs a desktop browser like Chrome or Edge. You can use Describe or Screenshot instead."
      );
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { frameRate: 8 },
        audio: false,
      });
      streamRef.current = stream;
      collectedRef.current = [];
      setLiveCount(0);
      setElapsed(0);
      setFrames([]);
      onFramesChange([]);

      const v = videoRef.current;
      if (v) {
        v.srcObject = stream;
        v.muted = true;
        await v.play().catch(() => {});
      }

      // If the user clicks the browser's native "Stop sharing", end cleanly.
      stream.getVideoTracks()[0]?.addEventListener("ended", () => stop());

      setStatus("recording");
      captureFrame();
      sampleTimerRef.current = setInterval(captureFrame, SAMPLE_INTERVAL_MS);
      clockTimerRef.current = setInterval(
        () => setElapsed((e) => e + 1),
        1000
      );
    } catch (err: unknown) {
      teardownStream();
      setStatus("error");
      // A user cancelling the picker throws too; treat that as a soft reset.
      const name = err instanceof Error ? err.name : "";
      if (name === "NotAllowedError" || name === "AbortError") {
        setStatus("idle");
        return;
      }
      setError(
        err instanceof Error ? err.message : "Could not start screen recording."
      );
    }
  }, [supported, captureFrame, stop, teardownStream, onFramesChange]);

  const reset = useCallback(() => {
    teardownStream();
    collectedRef.current = [];
    setFrames([]);
    setLiveCount(0);
    setElapsed(0);
    setStatus("idle");
    onFramesChange([]);
  }, [teardownStream, onFramesChange]);

  const removeFrame = useCallback(
    (index: number) => {
      setFrames((prev) => {
        const next = prev.filter((_, i) => i !== index);
        onFramesChange(next);
        return next;
      });
    },
    [onFramesChange]
  );

  // Stop any live capture if the component unmounts.
  useEffect(() => teardownStream, [teardownStream]);

  return (
    <div className="space-y-4">
      {/* Hidden capture plumbing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Live preview while recording */}
      <div
        className={
          status === "recording" ? "block" : "hidden"
        }
      >
        <div className="relative overflow-hidden rounded-lg border border-zinc-800 bg-black">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="max-h-64 w-full object-contain"
          />
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/70 px-3 py-1">
            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
            <span className="font-mono text-xs text-white">
              {formatElapsed(elapsed)}
            </span>
          </div>
          <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 font-mono text-xs text-zinc-300">
            {liveCount} frame{liveCount === 1 ? "" : "s"}
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={stop}
            className="rounded bg-[#c8f040] px-4 py-2 text-sm font-semibold text-[#0a0a0c] transition-colors hover:bg-[#a0c030]"
          >
            Stop and use this
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition-colors hover:border-zinc-500"
          >
            Cancel
          </button>
          <p className="text-xs text-zinc-600">
            Walk through the task once. We grab a still every couple of seconds.
          </p>
        </div>
      </div>

      {/* Idle / start */}
      {status !== "recording" && frames.length === 0 && (
        <div className="rounded-lg border-2 border-dashed border-zinc-800 p-8 text-center">
          <p className="mb-1 text-sm text-zinc-300">
            Record yourself doing the task once.
          </p>
          <p className="mx-auto mb-4 max-w-md text-xs text-zinc-600">
            Your screen stays in your browser. We sample a few still frames, you
            remove anything sensitive, and only the frames you approve are sent
            to extract the steps. We discard them after.
          </p>
          <button
            type="button"
            onClick={start}
            disabled={!supported}
            className="rounded bg-zinc-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
          >
            Start screen recording
          </button>
          {!supported && (
            <p className="mt-3 text-xs text-amber-500/80">
              Screen recording is not available in this browser. Try Chrome or
              Edge on desktop, or use Describe or Screenshot.
            </p>
          )}
        </div>
      )}

      {/* Captured frames to review */}
      {frames.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-300">
              {frames.length} frame{frames.length === 1 ? "" : "s"} captured.
              Remove any that show sensitive data.
            </p>
            <button
              type="button"
              onClick={reset}
              className="text-xs text-zinc-500 underline transition-colors hover:text-zinc-300"
            >
              Re-record
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {frames.map((f, i) => (
              <div
                key={i}
                className="group relative overflow-hidden rounded border border-zinc-800"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`data:image/jpeg;base64,${f}`}
                  alt={`Captured frame ${i + 1}`}
                  className="aspect-video w-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => removeFrame(i)}
                  aria-label={`Remove frame ${i + 1}`}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/70 text-xs text-white opacity-0 transition-opacity hover:bg-black group-hover:opacity-100"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && status === "error" && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
