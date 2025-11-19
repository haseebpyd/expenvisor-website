import { Metadata } from "next";
import { getBlogPost, getRelatedPosts } from "@/lib/blog";
import { generateBlogMetadata, generateStructuredData } from "@/lib/metadata";
import BlogLayout from "@/components/blog/BlogLayout";
import BlogHeader from "@/components/blog/BlogHeader";
import ShareButtons from "@/components/blog/ShareButtons";
import RelatedArticles from "@/components/blog/RelatedArticles";
import Image from "next/image";

const post = getBlogPost("expenvisor-team-culture-2025")!;

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
                  src="/team_photos/Large_professional_team_202511171147.jpeg"
                  alt="Expenvisor Team"
                  width={1200}
                  height={630}
                  className="rounded-2xl w-full"
                />
              </div>

              <p>
                At Expenvisor, we believe that great products are built by great
                teams. Our culture isn&apos;t just about what we do—it&apos;s
                about how we do it, why we do it, and who we do it with. We&apos;ve
                created an environment where innovation thrives, diversity is
                celebrated, and every team member feels valued, supported, and
                empowered to do their best work.
              </p>

              <h2>What Makes Expenvisor Special</h2>
              <p>
                Our team culture is built on three foundational pillars:
                <strong> collaboration, growth, and impact</strong>. These
                aren&apos;t just words on a wall—they&apos;re principles that guide
                everything we do, from how we build features to how we support
                each other.
              </p>

              <h3>1. Collaboration Over Competition</h3>
              <div className="my-8">
                <Image
                  src="/team_photos/Group_of_810_202511171149.jpeg"
                  alt="Expenvisor Team Collaboration"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                We&apos;ve intentionally built a culture where team members lift each
                other up rather than compete. Our developers pair program
                regularly, our designers collaborate across projects, and our
                marketing team works hand-in-hand with product to ensure we&apos;re
                building what users actually need.
              </p>
              <p>
                This collaborative spirit extends beyond work. We have regular
                team lunches, virtual coffee chats, and quarterly team-building
                activities that help us connect as people, not just colleagues.
                When someone needs help, the entire team rallies. When someone
                achieves something great, we all celebrate together.
              </p>

              <h3>2. Continuous Growth and Learning</h3>
              <p>
                We believe that the best teams are always learning. That&apos;s why
                we invest heavily in professional development:
              </p>
              <ul>
                <li>
                  <strong>Learning Budget:</strong> Every team member gets a
                  monthly budget for courses, books, conferences, or any learning
                  resource that helps them grow.
                </li>
                <li>
                  <strong>Internal Knowledge Sharing:</strong> We host weekly
                  tech talks, design critiques, and product deep-dives where
                  team members share what they&apos;ve learned.
                </li>
                <li>
                  <strong>Mentorship Programs:</strong> New team members are
                  paired with experienced mentors, and we encourage
                  cross-functional mentorship across departments.
                </li>
                <li>
                  <strong>Failure is Learning:</strong> We celebrate
                  experimentation and view failures as learning opportunities,
                  not setbacks.
                </li>
              </ul>

              <h3>3. Work-Life Balance</h3>
              <p>
                We know that the best work comes from well-rested, happy people.
                That&apos;s why we&apos;ve built a culture that respects boundaries
                and prioritizes well-being:
              </p>
              <ul>
                <li>
                  <strong>Flexible Hours:</strong> Work when you&apos;re most
                  productive, whether that&apos;s early morning or late evening.
                </li>
                <li>
                  <strong>Remote-First:</strong> We&apos;re a distributed team, so
                  you can work from anywhere that helps you do your best work.
                </li>
                <li>
                  <strong>Unlimited PTO:</strong> Take time off when you need it,
                  no questions asked. We trust our team to manage their time
                  responsibly.
                </li>
                <li>
                  <strong>Mental Health Support:</strong> We provide access to
                  mental health resources and encourage open conversations about
                  well-being.
                </li>
              </ul>

              <h2>Diversity and Inclusion</h2>
              <div className="my-8">
                <Image
                  src="/team_photos/Large_professional_team_202511171146.jpeg"
                  alt="Expenvisor Diverse Team"
                  width={1200}
                  height={600}
                  className="rounded-2xl w-full"
                />
              </div>
              <p>
                Diversity isn&apos;t just a checkbox for us—it&apos;s essential to
                building a product that serves everyone. Our team represents
                different backgrounds, cultures, experiences, and perspectives,
                and we believe this diversity makes us stronger.
              </p>
              <p>
                We&apos;re committed to:
              </p>
              <ul>
                <li>
                  Creating an inclusive environment where everyone feels they
                  belong
                </li>
                <li>
                  Ensuring equal opportunities for growth and advancement
                </li>
                <li>
                  Actively seeking diverse candidates for every role
                </li>
                <li>
                  Listening to and amplifying voices from underrepresented
                  communities
                </li>
              </ul>

              <h2>Our Values in Action</h2>
              <p>
                Our values aren&apos;t abstract concepts—they show up in how we work
                every day:
              </p>

              <h3>Transparency</h3>
              <p>
                We share company metrics, product roadmaps, and strategic
                decisions openly with the entire team. Everyone has visibility
                into what&apos;s happening and why.
              </p>

              <h3>Autonomy</h3>
              <p>
                We hire talented people and trust them to make decisions. Team
                members have ownership over their work and the freedom to
                innovate.
              </p>

              <h3>User-Centricity</h3>
              <p>
                Every decision we make starts with the user. We regularly talk
                to users, analyze feedback, and let user needs guide our
                product development.
              </p>

              <h3>Impact</h3>
              <p>
                We measure success not just by metrics, but by the positive
                impact we have on people&apos;s financial lives. Every feature we
                build, every bug we fix, every support ticket we answer—it all
                matters.
              </p>

              <h2>Building the Future Together</h2>
              <p>
                As we grow, we&apos;re committed to maintaining this culture. We
                know that culture isn&apos;t something you set once and forget—it
                requires constant attention, intentionality, and care.
              </p>
              <p>
                If you&apos;re interested in joining a team that values
                collaboration, growth, and impact, we&apos;d love to hear from you.
                Check out our careers page or reach out to learn more about
                opportunities at Expenvisor.
              </p>
              <p>
                Together, we&apos;re not just building an app—we&apos;re building a
                company culture that we&apos;re proud of, and a product that makes
                a real difference in people&apos;s lives.
              </p>

              <div className="mt-12 p-6 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl border border-accent/30">
                <h3 className="text-2xl font-bold mb-4">Join Our Team</h3>
                <p className="mb-4">
                  We&apos;re always looking for talented, passionate people who
                  share our values and want to make a difference. If
                  Expenvisor sounds like the right place for you, we&apos;d love
                  to connect.
                </p>
                <a
                  href="/contact"
                  className="blog-button inline-flex items-center gap-2 mt-4 px-6 py-3 bg-gradient-to-r from-accent to-secondary text-slate-900 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  Get in Touch →
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

