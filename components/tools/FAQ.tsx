"use client";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  items: FAQItem[];
  title?: string;
}

export default function FAQ({ items, title = "Frequently Asked Questions" }: FAQProps) {
  return (
    <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-6 shadow-2xl">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <h4 className="text-lg font-semibold text-white mb-3">{item.question}</h4>
            <p className="text-text-secondary-light text-base leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

