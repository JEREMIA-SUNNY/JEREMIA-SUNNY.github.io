import { Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { site } from "@/data/site";
import { links } from "@/data/links";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <Container>
        <div className="flex flex-col items-center gap-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Built with Next.js.</p>
          <div className="flex items-center gap-4">
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              className="transition-colors hover:text-foreground"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-foreground"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${site.email}`}
              aria-label="Send an email"
              className="transition-colors hover:text-foreground"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
