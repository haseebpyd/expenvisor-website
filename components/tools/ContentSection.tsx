"use client";

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ title, children, className = "" }: ContentSectionProps) {
  return (
    <div className={`bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-6">{title}</h2>
      <div className="text-text-secondary-dark text-base leading-relaxed space-y-4 [&>p]:text-base [&>h3]:text-lg [&>h3]:font-semibold [&>h3]:text-white [&>h3]:mb-3 [&>h3]:mt-4">{children}</div>
    </div>
  );
}

interface Step {
  number: number;
  title: string;
  description: string;
}

interface HowToSectionProps {
  title: string;
  steps: Step[];
  description?: string;
}

export function HowToSection({ title, steps, description }: HowToSectionProps) {
  return (
    <ContentSection title={title}>
      {description && <p className="mb-6 text-base">{description}</p>}
      <ol className="space-y-6">
        {steps.map((step) => (
          <li key={step.number} className="flex gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold text-lg">
              {step.number}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{step.title}</h3>
              <p className="text-base">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </ContentSection>
  );
}

export function generateHowToSchema(steps: Step[], name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step) => ({
      "@type": "HowToStep",
      position: step.number,
      name: step.title,
      text: step.description,
    })),
  };
}

