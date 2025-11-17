"use client";

interface ContentSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentSection({ title, children, className = "" }: ContentSectionProps) {
  return (
    <div className={`bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl mb-6 ${className}`}>
      <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
      <div className="text-text-secondary-light leading-relaxed space-y-4">{children}</div>
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
      {description && <p className="mb-6">{description}</p>}
      <ol className="space-y-4">
        {steps.map((step) => (
          <li key={step.number} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center text-white font-bold">
              {step.number}
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">{step.title}</h3>
              <p>{step.description}</p>
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

