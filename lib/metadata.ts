import { Metadata } from 'next';

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const baseUrl = 'https://expenvisor.com';
  const canonical = config.canonical ? `${baseUrl}${config.canonical}` : baseUrl;
  const ogImage = config.ogImage ? `${baseUrl}${config.ogImage}` : `${baseUrl}/og-image.png`;

  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords.join(', '),
    authors: [{ name: 'Expenvisor Team' }],
    creator: 'Expenvisor',
    publisher: 'Expenvisor',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: config.canonical || '/',
    },
    openGraph: {
      title: config.title,
      description: config.description,
      url: canonical,
      siteName: 'Expenvisor',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: config.title,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
      images: [ogImage],
    },
    robots: {
      index: !config.noIndex,
      follow: !config.noIndex,
      googleBot: {
        index: !config.noIndex,
        follow: !config.noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateBlogMetadata(post: {
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  slug: string;
  ogImage?: string;
}): Metadata {
  const baseUrl = 'https://expenvisor.com';
  const canonical = `${baseUrl}/blog/${post.slug}`;
  const ogImage = post.ogImage ? `${baseUrl}${post.ogImage}` : `${baseUrl}/blog/og-${post.slug}.jpg`;

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(', '),
    authors: [{ name: post.author }],
    creator: 'Expenvisor',
    publisher: 'Expenvisor',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url: canonical,
      siteName: 'Expenvisor',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.keywords,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export function generateStructuredData(type: 'organization' | 'article' | 'software', data: any) {
  const baseUrl = 'https://expenvisor.com';

  switch (type) {
    case 'organization':
      return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Expenvisor',
        url: baseUrl,
        logo: `${baseUrl}/logo.png`,
        description: 'AI-powered expense tracking app for smart financial management',
        foundingDate: '2024',
        sameAs: [
          'https://twitter.com/expenvisor',
          'https://linkedin.com/company/expenvisor',
        ],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: 'support@expenvisor.com',
        },
      };

    case 'article':
      return {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: data.title,
        description: data.description,
        author: {
          '@type': 'Person',
          name: data.author,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Expenvisor',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/logo.png`,
          },
        },
        datePublished: data.publishedAt,
        dateModified: data.updatedAt,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `${baseUrl}/blog/${data.slug}`,
        },
        image: data.ogImage ? `${baseUrl}${data.ogImage}` : `${baseUrl}/og-image.png`,
      };

    case 'software':
      return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Expenvisor',
        applicationCategory: 'FinanceApplication',
        operatingSystem: ['iOS', 'Android'],
        description: 'AI-powered expense tracking app with voice input and OCR receipt scanning',
        url: baseUrl,
        downloadUrl: `${baseUrl}/download`,
        screenshot: `${baseUrl}/screenshot.png`,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '10000',
        },
      };

    default:
      return {};
  }
}
