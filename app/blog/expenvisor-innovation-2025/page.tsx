import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Image from "next/image";

const post = getBlogPost("expenvisor-innovation-2025")!;

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
            <div className="blog-content text-text-primary-dark">
              <div className="mb-8">
                <Image
                  src="/team_photos/Group_of_810_202511171149.jpeg"
                  alt="Expenvisor Innovation Team"
                  width={1200}
                  height={630}
                  className="rounded-2xl w-full"
                />
              </div>

              <p>
                Innovation isn&apos;t just a buzzword at Expenvisor—it&apos;s the
                driving force behind everything we do. From our AI-powered voice
                tracking to our intelligent receipt scanning, we&apos;re constantly
                pushing the boundaries of what&apos;s possible in expense
                tracking. But innovation isn&apos;t just about technology; it&apos;s
                about solving real problems in ways that haven&apos;t been tried
                before.
              </p>

              <h2>Our Innovation Philosophy</h2>
              <p>
                We believe innovation happens when you combine three things:
                <strong> user needs, cutting-edge technology, and fearless
                experimentation</strong>. We don&apos;t innovate for the sake of
                being different—we innovate to make expense tracking genuinely
                better for our users.
              </p>

              <h3>1. User-Driven Innovation</h3>
              <p>
                Every feature we build starts with a user problem. Before we
                write a single line of code, we ask: &quot;What pain point are we
                solving? How does this make our users&apos; lives easier?&quot;
              </p>
              <p>
                Our voice expense tracking feature, for example, came from
                listening to users who were frustrated with typing expenses on
                their phones while walking, driving, or in meetings. We didn&apos;t
                just add voice as a nice-to-have—we built it to solve a real
                problem that thousands of people face every day.
              </p>

              <h3>2. AI-First Approach</h3>
              <div className="my-8">
                <Image
                  src="/team_photos/Group_of_56_202511171147.jpeg"
                  alt="Expenvisor Development Team Working on AI"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                We&apos;re not just using AI—we&apos;re building an AI-first
                expense tracker. This means AI isn&apos;t an add-on feature; it&apos;s
                woven into every part of the experience:
              </p>
              <ul>
                <li>
                  <strong>Natural Language Processing:</strong> Our AI understands
                  expense entries in any language, any format, spoken or typed.
                </li>
                <li>
                  <strong>Intelligent Categorization:</strong> The AI automatically
                  categorizes expenses based on context, learning from your
                  patterns over time.
                </li>
                <li>
                  <strong>Predictive Insights:</strong> Our AI doesn&apos;t just
                  track expenses—it predicts trends, identifies anomalies, and
                  suggests ways to save money.
                </li>
                <li>
                  <strong>Conversational Interface:</strong> Ask questions in
                  natural language and get intelligent answers about your
                  spending.
                </li>
              </ul>

              <h3>3. Continuous Experimentation</h3>
              <p>
                Innovation requires experimentation, and experimentation requires
                the freedom to fail. We&apos;ve built a culture where trying new
                things is encouraged, even if they don&apos;t work out:
              </p>
              <ul>
                <li>
                  <strong>Rapid Prototyping:</strong> We build quick prototypes
                  to test ideas before committing to full development.
                </li>
                <li>
                  <strong>A/B Testing:</strong> We constantly test new features
                  and UI changes with real users to see what works best.
                </li>
                <li>
                  <strong>Beta Programs:</strong> Power users get early access to
                  new features and help us refine them before public release.
                </li>
                <li>
                  <strong>Fail Fast, Learn Faster:</strong> If something doesn&apos;t
                  work, we learn from it quickly and move on to the next idea.
                </li>
              </ul>

              <h2>Breakthrough Innovations at Expenvisor</h2>

              <h3>Multi-Language Voice Tracking</h3>
              <p>
                Most expense trackers support multiple languages, but they
                require you to switch languages manually. We built a system that
                automatically detects the language you&apos;re speaking and processes
                it accordingly—no settings, no configuration, just natural
                interaction.
              </p>

              <h3>Context-Aware Receipt Scanning</h3>
              <p>
                Our OCR doesn&apos;t just extract text from receipts—it understands
                context. It knows that &quot;Starbucks&quot; is a coffee expense,
                that &quot;Uber&quot; is transportation, and that &quot;Amazon&quot; could be
                anything from office supplies to personal items. This
                intelligence makes expense tracking almost effortless.
              </p>

              <h3>Predictive Budgeting</h3>
              <p>
                Instead of just showing you what you spent, our AI predicts what
                you&apos;re likely to spend based on historical patterns, upcoming
                events, and seasonal trends. This helps you plan ahead, not just
                track the past.
              </p>

              <h3>Privacy-Preserving AI</h3>
              <p>
                While we use powerful AI, we&apos;ve built it in a way that
                preserves your privacy. Most processing happens on-device, and
                when we do use cloud AI, we use techniques like differential
                privacy to ensure your data stays private.
              </p>

              <h2>The Future of Innovation</h2>
              <p>
                We&apos;re just getting started. Here&apos;s what we&apos;re working on
                next:
              </p>
              <ul>
                <li>
                  <strong>Real-Time Expense Insights:</strong> Get instant
                  notifications about spending patterns as they happen.
                </li>
                <li>
                  <strong>Automated Tax Preparation:</strong> AI that
                  automatically categorizes expenses for tax deductions and
                  generates reports.
                </li>
                <li>
                  <strong>Smart Expense Predictions:</strong> AI that learns your
                  habits and suggests when you might be overspending before it
                  happens.
                </li>
                <li>
                  <strong>Integration Ecosystem:</strong> Seamless connections
                  with banks, credit cards, and accounting software.
                </li>
              </ul>

              <h2>Innovation Through Collaboration</h2>
              <div className="my-8">
                <Image
                  src="/team_photos/Professional_photo_of_202511171147.jpeg"
                  alt="Expenvisor Team Innovation Session"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                Innovation at Expenvisor isn&apos;t limited to our engineering
                team. Every department contributes:
              </p>
              <ul>
                <li>
                  <strong>Design:</strong> Creating intuitive interfaces that
                  make complex AI features feel simple.
                </li>
                <li>
                  <strong>Marketing:</strong> Finding innovative ways to reach
                  and connect with users.
                </li>
                <li>
                  <strong>Support:</strong> Identifying pain points and
                  suggesting improvements based on user feedback.
                </li>
                <li>
                  <strong>Product:</strong> Synthesizing insights from all
                  sources to prioritize the most impactful innovations.
                </li>
              </ul>

              <h2>Join Us in Building the Future</h2>
              <p>
                Innovation is a team sport, and we&apos;re always looking for
                talented people who share our passion for pushing boundaries. If
                you&apos;re excited about using cutting-edge technology to solve
                real problems, we&apos;d love to have you on the team.
              </p>
              <p>
                Together, we&apos;re not just building an expense tracker—we&apos;re
                reimagining what expense tracking can be. And that&apos;s the kind
                of innovation that changes industries.
              </p>

              <div className="mt-12 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
                <h3 className="text-2xl font-bold mb-4">Experience Innovation</h3>
                <p className="mb-4">
                  See for yourself how innovation makes expense tracking
                  effortless. Download Expenvisor and experience the future of
                  financial management.
                </p>
                <a
                  href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-button inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Download Expenvisor →
                </a>
              </div>
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

