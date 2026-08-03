import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteContent } from "../context/SiteContentContext";
import { getSection } from "../lib/defaultContent";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function TermsConditions() {
  const { content } = useSiteContent();
  const section = getSection(content, "terms_conditions");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-28 pb-24">
        {/* Hero */}
        <div className="border-b border-neutral-800 pb-12 mb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* <span className="inline-block text-xs font-bold uppercase tracking-widest text-[#c1eb40] bg-[#c1eb40]/10 px-3 py-1 rounded-full mb-5">
              Legal
            </span> */}
            <h1 className="text-4xl mt-20 sm:text-6xl font-black tracking-tight text-white mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-neutral-500 text-sm font-medium">
              Snapycut – a brand of SynaryVerse
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {section.description ? (
            <MarkdownRenderer content={section.description} />
          ) : (
            <>
          {/* 1 */}
          <Section title="1. Introduction">
            <p className="text-neutral-400 leading-relaxed">
              By accessing and using the services provided by Snapycut ("the Company," "we," "our," or "us"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you are not authorized to use our services.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. Services Provided">
            <p className="text-neutral-400 leading-relaxed">
              We offer content strategy, short‑form video editing, AI‑assisted content creation, scripting, thumbnail design, social media content systems, and related digital marketing and content management services. These services are subject to the terms outlined below and to the specific scope of work defined in your proposal, order form, or agreement.
            </p>
          </Section>

          {/* 3 */}
          <Section title="3. Customer Obligations">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              You agree to provide accurate, up‑to‑date information when interacting with Snapycut, including contact details, brand guidelines, access to required platforms, raw content, and payment information.
            </p>
            <p className="text-neutral-400 mb-4">You are responsible for:</p>
            <List items={[
              "Ensuring all content, assets, and materials you provide do not infringe any third‑party rights and comply with applicable laws.",
              "Maintaining the confidentiality of your accounts and access credentials.",
              "All activity that occurs under your accounts, including communication channels and content approvals.",
            ]} />
          </Section>

          {/* 4 */}
          <Section title="4. Payment Terms">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              All services provided by Snapycut are subject to the payment terms agreed upon at the time of purchase, subscription, or contract signing. Unless otherwise stated:
            </p>
            <List items={[
              "Payments are due as outlined in the invoice, subscription, or agreement.",
              "Late or missed payments may result in delays, pauses, or suspension of services.",
              "For recurring services or retainers, charges may be processed automatically on the agreed billing cycle until cancelled in accordance with the agreement.",
            ]} />
          </Section>

          {/* 5 */}
          <Section title="5. Revisions and Turnaround Time">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              The number of revisions included depends on the package or plan selected. Details are specified in your proposal, subscription, or order.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Snapycut aims to provide high‑quality results and will revise within the agreed scope until your needs are met as defined in your selected package. Typical turnaround times for drafts and revisions are communicated at project start and may vary depending on content volume, complexity, and client responsiveness. Delays in providing feedback, approvals, or required assets may extend timelines.
            </p>
          </Section>

          {/* 6 */}
          <Section title="6. Refund Policy">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              Refunds are available only under specific circumstances and in accordance with the refund terms presented at the time of purchase. In general:
            </p>
            <List items={[
              "Once the primary concept, content system, or initial batch of deliverables has been created, reviewed, or approved, fees are typically non‑refundable.",
              "Strategy sessions, onboarding, and consulting components are non‑refundable once delivered.",
              "Any approved refund will be processed in line with the policy in your proposal, order form, or subscription terms.",
            ]} />
          </Section>

          {/* 7 */}
          <Section title="7. Design, Content Ownership and Rights">
            <p className="text-neutral-400 mb-4 leading-relaxed">Upon full payment for the services rendered:</p>
            <List items={[
              "You own the final approved deliverables created specifically for you (for example: final edited videos, final thumbnails, final scripts, and final graphics), subject to any third‑party license restrictions (such as stock media or AI tool licenses).",
              "Snapycut retains ownership of all underlying project files, templates, working files, systems, workflows, and internal tools used to create the deliverables.",
              "You grant Snapycut a non‑exclusive, worldwide license to display and reference final deliverables and results (e.g., views, followers, engagement metrics you choose to share) as part of our portfolio, website, and marketing materials, unless you specifically request in writing that we do not do so.",
              "You are solely responsible for ensuring that your use of the deliverables complies with platform rules and advertising policies.",
            ]} />
          </Section>

          {/* 8 */}
          <Section title="8. Messaging Terms &amp; Conditions">
            <p className="text-neutral-400 mb-4 leading-relaxed">By opting in, you agree to receive SMS, email, and/or platform messages from Snapycut related to:</p>
            <List items={[
              "Service updates and project notifications",
              "Content delivery, approvals, and revisions",
              "Appointment reminders and billing notices",
              "Customer support and service information",
            ]} />
            <p className="text-neutral-400 mt-5 leading-relaxed">
              Message frequency may vary. Message and data rates may apply based on your carrier and plan.
            </p>
            <p className="text-neutral-400 mt-3 leading-relaxed">
              For help, use the support contact method provided in your agreement or on our website. You can opt out of marketing messages at any time by using the unsubscribe or STOP instructions included in the message. Transactional or service‑critical messages may still be sent where permitted by law.
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Content Creation and Population">
            <p className="text-neutral-400 mb-4 leading-relaxed">Unless explicitly included in your package or agreement:</p>
            <List items={[
              "Snapycut does not automatically provide all original content (such as raw footage or product photography).",
              "We may provide scripts, edited clips, AI‑assisted visuals, thumbnails, captions, and related creative assets as part of the service.",
            ]} />
            <p className="text-neutral-400 mt-5 mb-4">You are responsible for:</p>
            <List items={[
              "Providing accurate information, brand guidelines, and any required product details.",
              "Reviewing and approving all content before it is published on your channels.",
            ]} />
            <p className="text-neutral-400 mt-5 leading-relaxed">
              Where we assist with posting or scheduling on your accounts, you remain responsible for compliance with platform rules and any claims arising from your content.
            </p>
          </Section>

          {/* 10 */}
          <Section title="10. Confidentiality and Non‑Disclosure">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              We maintain strict confidentiality regarding your non‑public business information, strategies, and project materials. We do not share, sell, or distribute your confidential information to third parties except:
            </p>
            <List items={[
              "Where required by law, court order, or government request; or",
              "Where you provide explicit written consent; or",
              "To trusted vendors and subcontractors solely for the purpose of delivering the services, under appropriate confidentiality obligations.",
            ]} />
          </Section>

          {/* 11 */}
          <Section title="11. Customer Support and Communication">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              Support hours and primary communication channels (such as email, project management tools, or messaging platforms) will be specified in your agreement or onboarding documentation.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              To ensure quality and accountability, you agree to use only the official contact channels we provide. We are not liable for any issues, delays, or misunderstandings arising from communication through unauthorized or informal channels.
            </p>
          </Section>

          {/* 12 */}
          <Section title="12. Technical Support">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              Snapycut may assist with uploading, scheduling, and configuring content on supported platforms when included in your service. Unless explicitly stated in your agreement, we do not provide:
            </p>
            <List items={[
              "Ongoing technical support for third‑party platforms; or",
              "IT support, account recovery, or security management for your devices or systems.",
            ]} />
            <p className="text-neutral-400 mt-5 leading-relaxed">
              You are responsible for maintaining secure access to your accounts and for platform‑level configuration outside the agreed scope.
            </p>
          </Section>

          {/* 13 */}
          <Section title="13. Third‑Party Tools and Services">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              Our services may incorporate or rely on third‑party platforms and tools (for example: social networks, AI tools, stock libraries, hosting platforms, or analytics tools).
            </p>
            <p className="text-neutral-400 leading-relaxed">
              We do not control or guarantee the availability, performance, or policies of these third parties. Any issues, suspensions, or changes arising from third‑party services are outside our responsibility, although we will make reasonable efforts to help you navigate them where possible.
            </p>
          </Section>

          {/* 14 */}
          <Section title="14. Changes to Terms">
            <p className="text-neutral-400 mb-4 leading-relaxed">
              Snapycut reserves the right to modify these Terms and Conditions at any time. Material changes will be communicated by updating this page and/or via email or in‑app notice where appropriate.
            </p>
            <p className="text-neutral-400 leading-relaxed">
              Your continued use of our services after changes are posted constitutes your acceptance of the updated terms. You are encouraged to review these terms periodically.
            </p>
          </Section>

          {/* 15 */}
          <Section title="15. Limitation of Liability">
            <p className="text-neutral-400 mb-4 leading-relaxed">To the fullest extent permitted by law:</p>
            <List items={[
              "Snapycut will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, lost revenue, loss of data, or business interruption, arising out of or related to your use or inability to use our services, even if we have been advised of the possibility of such damages.",
              "Our total aggregate liability for any claim arising out of or relating to the services will be limited to the total amount you have paid to Snapycut for the specific service giving rise to the claim during the three (3) months preceding the event.",
              "Results such as views, reach, engagement, conversions, or revenue are influenced by many factors outside our control, and Snapycut does not guarantee any specific performance or outcome.",
            ]} />
          </Section>

          {/* 16 */}
          <Section title="16. Governing Law">
            <p className="text-neutral-400 leading-relaxed">
              These Terms and Conditions shall be governed by and construed in accordance with the applicable laws of the jurisdiction specified in your service agreement or, if none is specified, the laws of the jurisdiction where Snapycut is legally registered and operates, without regard to its conflict of law principles.
            </p>
          </Section>

          {/* 17 */}
          <Section title="17. Contact Information">
            <p className="text-neutral-400 mb-5 leading-relaxed">
              For any questions or clarifications regarding these Terms and Conditions or your services with Snapycut, please contact us using the official contact details provided on our website or in your agreement.
            </p>
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-2">
              <p className="text-white font-semibold">Snapycut</p>
              <p className="text-neutral-400 text-sm">Email: <a href="mailto:hello@snapycut.com" className="text-[#c1eb40] hover:underline">hello@snapycut.com</a></p>
              <p className="text-neutral-400 text-sm">Phone: <span className="text-[#c1eb40]">+1 929-597-1197</span></p>
              <p className="text-neutral-400 text-sm">Website: <a href="https://www.snapycut.com" className="text-[#c1eb40] hover:underline">https://www.snapycut.com</a></p>
            </div>
            </Section>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

/* ── Reusable helpers ─────────────────────────────────────────── */

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section>
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#c1eb40]" />
          {item}
        </li>
      ))}
    </ul>
  );
}
