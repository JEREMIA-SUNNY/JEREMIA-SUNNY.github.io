"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type NavItem = { href: string; label: string };

export function MobileMenu({
  open,
  onClose,
  items,
  activeId,
  triggerRef,
}: {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  /** id of the section currently in view, mirrored from the navbar. */
  activeId: string;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!open) return;

    firstLinkRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, triggerRef]);

  if (!open) return null;

  return (
    <div
      id="mobile-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      className="border-t border-border bg-background px-4 pb-6 pt-2 lg:hidden"
    >
      <nav className="flex flex-col gap-1">
        {items.map((item, i) => {
          const isActive = activeId === item.href.split("#")[1];
          return (
            <a
              key={item.href}
              ref={i === 0 ? firstLinkRef : undefined}
              href={item.href}
              onClick={onClose}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-surface-hover",
                isActive && "bg-accent-soft text-accent"
              )}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
