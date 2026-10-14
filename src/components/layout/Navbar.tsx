"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { cn } from "@/lib/utils";

// Order mirrors the section order in `src/app/page.tsx`.
const NAV_ITEMS = [
  { href: "/#about", label: "About" },
  { href: "/#capabilities", label: "Capabilities" },
  { href: "/#skills", label: "Skills" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/#blog", label: "Writing" },
  { href: "/#contact", label: "Contact" },
];

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.split("#")[1]);

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Highlights whichever section is crossing the middle of the viewport. The
  // negative rootMargin collapses the observation area to a thin band there, so
  // at most one section is ever "current". Sections only exist on the home
  // page; elsewhere this finds nothing and quietly does nothing.
  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    // Tracking the whole visible set — rather than reacting to each entry —
    // means the highlight clears when the band sits in a gap such as the hero,
    // instead of keeping whichever section happened to light up last.
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActiveId(SECTION_IDS.find((id) => visible.has(id)) ?? "");
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
            jeremia<span className="text-accent">.dev</span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.href.split("#")[1];
              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    // The underline grows from the left on hover and stays put
                    // while the section is in view.
                    "relative text-sm transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:bg-accent after:transition-transform after:duration-300 hover:text-foreground hover:after:scale-x-100",
                    isActive
                      ? "text-foreground after:scale-x-100"
                      : "text-muted-foreground after:scale-x-0"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              ref={triggerRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-hover lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </Container>

      <MobileMenu
        open={open}
        onClose={() => setOpen(false)}
        items={NAV_ITEMS}
        activeId={activeId}
        triggerRef={triggerRef}
      />

      <ScrollProgress />
    </header>
  );
}
