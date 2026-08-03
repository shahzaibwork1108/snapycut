import { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSiteContent } from "../context/SiteContentContext";
import { getSection } from "../lib/defaultContent";
import MarkdownRenderer from "../components/MarkdownRenderer";

export default function PrivacyPolicy() {
  const { content } = useSiteContent();
  const section = getSection(content, "privacy_policy");
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
            <h1 className="text-4xl sm:text-6xl font-black mt-20 tracking-tight text-white mb-4">
              Privacy Policy
            </h1>
            {/* <p className="text-neutral-500 text-sm font-medium">
              Effective date: [Insert Date] &nbsp;·&nbsp; Snapycut – a brand of SynaryVerse
            </p> */}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {section.description ? (
            <MarkdownRenderer content={section.description} />
          ) : (
            <>
              {/* Intro */}
          <Section>
            <p className="text-neutral-300 text-base leading-relaxed">
              Snapycut ("Snapycut", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit{" "}
              <a href="https://www.snapycut.com" className="text-[#c1eb40] hover:underline">https://www.snapycut.com</a>{" "}
              (the "Website") and use our content and video services, including our Content System and AI Content System (collectively, the "Services").
            </p>
            <p className="text-neutral-400 text-base leading-relaxed mt-4">
              By using our Website or Services, you agree to the collection and use of information in accordance with this Privacy Policy.
            </p>
          </Section>

          {/* Section 1 */}
          <Section title="Information We Collect">
            <p className="text-neutral-400 mb-6">We may collect the following categories of information:</p>

            <SubHeading>1. Personal Information you provide directly</SubHeading>
            <List items={[
              "Name",
              "Email address",
              "Phone number",
              "Social media handles or profile links (e.g., YouTube, TikTok, Instagram)",
              "Company name, role, and industry",
              "Billing details and limited payment-related information (processed via third‑party payment providers)",
              "Information you provide when you book a call, fill out a form, or contact us",
              "Testimonials, feedback, and survey responses",
            ]} />

            <SubHeading className="mt-8">2. Content and project information</SubHeading>
            <List items={[
              "Raw video files, audio, images, scripts, brand assets, and other media you share for editing or production",
              "Brand guidelines, messaging, and creative briefs",
              "Project notes, revisions, and communication history related to your projects",
            ]} />

            <SubHeading className="mt-8">3. Automatically collected information</SubHeading>
            <p className="text-neutral-400 mb-4">When you visit our Website, we may automatically collect:</p>
            <List items={[
              "IP address",
              "Browser type and version",
              "Device information",
              "Pages visited and time spent on the Website",
              "Referring/exit pages",
              "General usage and interaction data",
            ]} />
            <p className="text-neutral-400 mt-4">This information may be collected through cookies, pixels, and similar tracking technologies.</p>
          </Section>

          {/* Section 2 */}
          <Section title="How We Use Your Information">
            <p className="text-neutral-400 mb-4">We use the information we collect for the following purposes:</p>
            <List items={[
              "To provide, operate, and improve our Services",
              "To manage your projects, process orders, and deliver edited content",
              "To communicate with you about your account, bookings, and project updates",
              "To respond to inquiries, support requests, and feedback",
              "To personalize your experience and recommend relevant content or services",
              "To send you marketing communications, newsletters, and promotional offers (where permitted by law and/or where you have opted in)",
              "To analyze Website performance, improve user experience, and optimize our marketing",
              "To maintain security, prevent fraud, and enforce our terms and policies",
              "To comply with legal obligations and respond to lawful requests",
            ]} />
          </Section>

          {/* Section 3 */}
          <Section title="AI Processing and Automation">
            <p className="text-neutral-400 mb-4">As an agency focused on AI‑assisted content, we may use AI tools and automated systems to:</p>
            <List items={[
              "Generate, enhance, or edit scripts, captions, thumbnails, and video content",
              "Analyze performance metrics and content effectiveness",
              "Streamline workflows, quality control, and creative variations",
            ]} />
            <p className="text-neutral-400 mt-5">We process your content and data solely for the purpose of delivering and improving our Services. We do not sell your personal information to third parties for their own marketing purposes.</p>
            <p className="text-neutral-400 mt-3">Where we use third‑party AI tools or platforms, we take reasonable steps to ensure those providers respect and protect your data in line with this Policy and applicable laws.</p>
          </Section>

          {/* Section 4 */}
          <Section title="Communications, SMS, and Email">
            <p className="text-neutral-400 mb-4">We may use your contact details to:</p>
            <List items={[
              "Confirm bookings and calls",
              "Share project updates, revisions, and approvals",
              "Send important service‑related notifications",
              "Share newsletters, offers, and marketing content (where permitted)",
            ]} />
            <p className="text-neutral-400 mt-5 mb-4">If we use SMS or messaging apps for service‑related communication:</p>
            <List items={[
              "Phone numbers are collected and used only to deliver service‑related messages (e.g., project updates, reminders, support).",
              "We do not share mobile numbers with third parties for their marketing or promotional purposes.",
              "You can opt out of promotional messages by following the unsubscribe instructions in the message or contacting us directly.",
            ]} />
            <p className="text-neutral-400 mt-5">You can unsubscribe from marketing emails at any time by clicking the "unsubscribe" link in the footer of our emails or contacting us.</p>
          </Section>

          {/* Section 5 */}
          <Section title="Cookies and Tracking Technologies">
            <p className="text-neutral-400 mb-4">We use cookies and similar technologies to:</p>
            <List items={[
              "Remember your preferences and settings",
              "Understand how visitors use our Website",
              "Improve performance, design, and user experience",
              "Measure and optimize marketing campaigns",
            ]} />
            <p className="text-neutral-400 mt-5">You can usually control cookies through your browser settings. If you choose to disable cookies, some features of the Website may not function properly.</p>
          </Section>

          {/* Section 6 */}
          <Section title="How We Share Your Information">
            <p className="text-neutral-400 mb-4">We do not rent or sell your personal information to third parties for their own marketing. We may share your information in the following limited circumstances:</p>
            <List items={[
              "Service providers and partners: With trusted third‑party vendors who help us operate the Website, process payments, host content, provide analytics, email delivery, customer support, and AI tools or infrastructure—only to the extent necessary to perform these services.",
              "Legal and safety: To comply with applicable laws, regulations, or legal processes, or to respond to lawful requests; to protect the rights, property, or safety of Snapycut, our clients, or the public.",
              "Business transfers: In connection with a merger, acquisition, restructuring, or sale of all or part of our assets, your information may be transferred as part of that transaction, subject to continued protection consistent with this Policy.",
            ]} />
            <p className="text-neutral-400 mt-5">All third parties receiving personal information are required to protect it and to use it only for the purposes for which we disclose it.</p>
          </Section>

          {/* Section 7 */}
          <Section title="Data Retention">
            <p className="text-neutral-400 mb-4">We retain your personal information and project content for as long as:</p>
            <List items={[
              "You maintain an active relationship or account with us;",
              "We need it to provide the Services and support you;",
              "We are required to keep it to comply with legal, tax, and accounting obligations; or",
              "It is reasonably necessary for our legitimate business interests (e.g., record‑keeping, dispute resolution).",
            ]} />
            <p className="text-neutral-400 mt-5">You may request deletion or limitation of certain data as described in the "Your Rights and Choices" section below.</p>
          </Section>

          {/* Section 8 */}
          <Section title="Security">
            <p className="text-neutral-400 mb-4">We take reasonable technical and organizational measures to protect your personal information from unauthorized access, use, alteration, or disclosure. These measures may include:</p>
            <List items={[
              "Secure data transmission (e.g., SSL/TLS)",
              "Access controls and authentication for internal systems",
              "Regular monitoring of our systems and infrastructure",
            ]} />
            <p className="text-neutral-400 mt-5">However, no method of transmission or storage over the Internet is completely secure. While we strive to protect your personal information, we cannot guarantee absolute security.</p>
          </Section>

          {/* Section 9 */}
          <Section title="Your Rights and Choices">
            <p className="text-neutral-400 mb-4">Depending on your location and applicable law, you may have rights regarding your personal information, including:</p>
            <List items={[
              "Accessing the personal information we hold about you",
              "Requesting correction of inaccurate or incomplete information",
              "Requesting deletion of your personal information (subject to legal obligations)",
              "Objecting to or restricting certain processing activities",
              "Withdrawing consent where processing is based on consent",
              "Opting out of marketing communications",
            ]} />
            <p className="text-neutral-400 mt-5">To exercise any of these rights, please contact us using the details in the "Contact Us" section. We may need to verify your identity before processing your request.</p>
          </Section>

          {/* Section 10 */}
          <Section title="Third‑Party Websites and Links">
            <p className="text-neutral-400">Our Website may contain links to third‑party websites, platforms, or tools (for example, booking tools, payment processors, or social media platforms). We are not responsible for the privacy practices or content of those third‑party sites. We encourage you to review their privacy policies before providing any personal information.</p>
          </Section>

          {/* Section 11 */}
          <Section title="Testimonials and Case Studies">
            <p className="text-neutral-400">With your permission, we may display testimonials, case studies, or success stories on our Website or marketing materials, which may include your name, social profile, business name, and results achieved.</p>
            <p className="text-neutral-400 mt-3">If you wish to update or remove your testimonial, please contact us.</p>
          </Section>

          {/* Section 12 */}
          <Section title="Children's Privacy">
            <p className="text-neutral-400">Our Website and Services are not directed to children under the age of 13 (or the minimum age required in your jurisdiction), and we do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete that information promptly.</p>
          </Section>

          {/* Section 13 */}
          <Section title="Changes to This Privacy Policy">
            <p className="text-neutral-400">We may update this Privacy Policy from time to time. When we do, we will revise the "Effective date" at the top of the Policy. Significant changes may also be communicated via email or a notice on the Website.</p>
            <p className="text-neutral-400 mt-3">Your continued use of the Website or Services after any changes become effective will constitute your acknowledgement of the updated Policy.</p>
          </Section>

          {/* Contact */}
          <Section title="Contact Us">
            <p className="text-neutral-400 mb-5">If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:</p>
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
    <section className="space-y-0">
      {title && (
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-5 pb-3 border-b border-neutral-800">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function SubHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={`text-white font-semibold text-base mb-3 ${className}`}>
      {children}
    </h3>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5 pl-0">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
          <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#c1eb40]" />
          {item}
        </li>
      ))}
    </ul>
  );
}
