export function LoadingIndicator() {
  return (
    <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-r from-sky-50 to-indigo-50 p-4 text-sm text-sky-700 shadow-[0_14px_30px_-24px_rgba(59,130,246,0.5)]">
      <div className="flex items-center gap-3">
        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-sky-400" />
        <span>天気情報を読み込み中です...</span>
      </div>
    </div>
  );
}
