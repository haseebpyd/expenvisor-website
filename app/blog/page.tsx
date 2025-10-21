import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';
import { generateMetadata as generateSEOMetadata } from '@/lib/metadata';
import BlogCard from '@/components/blog/BlogCard';
import BlogLayout from '@/components/blog/BlogLayout';

export const metadata: Metadata = generateSEOMetadata({
  title: 'Expenvisor Blog - AI Finance Tips & Expense Tracking Guides',
  description: 'Discover expert insights on AI-powered expense tracking, personal finance management, and smart budgeting strategies. Stay updated with the latest fintech trends.',
  keywords: ['expense tracking blog', 'AI finance tips', 'personal finance guides', 'budgeting advice', 'fintech insights'],
  canonical: '/blog',
});

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <BlogLayout>
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Expenvisor <span className="gradient-text">Blog</span>
            </h1>
            <p className="text-xl text-text-secondary-light max-w-3xl mx-auto">
              Expert insights on AI-powered expense tracking, personal finance management, 
              and smart budgeting strategies to help you take control of your finances.
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-2xl p-12 shadow-2xl">
              <h2 className="text-3xl font-bold text-text-primary-light dark:text-text-primary-dark mb-6">
                Ready to Transform Your Financial Management?
              </h2>
              <p className="text-lg text-text-secondary-light dark:text-text-secondary-dark mb-8 max-w-2xl mx-auto">
                Join thousands of users who are already using AI-powered expense tracking 
                to take control of their finances with Expenvisor.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/download"
                  className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 min-h-[44px]"
                >
                  Download Expenvisor
                </a>
                <a
                  href="/features"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-accent text-accent rounded-xl font-semibold text-lg hover:bg-accent hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
