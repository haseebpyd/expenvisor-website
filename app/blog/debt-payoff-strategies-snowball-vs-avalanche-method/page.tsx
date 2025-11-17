import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Link from "next/link";

const post = getBlogPost("debt-payoff-strategies-snowball-vs-avalanche-method")!;

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
                Getting out of debt is one of the most important financial goals you can achieve. But with multiple debts
                and limited extra money, which strategy should you use? Two popular methods dominate the conversation: the
                Snowball Method and the Avalanche Method. Both work, but they take different approaches to debt payoff.
              </p>

              <h2>What is the Snowball Method?</h2>
              <p>
                The Snowball Method focuses on paying off your smallest debt first, regardless of interest rate. You make
                minimum payments on all debts, then put any extra money toward the smallest balance. Once that&apos;s paid
                off, you move to the next smallest debt, and so on.
              </p>
              <p>
                <strong>Why it works:</strong> The psychological wins of paying off debts quickly provide motivation to
                continue. Each paid-off debt feels like a victory, building momentum.
              </p>

              <h2>What is the Avalanche Method?</h2>
              <p>
                The Avalanche Method focuses on paying off your highest interest rate debt first, regardless of balance. You
                make minimum payments on all debts, then put any extra money toward the highest interest rate debt. Once
                that&apos;s paid off, you move to the next highest rate.
              </p>
              <p>
                <strong>Why it works:</strong> By targeting high-interest debt first, you save the most money in interest
                over time. This is the mathematically optimal approach.
              </p>

              <h2>Snowball vs. Avalanche: Which Saves More Money?</h2>
              <p>
                The Avalanche Method typically saves more money because it targets high-interest debt first. However, the
                difference depends on your specific debt situation. If your highest interest debt also has a large balance,
                the savings can be significant.
              </p>
              <p>
                <strong>Example:</strong> If you have $5,000 at 18% APR and $10,000 at 6% APR, the Avalanche Method saves
                more by paying off the 18% debt first. But if the balances are similar, the difference may be smaller.
              </p>

              <h2>Which Method Should You Choose?</h2>
              <p>
                <strong>Choose Snowball if:</strong>
              </p>
              <ul>
                <li>You need motivation and quick wins to stay on track</li>
                <li>Your debts have similar interest rates</li>
                <li>You&apos;re easily discouraged and need psychological momentum</li>
              </ul>
              <p>
                <strong>Choose Avalanche if:</strong>
              </p>
              <ul>
                <li>You want to save the most money possible</li>
                <li>You have high-interest debt (credit cards, payday loans)</li>
                <li>You&apos;re disciplined and don&apos;t need quick wins for motivation</li>
              </ul>

              <h2>Hybrid Approach</h2>
              <p>
                You can also combine both methods: start with Snowball for quick wins, then switch to Avalanche once you
                have momentum. Or, if you have one very high-interest debt, pay that off first (Avalanche), then switch to
                Snowball for the rest.
              </p>

              <h2>Try Our Debt Payoff Calculator</h2>
              <p>
                Not sure which method is best for your situation? Use our free Debt Payoff Calculator to compare both
                methods side-by-side. See exactly how much you&apos;ll save, how long it will take, and which strategy
                works best for your debts.
              </p>

              <p>
                <Link
                  href="/tools/debt-payoff-calculator"
                  className="blog-button inline-flex items-center gap-2 mt-6 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Use Debt Payoff Calculator →
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

