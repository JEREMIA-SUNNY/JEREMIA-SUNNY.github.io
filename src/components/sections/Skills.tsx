import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { iconMap } from "@/components/ui/icon-map";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills" labelledBy="skills-heading">
      <SectionHeading
        id="skills-heading"
        eyebrow="Skills"
        title="Technical toolbox"
        description="Grouped by where each tool shows up in the stack."
      />

      <div className="space-y-10">
        {skills.map((category) => (
          <div key={category.name}>
            <Reveal>
              <h3 className="mb-4 font-mono text-sm text-muted-foreground">{category.name}</h3>
            </Reveal>

            <Reveal stagger selector="li" y={16}>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {category.skills.map((skill) => {
                  const Icon = iconMap[skill.icon];
                  return (
                    <li
                      key={skill.name}
                      className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-3 text-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-surface-hover"
                    >
                      {Icon && (
                        <Icon
                          size={18}
                          className="shrink-0 text-accent transition-transform duration-200 group-hover:scale-110"
                        />
                      )}
                      <span>{skill.name}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        ))}
      </div>
    </Section>
  );
}
