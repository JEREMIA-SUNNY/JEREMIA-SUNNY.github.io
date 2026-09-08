export function ProjectMockup({ title }: { title: string }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-t-2xl border-b border-border">
      <div className="flex items-center gap-1.5 bg-[#0d1117] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex flex-1 items-center justify-center bg-gradient-to-br from-accent/20 via-surface to-surface p-6">
        <p className="text-center font-mono text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
}
