interface FieldProps {
  label: string | React.ReactNode;
  children: React.ReactNode;
}

export function Field({ label, children }: FieldProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <label className="text-[#374151] text-sm font-boldFont">{label}</label>
      {children}
    </div>
  );
}

interface InputFrameProps {
  children: React.ReactNode;
  rightAdornment?: React.ReactNode;
}

export function InputFrame({ children, rightAdornment }: InputFrameProps) {
  return (
    <div
      className={`
        px-4 py-4 bg-white rounded-xl
        border border-white60
        focus-within:ring-1
        focus-within:ring-mainBlack
        flex gap-3
        ${rightAdornment ? 'items-center' : ''}
      `}
    >
      <div className="flex-1 min-w-0">{children}</div>
      {rightAdornment ? (
        <div className="shrink-0 text-black40">{rightAdornment}</div>
      ) : null}
    </div>
  );
}
