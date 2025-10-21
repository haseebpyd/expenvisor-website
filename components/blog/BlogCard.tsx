import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group bg-surface-elevated-light dark:bg-surface-elevated-dark rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
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
          <div className="flex items-center gap-4 text-sm text-text-secondary-light dark:text-text-secondary-dark mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime} min read</span>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-text-primary-light dark:text-text-primary-dark mb-3 group-hover:text-accent transition-colors duration-200">
            {post.title}
          </h2>
          
          <p className="text-text-secondary-light dark:text-text-secondary-dark mb-4 line-clamp-3">
            {post.description}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
