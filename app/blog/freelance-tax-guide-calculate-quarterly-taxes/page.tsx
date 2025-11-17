import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Link from "next/link";

const post = getBlogPost("freelance-tax-guide-calculate-quarterly-taxes")!;

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
                As a freelancer or self-employed individual, you&apos;re responsible for managing your own taxes, which can
                be complex and overwhelming. Unlike W-2 employees who have taxes withheld, you must estimate and pay taxes
                yourself, including self-employment tax.
              </p>

              <h2>Understanding Self-Employment Tax</h2>
              <p>
                Self-employment tax is 15.3% of your net earnings (up to $160,200 in 2024). This covers:
              </p>
              <ul>
                <li>12.4% for Social Security</li>
                <li>2.9% for Medicare</li>
              </ul>
              <p>
                As a self-employed person, you pay both the employee and employer portions of these taxes. W-2 employees
                only pay the employee portion (7.65%), which is split with their employer.
              </p>

              <h2>When to Pay Quarterly Taxes</h2>
              <p>
                You must pay estimated quarterly taxes if you expect to owe $1,000 or more for the year. Quarterly payment
                deadlines are:
              </p>
              <ul>
                <li><strong>Q1:</strong> April 15 (for Jan-Mar income)</li>
                <li><strong>Q2:</strong> June 15 (for Apr-May income)</li>
                <li><strong>Q3:</strong> September 15 (for Jun-Aug income)</li>
                <li><strong>Q4:</strong> January 15 (for Sep-Dec income)</li>
              </ul>

              <h2>How to Calculate Quarterly Taxes</h2>
              <p>
                <strong>Method 1: Annualized Income</strong>
              </p>
              <p>
                Estimate your annual income, calculate total tax (income tax + self-employment tax), then divide by 4 for
                each quarterly payment.
              </p>
              <p>
                <strong>Method 2: Actual Income</strong>
              </p>
              <p>
                Calculate tax based on actual income for each quarter. This is more accurate if your income varies
                throughout the year.
              </p>

              <h2>Common Deductions for Freelancers</h2>
              <p>
                Maximize your deductions to reduce taxable income:
              </p>
              <ul>
                <li><strong>Home Office:</strong> Deduct portion of home used exclusively for business</li>
                <li><strong>Vehicle Expenses:</strong> Business mileage or actual vehicle expenses</li>
                <li><strong>Equipment & Software:</strong> Computers, software, tools needed for work</li>
                <li><strong>Professional Development:</strong> Courses, conferences, certifications</li>
                <li><strong>Meals & Travel:</strong> Business meals (50% deductible) and travel expenses</li>
                <li><strong>Internet & Phone:</strong> Business portion of these expenses</li>
              </ul>

              <h2>Tips for Managing Freelance Taxes</h2>
              <ul>
                <li><strong>Set aside 25-30%:</strong> Save this percentage of every payment for taxes</li>
                <li><strong>Track expenses:</strong> Keep detailed records of all business expenses</li>
                <li><strong>Use separate accounts:</strong> Keep business and personal finances separate</li>
                <li><strong>Work with a tax professional:</strong> Especially in your first year of freelancing</li>
                <li><strong>Pay on time:</strong> Avoid penalties by making quarterly payments on schedule</li>
              </ul>

              <h2>Calculate Your Freelance Taxes</h2>
              <p>
                Use our free Freelance Income Calculator to estimate your taxes, calculate quarterly payments, and see your
                after-tax income.
              </p>

              <p>
                <Link
                  href="/tools/freelance-income-calculator"
                  className="blog-button inline-flex items-center gap-2 mt-6 px-8 py-4 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Use Freelance Income Calculator →
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

