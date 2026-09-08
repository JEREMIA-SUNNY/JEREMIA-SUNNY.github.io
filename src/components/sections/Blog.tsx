import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { blogPosts, blogPlaceholderCount } from "@/data/blog";

export function Blog() {
  const hasPosts = blogPosts.length > 0;

  return (
    <Section id="blog" labelledBy="blog-heading">
      <SectionHeading
        id="blog-heading"
        eyebrow="Writing"
        title="Notes & articles"
        description={hasPosts ? undefined : "Nothing published yet — first posts are on the way."}
      />

      <Reveal stagger className="grid gap-6 sm:grid-cols-3">
        {hasPosts
          ? blogPosts.map((post) => (
              <a
                key={post.title}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:bg-surface-hover"
              >
                <p className="font-mono text-xs text-muted-foreground">
                  {post.date} · {post.readTime}
                </p>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-muted-foreground">{post.excerpt}</p>
              </a>
            ))
          : Array.from({ length: blogPlaceholderCount }).map((_, i) => (
              <div
                key={i}
                aria-disabled="true"
                className="flex min-h-[160px] flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-border bg-surface/50 p-5 text-center"
              >
                <p className="text-sm font-medium text-muted-foreground">Coming soon</p>
                <p className="text-xs text-muted-foreground/70">First article in progress</p>
              </div>
            ))}
      </Reveal>
    </Section>
  );
}
