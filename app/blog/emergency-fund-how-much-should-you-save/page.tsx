import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Link from "next/link";

const post = getBlogPost("emergency-fund-how-much-should-you-save")!;

export const metadata: Metadata = generateBlogMetadata(post);

export default function BlogPostPage() {
  const relatedPosts = getRelatedPosts(post.slug);

  const structuredData = generateStructuredData("article", {
    title: post.title,
    description: post.description,
    author: post.author,
    publishedAt: post.publishedAt,
    updatedAt: post.updatedAt,
    slug: post.slug,
    ogImage: post.ogImage,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogLayout>
        <BlogHeader post={post} />

        <article className="py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="blog-content text-text-primary-light dark:text-text-primary-dark">
              <p>
                An emergency fund is your financial safety net—money set aside to cover unexpected expenses or income loss.
                It&apos;s one of the most important foundations of financial security, protecting you from going into debt
                when life throws curveballs.
              </p>

              <h2>How Much Should You Save?</h2>
              <p>
                The standard recommendation is 3-6 months of expenses. However, the right amount depends on your situation:
              </p>
              <ul>
                <li><strong>3 months:</strong> If you have stable income, low expenses, and good job security</li>
                <li><strong>6 months:</strong> If you have variable income, high expenses, or work in an unstable industry</li>
                <li><strong>9-12 months:</strong> If you&apos;re self-employed, have irregular income, or are planning a major
                  life change</li>
              </ul>

              <h2>Calculate Your Emergency Fund</h2>
              <p>
                To determine your target, calculate your essential monthly expenses:
              </p>
              <ul>
                <li>Housing (rent/mortgage)</li>
                <li>Utilities</li>
                <li>Food</li>
                <li>Transportation</li>
                <li>Insurance</li>
                <li>Minimum debt payments</li>
              </ul>
              <p>
                Multiply by the number of months you want to cover. For example, if your essential expenses are $3,000/month
                and you want 6 months of coverage, your emergency fund target is $18,000.
              </p>

              <h2>Where to Keep Your Emergency Fund</h2>
              <p>
                Your emergency fund should be easily accessible but separate from your checking account. Consider:
              </p>
              <ul>
                <li><strong>High-yield savings account:</strong> Earn interest while keeping money accessible</li>
                <li><strong>Money market account:</strong> Slightly higher interest, still accessible</li>
                <li><strong>Separate savings account:</strong> At a different bank to reduce temptation to spend</li>
              </ul>
              <p>
                <strong>Don&apos;t keep it in:</strong> Checking accounts (too easy to spend), investment accounts (market
                risk), or CDs (not accessible enough).
              </p>

              <h2>Building Your Emergency Fund</h2>
              <p>
                Start small and build consistently:
              </p>
              <ul>
                <li><strong>Start with $1,000:</strong> Get a mini emergency fund first to cover small unexpected expenses</li>
                <li><strong>Automate savings:</strong> Set up automatic transfers to your emergency fund each month</li>
                <li><strong>Use windfalls:</strong> Put tax refunds, bonuses, or gifts toward your emergency fund</li>
                <li><strong>Cut expenses:</strong> Find areas to reduce spending and redirect that money to savings</li>
              </ul>

              <h2>When to Use Your Emergency Fund</h2>
              <p>
                Use your emergency fund only for true emergencies:
              </p>
              <ul>
                <li>Job loss</li>
                <li>Medical emergencies</li>
                <li>Major car or home repairs</li>
                <li>Unexpected travel for family emergencies</li>
              </ul>
              <p>
                <strong>Don&apos;t use it for:</strong> Planned expenses, vacations, shopping, or non-essential purchases.
              </p>

              <h2>Calculate Your Emergency Fund</h2>
              <p>
                Use our free Emergency Fund Calculator to determine your target amount, see how long it will take to reach
                your goal, and plan your savings strategy.
              </p>

              <p>
                <Link
                  href="/tools/emergency-fund-calculator"
                  className="blog-button inline-flex items-center gap-2 mt-6 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Use Emergency Fund Calculator →
                </Link>
              </p>
            </div>

            <ShareButtons
              title={post.title}
              url={`/blog/${post.slug}`}
              description={post.description}
            />

            <RelatedArticles posts={relatedPosts} />
          </div>
        </article>
      </BlogLayout>
    </>
  );
}

