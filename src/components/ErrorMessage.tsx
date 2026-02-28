type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-2xl border border-rose-200/80 bg-gradient-to-r from-rose-50 to-orange-50 p-4 text-sm text-rose-700 shadow-[0_14px_30px_-24px_rgba(225,29,72,0.5)]">
      {message}
    </div>
  );
}
