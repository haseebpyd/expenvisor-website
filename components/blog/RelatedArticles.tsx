import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface RelatedArticlesProps {
  posts: BlogPost[];
}

export default function RelatedArticles({ posts }: RelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-text-primary-light dark:text-text-primary-dark">
          Related Articles
        </h2>
        <Link
          href="/blog"
          className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-200"
        >
          <span className="text-sm font-medium">View all articles</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="group bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-bold text-text-primary-light dark:text-text-primary-dark mb-3 group-hover:text-accent transition-colors duration-200 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-2">
                  {post.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-1 text-sm text-text-secondary-light dark:text-text-secondary-dark">
                    <span>{post.readingTime} min</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
