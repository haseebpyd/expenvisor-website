import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Image from "next/image";

const post = getBlogPost("expenvisor-equality-impact-2025")!;

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
                  src="/team_photos/Large_professional_team_202511171146.jpeg"
                  alt="Expenvisor Diverse Team"
                  width={1200}
                  height={630}
                  className="rounded-2xl w-full"
                />
              </div>

              <p>
                At Expenvisor, we believe that technology should be a force for
                good. We&apos;re not just building an expense tracker—we&apos;re
                building a tool that makes financial management accessible to
                everyone, regardless of their background, location, or financial
                situation. Our commitment to equality and positive impact isn&apos;t
                just part of our mission; it&apos;s embedded in everything we do.
              </p>

              <h2>Financial Equality Through Technology</h2>
              <p>
                Financial inequality is one of the biggest challenges of our
                time. Millions of people struggle with managing their expenses,
                not because they lack discipline, but because they lack access
                to the right tools and information. We&apos;re changing that.
              </p>

              <h3>1. Making Financial Tools Accessible</h3>
              <p>
                Traditional financial management tools are often expensive,
                complex, or designed for people who already understand finance.
                We&apos;ve built Expenvisor to be:
              </p>
              <ul>
                <li>
                  <strong>Free to Start:</strong> Everyone can download
                  Expenvisor and start tracking expenses immediately, no credit
                  card required.
                </li>
                <li>
                  <strong>Simple to Use:</strong> You don&apos;t need a finance
                  degree to use Expenvisor. Our AI handles the complexity so
                  you don&apos;t have to.
                </li>
                <li>
                  <strong>Multi-Language:</strong> Available in multiple
                  languages so people can manage their finances in their
                  native language.
                </li>
                <li>
                  <strong>Works Offline:</strong> Even without internet, you can
                  track expenses, ensuring access regardless of connectivity.
                </li>
              </ul>

              <h3>2. Breaking Down Barriers</h3>
              <p>
                We&apos;re actively working to remove barriers that prevent people
                from managing their finances effectively:
              </p>
              <ul>
                <li>
                  <strong>Language Barriers:</strong> Our AI understands expenses
                  in any language, spoken or written.
                </li>
                <li>
                  <strong>Literacy Barriers:</strong> Voice tracking means you
                  don&apos;t need to type or read to track expenses.
                </li>
                <li>
                  <strong>Technical Barriers:</strong> Our interface is
                  intuitive enough for anyone to use, regardless of tech
                  experience.
                </li>
                <li>
                  <strong>Cost Barriers:</strong> Core features are free, and
                  premium features are affordable.
                </li>
              </ul>

              <h2>Equality in Our Team</h2>
              <div className="my-8">
                <Image
                  src="/team_photos/Large_professional_team_202511171147.jpeg"
                  alt="Expenvisor Diverse Team"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                We believe that building a product for everyone requires a team
                that represents everyone. Our commitment to equality starts
                within our own organization:
              </p>

              <h3>Diverse Hiring</h3>
              <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Image
                  src="/team_photos/Professional_headshot_of_202511171149.jpeg"
                  alt="Expenvisor Team Member"
                  width={600}
                  height={400}
                  className="rounded-xl w-full"
                />
                <Image
                  src="/team_photos/Professional_headshot_of_202511171148.jpeg"
                  alt="Expenvisor Team Member"
                  width={600}
                  height={400}
                  className="rounded-xl w-full"
                />
              </div>
              <p>
                We actively seek out talent from underrepresented backgrounds.
                Our team includes people from different countries, cultures,
                genders, and experiences because we know that diverse
                perspectives lead to better products.
              </p>

              <h3>Equal Opportunities</h3>
              <p>
                Every team member has equal access to:
              </p>
              <ul>
                <li>Growth and advancement opportunities</li>
                <li>Professional development resources</li>
                <li>Leadership roles and decision-making</li>
                <li>Fair compensation and benefits</li>
              </ul>

              <h3>Inclusive Culture</h3>
              <p>
                We&apos;ve built a culture where everyone feels they belong. We
                actively listen to all voices, celebrate different perspectives,
                and ensure that everyone has a seat at the table.
              </p>

              <h2>Positive Impact on the World</h2>
              <p>
                Beyond building a great product, we&apos;re committed to making a
                positive impact on the world:
              </p>

              <h3>1. Financial Literacy</h3>
              <p>
                We&apos;re not just tracking expenses—we&apos;re teaching people
                about their finances. Our AI insights help users understand
                their spending patterns, identify areas for improvement, and
                make better financial decisions.
              </p>

              <h3>2. Supporting Small Businesses</h3>
              <div className="my-8">
                <Image
                  src="/team_photos/Group_of_810_202511171146.jpeg"
                  alt="Expenvisor Team Supporting Small Businesses"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                Small businesses and freelancers often struggle with expense
                tracking. We&apos;ve built features specifically for them:
              </p>
              <ul>
                <li>Business expense categorization</li>
                <li>Tax deduction tracking</li>
                <li>Receipt scanning for documentation</li>
                <li>Export capabilities for accounting</li>
              </ul>
              <p>
                By making expense tracking easier for small businesses, we&apos;re
                helping them focus on what they do best—running their
                businesses.
              </p>

              <h3>3. Environmental Impact</h3>
              <p>
                By digitizing expense tracking and receipt management, we&apos;re
                helping reduce paper waste. Every receipt scanned is one less
                piece of paper that needs to be stored, and every digital
                report is one less printed document.
              </p>

              <h3>4. Privacy and Security</h3>
              <p>
                In a world where financial data is often exploited, we&apos;re
                committed to protecting user privacy. Your financial data
                belongs to you, and we&apos;ve built Expenvisor to keep it that
                way:
              </p>
              <ul>
                <li>On-device data storage</li>
                <li>End-to-end encryption</li>
                <li>No selling of user data</li>
                <li>Transparent privacy policies</li>
              </ul>

              <h2>Our Commitment Moving Forward</h2>
              <p>
                Our work toward equality and positive impact is ongoing. Here&apos;s
                what we&apos;re committed to:
              </p>

              <h3>Continuous Improvement</h3>
              <p>
                We regularly review our practices, policies, and products to
                ensure they align with our values. We listen to feedback from
                users, team members, and the community, and we&apos;re always
                looking for ways to do better.
              </p>

              <h3>Transparency</h3>
              <p>
                We believe in being transparent about our practices, our impact,
                and our challenges. We share our diversity metrics, our
                environmental impact, and our progress toward our goals.
              </p>

              <h3>Partnership</h3>
              <p>
                We partner with organizations that share our values, supporting
                financial literacy programs, small business initiatives, and
                other causes that align with our mission.
              </p>

              <h2>Building a Better Future</h2>
              <div className="my-8">
                <Image
                  src="/team_photos/Group_of_56_202511171146.jpeg"
                  alt="Expenvisor Team Building the Future"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                We know that building an expense tracker won&apos;t solve all the
                world&apos;s problems. But we believe that by making financial
                management accessible, by building an inclusive team, and by
                operating with integrity, we can make a meaningful difference.
              </p>
              <p>
                Every person who gains better control over their finances is a
                step toward greater financial equality. Every small business that
                saves time on expense tracking can focus more on growth. Every
                team member who feels valued and included brings their best work
                to the table.
              </p>
              <p>
                This is how we&apos;re building a better future—one feature, one
                user, one team member at a time.
              </p>

              <div className="mt-12 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
                <h3 className="text-2xl font-bold mb-4">Join Us in Making a Difference</h3>
                <p className="mb-4">
                  Whether you&apos;re a user, a potential team member, or a
                  partner organization, we&apos;d love to have you join us in
                  building a more equal and positive future.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://apps.apple.com/pk/app/expenvisor-ai-expense-tracker/id6754627757"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="blog-button inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    Download Expenvisor →
                  </a>
                  <a
                    href="/contact"
                    className="blog-button inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-secondary to-accent text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                  >
                    Get in Touch →
                  </a>
                </div>
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

