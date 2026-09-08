import { ArrowDown, ArrowRight, Download, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { TerminalWindow } from "@/components/ui/TerminalWindow";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { TypingRoles } from "@/components/sections/TypingRoles";
import { HeroVisual } from "@/components/hero/HeroVisual";
import { Reveal } from "@/components/motion/Reveal";
import { SplitReveal } from "@/components/motion/SplitReveal";
import { Parallax } from "@/components/motion/Parallax";
import { Magnetic } from "@/components/motion/Magnetic";
import { site } from "@/data/site";
import { links } from "@/data/links";
import { projects, clientWork } from "@/data/projects";
import { skills } from "@/data/skills";

// Derived from the data files rather than written by hand, so the numbers
// cannot drift out of sync with the work actually listed on the page.
const stats = [
  { value: site.yearsExperience, label: "Years building for the web" },
  { value: `${projects.length + clientWork.length}`, label: "Projects shipped" },
  { value: `${skills.flatMap((group) => group.skills).length}`, label: "Tools in rotation" },
];

const socials = [
  { href: links.github, label: "GitHub profile", Icon: GithubIcon },
  { href: links.linkedin, label: "LinkedIn profile", Icon: LinkedinIcon },
  { href: `mailto:${site.email}`, label: "Send an email", Icon: Mail },
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative isolate pb-20 pt-12 sm:pb-28 lg:pt-20"
    >
      {/* Background layers. Each moves at its own rate on scroll, which is what
          separates them into foreground, middle and far distance. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <Parallax
          speed={0.5}
          className="absolute -left-40 -top-24 h-[460px] w-[460px] rounded-full bg-accent/10 blur-[120px]"
        />
        <Parallax
          speed={-0.35}
          className="absolute -right-32 top-32 h-[420px] w-[420px] rounded-full bg-accent-2/10 blur-[130px]"
        />
      </div>

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-xs text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open to new work
              </p>
            </Reveal>

            <SplitReveal
              as="h1"
              id="hero-heading"
              text={`Hi, I'm ${site.name}`}
              delay={0.1}
              className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            />

            <Reveal delay={0.35} className="mt-3">
              <TypingRoles roles={site.typingRoles} />
            </Reveal>

            <Reveal delay={0.42} className="mt-6">
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                {site.heroIntro}
              </p>
            </Reveal>

            <Reveal stagger delay={0.5} className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button href="/#projects">
                  View Projects <ArrowRight size={16} />
                </Button>
              </Magnetic>
              <Magnetic>
                <Button href={site.resumeUrl} variant="secondary" external>
                  Download Resume <Download size={16} />
                </Button>
              </Magnetic>
            </Reveal>

            <Reveal stagger delay={0.58} className="mt-8 flex items-center gap-4">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  {...(href.startsWith("mailto:")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                  aria-label={label}
                  className="text-muted-foreground transition-colors duration-200 hover:text-accent"
                >
                  <Icon size={20} />
                </a>
              ))}
            </Reveal>

            <Reveal
              stagger
              selector="div"
              delay={0.64}
              className="mt-12 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6"
            >
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </Reveal>
          </div>

          {/* Foreground composition: the interactive scene sits behind, the
              terminal card floats in front of it on a slower parallax track. */}
          <div className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-[480px]">
            <HeroVisual />

            <Parallax
              speed={-0.22}
              className="pointer-events-none absolute -bottom-6 left-0 w-[92%] max-w-[320px] sm:-left-6"
            >
              <TerminalWindow
                lines={[
                  { text: "whoami" },
                  { text: "jeremia-sunny — full-stack engineer", prompt: false },
                  { text: "stack --primary" },
                  { text: "react · next.js · nestjs · postgresql", prompt: false },
                  { text: "experience --years" },
                  {
                    text: `${site.yearsExperience} years, shipping in production`,
                    prompt: false,
                  },
                ]}
              />
            </Parallax>
          </div>
        </div>

        <div className="mt-20 flex justify-center lg:mt-14">
          <a
            href="#about"
            className="group inline-flex flex-col items-center gap-2 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
          >
            Scroll
            <ArrowDown
              size={16}
              aria-hidden="true"
              className="animate-bounce transition-transform group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </Container>
    </section>
  );
}
