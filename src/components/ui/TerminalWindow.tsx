export function TerminalWindow({
  lines,
}: {
  lines: { prompt?: boolean; text: string }[];
}) {
  return (
    <div
      className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 bg-[#0d1117] shadow-2xl shadow-black/20"
      aria-hidden="true"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
        <span className="ml-2 font-mono text-xs text-white/40">zsh</span>
      </div>
      <div className="space-y-1.5 px-4 py-4 font-mono text-sm leading-relaxed">
        {lines.map((line, i) => (
          <p key={i} className={line.prompt === false ? "text-white/70" : "text-[#7ee787]"}>
            {line.prompt !== false && <span className="text-white/40">$ </span>}
            {line.text}
          </p>
        ))}
      </div>
    </div>
  );
}
