import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";

const post = getBlogPost("expenvisor-version-1-2-release-notes")!;

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
                Expenvisor 1.2 is live—and it is the biggest update we&apos;ve
                shipped since launch. We listened to power users who asked for
                bulletproof data backups, richer analytics, and a smoother
                manual entry flow. This release delivers all of that while
                keeping your favorite AI-first experience intact. Here&apos;s
                everything that just landed.
              </p>

              <h2>Expenvisor at a Glance</h2>
              <p>
                Before diving into what&apos;s new, here&apos;s a quick refresher
                of the core Expenvisor experience that tens of thousands rely on
                every month:
              </p>
              <ul>
                <li>
                  <strong>Unlimited AI Chat Co-Pilot:</strong> Ask natural
                  language questions about spending, budgeting, or tax
                  deductions—no daily or monthly limits.
                </li>
                <li>
                  <strong>Voice Expense Logging (30 free/month):</strong> Capture
                  purchases hands-free in any language. Upgrade to Pro for
                  unlimited voice commands.
                </li>
                <li>
                  <strong>Multi-Language Support:</strong> Track expenses and
                  chat with the AI in whichever language you think in.
                </li>
                <li>
                  <strong>Private-by-Design Data:</strong> All transactions live
                  in your secure on-device vault with one-tap exports when you
                  need them.
                </li>
                <li>
                  <strong>Always-On Insights:</strong> Smart summaries, category
                  breakdowns, and daily reminders keep you on track without
                  spreadsheets.
                </li>
              </ul>
              <p>
                Version 1.2 amplifies these pillars with the features power users
                have been requesting.
              </p>

              <h2>What&apos;s New in Expenvisor 1.2</h2>
              <h3>1. Import &amp; Export Your Data in Seconds</h3>
              <p>
                Protecting your financial history is now effortless. Export a
                clean JSON or CSV file with one tap, then re-import it whenever
                you need to restore or merge data across devices. Import handles
                duplicates, validates formats, and even surfaces helpful error
                feedback if something looks off.
              </p>

              <h3>2. Analytics That Actually Tell a Story</h3>
              <p>
                The Analytics screen has been completely redesigned. You now get
                dual bar charts that compare income and expenses for every month,
                plus a companion line chart that reveals trends over time.
                Switch between monthly, yearly, and all-time in one tap to spot
                savings patterns instantly.
              </p>
              <ul>
                <li>Side-by-side income vs. expense bars for each period</li>
                <li>Line graph to visualize momentum and outliers</li>
                <li>
                  Smarter filtering: only monthly, yearly, and all-time views so
                  insights stay focused
                </li>
              </ul>

              <h3>3. History View Built for Power Users</h3>
              <p>
                The Transaction History screen now groups entries by day, shows a
                savings percentage for every month, and makes better use of
                screen real estate. Whether you log 10 expenses a week or 100 a
                day, it feels fast and organized.
              </p>

              <h3>4. Faster, Freeze-Free Manual Entries</h3>
              <p>
                We rewrote the entire add/edit/delete pipeline. Transactions now
                save on background threads with optimistic updates—so the UI
                stays buttery smooth, even after imports or bulk edits.
              </p>

              <h3>5. Personalized Notifications on Your Schedule</h3>
              <p>
                Daily reminders are smarter and more flexible. Pick the exact
                hour and minute you want to be nudged, and Expenvisor will
                deliver AI-generated summaries that react to your real spending.
                Open the app and notification badges clear automatically.
              </p>

              <h3>6. Quick Links to Share &amp; Review</h3>
              <p>
                Head to Settings to find one-tap shortcuts for sharing Expenvisor
                with friends or leaving a rating on the App Store. Your feedback
                fuels what we build next.
              </p>

              <h3>7. Quality-of-Life Fixes</h3>
              <p>
                From optimized color rendering to import safeguards, we tightened
                dozens of loose ends you flagged. The result: faster load times,
                cleaner visuals, and rock-solid reliability on every screen.
              </p>

              <h2>How to Get the Update</h2>
              <p>
                Already using Expenvisor? Open the App Store, visit your profile,
                and pull to refresh—Version 1.2 will appear under “Available
                Updates.” New here? Search “Expenvisor” or tap the link below to
                get started with the world’s most helpful AI expense assistant.
              </p>

              <h2>Track Smarter, Save More</h2>
              <p>
                Expenvisor 1.2 makes staying on top of your money feel effortless,
                whether you&apos;re a freelancer, a household CFO, or simply done
                with spreadsheets. Log your spending in seconds, get actionable
                insights instantly, and keep your financial story in your own
                hands.
              </p>

              <p>
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Download Expenvisor 1.2 →
                </a>
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


