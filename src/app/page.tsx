import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { Skills } from "@/components/sections/Skills";
import { Experience } from "@/components/sections/Experience";
import { Blog } from "@/components/sections/Blog";

// Narrative order: who → what I can do → the toolbox → proof → history.
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      <Skills />
      <ProjectsGrid />
      <Experience />
      <Blog />
    </>
  );
}
