export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
      {children}
    </span>
  );
}
