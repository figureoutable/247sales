"use client";

import { FolderOpen, Upload } from "lucide-react";
import { useCallback, useRef, useState, type DragEvent, type KeyboardEvent } from "react";

type Uploaded = { id: string; name: string; size: number };

export function InvestorPortalPanel({
  accentHex,
  preparedBy,
}: {
  accentHex?: string;
  preparedBy: string;
}) {
  const [files, setFiles] = useState<Uploaded[]>([]);
  const [driveUrl, setDriveUrl] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((list: FileList | File[]) => {
    const arr = Array.from(list);
    setFiles((prev) => [
      ...prev,
      ...arr.map((f, i) => ({
        id: `${f.name}-${f.size}-${Date.now()}-${i}`,
        name: f.name,
        size: f.size,
      })),
    ]);
  }, []);

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files?.length) addFiles(e.dataTransfer.files);
  };

  const accent = accentHex ?? "#7c3aed";

  return (
    <div className="space-y-4 px-1 pb-2">
      <div
        className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        style={{ borderLeftWidth: 4, borderLeftColor: accent }}
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          Pre-series A — investor data room — confidential
        </p>
        <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-gray-500">
          Prepared by {preparedBy}
        </p>
      </div>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="flex items-center gap-2 text-base font-bold text-gray-900">
          <FolderOpen className="h-5 w-5 shrink-0" style={{ color: accent }} aria-hidden />
          Investor Portal Files
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-gray-600">
          Drag and drop files below to keep your data room docs in one place. This page is intentionally
          document-first (no charts).
        </p>
        <div
          role="button"
          tabIndex={0}
          aria-label="File drop zone. Click or press Enter to choose files."
          onKeyDown={(e: KeyboardEvent) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              inputRef.current?.click();
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`mt-5 flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-10 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-gray-300 focus-visible:ring-offset-2 ${
            dragOver ? "border-gray-400 bg-gray-50" : "border-gray-200 bg-white"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            className="hidden"
            tabIndex={-1}
            onChange={(e) => {
              if (e.target.files?.length) addFiles(e.target.files);
              e.target.value = "";
            }}
          />
          <Upload className="h-10 w-10 shrink-0" style={{ color: accent }} strokeWidth={1.75} aria-hidden />
          <p className="mt-4 text-center text-sm font-semibold text-gray-900">Drop files here, or click to choose</p>
          <p className="mt-2 max-w-md text-center text-xs leading-relaxed text-gray-500">
            Supports pitch deck, financial model, legal docs, and diligence files.
          </p>
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <label className="block text-sm font-semibold text-gray-900" htmlFor="investor-drive-url">
          Google Drive link (optional)
        </label>
        <input
          id="investor-drive-url"
          type="url"
          value={driveUrl}
          onChange={(e) => setDriveUrl(e.target.value)}
          placeholder="Paste Google Drive folder URL here"
          className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 shadow-sm placeholder:text-gray-400"
        />
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-bold text-gray-900">Uploaded Documents</h2>
          <button
            type="button"
            disabled={files.length === 0}
            onClick={() => setFiles([])}
            className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear all
          </button>
        </div>
        <div className="mt-4 border-t border-gray-100 pt-4">
          {files.length === 0 ? (
            <p className="text-sm text-gray-400">No files uploaded yet.</p>
          ) : (
            <ul className="space-y-2">
              {files.map((f) => (
                <li key={f.id} className="flex items-center justify-between gap-2 text-sm text-gray-800">
                  <span className="min-w-0 truncate font-medium">{f.name}</span>
                  <span className="shrink-0 tabular-nums text-xs text-gray-500">
                    {f.size >= 1024 * 1024
                      ? `${(f.size / (1024 * 1024)).toFixed(1)} MB`
                      : `${(f.size / 1024).toFixed(1)} KB`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
}
