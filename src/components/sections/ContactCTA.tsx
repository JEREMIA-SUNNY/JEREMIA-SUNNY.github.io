import { Clock, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ContactForm } from "@/components/sections/ContactForm";
import { site } from "@/data/site";

export function ContactCTA() {
  return (
    <Section id="contact" labelledBy="contact-heading" className="overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <Parallax
          speed={0.4}
          className="absolute left-1/2 top-10 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-accent/8 blur-[130px]"
        />
      </div>

      <SectionHeading
        id="contact-heading"
        eyebrow="Contact"
        title="Interested in working together?"
      />

      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <Reveal stagger className="space-y-6">
          <a
            href={`mailto:${site.email}`}
            className="inline-flex items-center gap-3 text-lg font-medium text-accent transition-colors hover:text-foreground"
          >
            <Mail size={20} /> {site.email}
          </a>

          <p className="text-sm text-muted-foreground">{site.availability}</p>

          <div className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-sm text-muted-foreground">
            <Clock size={18} className="mt-0.5 shrink-0 text-accent" />
            <span>{site.responseTime}</span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
