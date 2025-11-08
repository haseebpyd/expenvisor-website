import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";

const post = getBlogPost("best-ai-expense-tracker-iphone-2025")!;

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
              <h2>Why iPhone Users Are Choosing AI Expense Trackers</h2>
              <p>
                AI-powered expense tracking on iPhone makes logging transactions
                faster, smarter, and more accurate. With features like
                voice-driven entry, OCR receipt scanning, and predictive
                insights, the friction drops dramatically—meaning you stick with
                your budget and actually improve outcomes.
              </p>

              <h2>Top 5 AI Expense Tracker Apps for iPhone in 2025</h2>
              <p>
                Below is a concise comparison of leading apps. We focus on
                practical features that reduce effort and deliver insights.
              </p>

              <table>
                <thead>
                  <tr>
                    <th>App</th>
                    <th>AI Chat</th>
                    <th>Voice Input</th>
                    <th>Manual Entries</th>
                    <th>OCR</th>
                    <th>Price (Monthly)</th>
                    <th>Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Expenvisor</strong></td>
                    <td>Unlimited (free)</td>
                    <td>30/month free</td>
                    <td>Unlimited</td>
                    <td>Coming soon</td>
                    <td>$4.99 Pro</td>
                    <td>Fast, AI-first logging on iPhone</td>
                  </tr>
                  <tr>
                    <td>Monarch Money</td>
                    <td>Limited</td>
                    <td>No native</td>
                    <td>Unlimited</td>
                    <td>Yes</td>
                    <td>~$14.99</td>
                    <td>Bank-sync power users</td>
                  </tr>
                  <tr>
                    <td>YNAB</td>
                    <td>None</td>
                    <td>No</td>
                    <td>Unlimited</td>
                    <td>Manual</td>
                    <td>~$14.99</td>
                    <td>Envelope budgeting purists</td>
                  </tr>
                  <tr>
                    <td>PocketGuard</td>
                    <td>Limited</td>
                    <td>No</td>
                    <td>Unlimited</td>
                    <td>Yes</td>
                    <td>Varies</td>
                    <td>Automatic categorization</td>
                  </tr>
                  <tr>
                    <td>Goodbudget</td>
                    <td>None</td>
                    <td>No</td>
                    <td>Limited on free</td>
                    <td>No</td>
                    <td>Varies</td>
                    <td>Simple envelopes</td>
                  </tr>
                </tbody>
              </table>

              <h2>Why Expenvisor Is the Best Value on iPhone</h2>
              <ul>
                <li>
                  Unlimited AI chat free, with <strong>multi‑language</strong>
                  support and privacy‑first design.
                </li>
                <li>
                  <strong>30 free voice entries/month</strong> for hands‑free
                  logging; upgrade to Pro for more.
                </li>
                <li>
                  Designed for iPhone and iPad with Face ID security and fast,
                  delightful UI.
                </li>
                <li>
                  Transparent, simple pricing: <strong>$4.99/month</strong> for
                  Pro—far below many alternatives.
                </li>
              </ul>

              <h2>Instant Download for iPhone</h2>
              <p>
                Install Expenvisor now and start tracking in seconds. Free plan
                includes unlimited manual entries, unlimited AI chat, and 30
                voice entries per month.
              </p>
              <p>
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-button inline-flex items-center gap-2 mt-4 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Download Expenvisor on the App Store
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


