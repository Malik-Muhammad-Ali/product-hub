import { Reveal } from "@/components/motion/reveal";

export function PostBody({ paragraphs }: { paragraphs: string[] }) {
  return (
    <div>
      {paragraphs.map((paragraph, index) => (
        <Reveal key={index} delay={index === 0 ? 0 : 0.05}>
          <p className="mt-6 text-lg leading-relaxed text-charcoal-700 first:mt-0">
            {paragraph}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
