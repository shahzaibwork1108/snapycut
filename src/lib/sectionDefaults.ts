import type { SectionContent, SectionKey, SiteContent } from "../types/content";

export const defaultSections: Record<SectionKey, SectionContent> = {
  navbar: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description: "",
    cta_text: "Book A Free Strategy Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: { tagline: "Powered by Synaryverse" },
  },
  hero: {
    title: "Manage nothing.",
    title_highlight: "Every day.",
    subtitle: "Post",
    description:
      "Post more. Stress less. Grow faster. At Snapycut, we transform your raw content into ready-to-post assets with strategy, editing, scripting, posting, and management handled for you.",
    cta_text: "Book A Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: {},
  },
  growth_options: {
    title: "Two Ways to Grow with",
    title_highlight: "Snapycut",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {
      cards: [
        {
          badge: "Done-With-You",
          title: "Content System",
          description:
            "For creators, personal brands, coaches, consultants, and businesses that already create content but need help turning it into consistent, ready-to-post assets.",
          link_text: "Scale Your Brand",
        },
        {
          badge: "Fully Automated",
          title: "AI Content System",
          description:
            "For businesses that want professional, high-quality content and advertisements without constant filming and recording.",
          link_text: "Zero Filming Required",
        },
      ],
    },
  },
  short_form: {
    title: "Proof Before",
    title_highlight: " Promises.",
    subtitle: "Watch the content we create before you decide to work with us.",
    description: "Scroll-stopping videos built to hold attention and drive engagement.",
    cta_text: "",
    cta_url: "",
    extra: {
      heading2_green: "Short Form",
      heading2_white: " Content.",
    },
  },
  recent_cuts: {
    title: "SaaS explainer",
    title_highlight: " videos.",
    subtitle: "Scroll-stopping videos built to hold attention and drive engagement.",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  ai_video_ads: {
    title: "AI Video",
    title_highlight: " Ads.",
    subtitle:
      "High converting AI powered video ads and creative content designed to help your brand look sharper and scale faster.",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  ai_avatar: {
    title: "AI Avatar",
    title_highlight: " Videos.",
    subtitle:
      "Professional AI Avatar videos for marketing explainers, spokesperson-style content, and brand communication without the need for cameras, studios, or constant filming.",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  thumbnails: {
    title: "Thumbnails",
    title_highlight: " Portfolio.",
    subtitle:
      "Click-worthy thumbnails and covers that build curiosity, improve first impressions, and make your content impossible to ignore",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  client_say: {
    title: "What",
    title_highlight: "Client Say",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  testimonials: {
    title: "Testimonials",
    title_highlight: "",
    subtitle: "",
    description: "",
    cta_text: "",
    cta_url: "",
    extra: {},
  },
  cta: {
    title: "STOP PLANNING.",
    title_highlight: "START POSTING.",
    subtitle: "Ready to Post",
    description:
      "Book a free strategy call. We'll audit your current content, map a 30-day plan, and show you exactly what Snapycut looks like for your brand.",
    cta_text: "Book A free Strategy Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: {
      discount_text: "Avail 50 percent discount by booking a call now",
    },
  },
  footer: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description:
      "Snapycut handles your editing, scripting, thumbnails, and strategy – so you can show up every day without touching a timeline.",
    cta_text: "",
    cta_url: "",
    extra: {
      facebook: "https://www.facebook.com/Snapycut/",
      instagram: "https://www.instagram.com/snapycutcom/",
      twitter: "https://x.com/Snapycut",
      linkedin: "https://www.linkedin.com/company/snapycut/",
      whatsapp_number: "19295971197",
      whatsapp_message:
        'DM "GROWTH" to unlock our launch offer and free content strategy consultation.',
      copyright: "Snapycut. All Rights Reserved.",
    },
  },
  discount_popup: {
    title: "Avail ",
    title_highlight: "50% discount",
    subtitle: " by booking a call now",
    description: "Take your business to the next level with our expert strategies. Don't miss out on this exclusive deal!",
    cta_text: "Book A Free Strategy Call",
    cta_url: "https://calendly.com/snapycut/30min",
    extra: {
      is_active: "true",
      badge_text: "Limited Time Offer",
      delay_seconds: "3",
    },
  },
  privacy_policy: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description: `Snapycut ("Snapycut", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit [https://www.snapycut.com](https://www.snapycut.com) (the "Website") and use our content and video services, including our Content System and AI Content System (collectively, the "Services").

By using our Website or Services, you agree to the collection and use of information in accordance with this Privacy Policy.

## Information We Collect
We may collect the following categories of information:

### 1. Personal Information you provide directly

  - Name
  - Email address
  - Phone number
  - Social media handles or profile links (e.g., YouTube, TikTok, Instagram)
  - Company name, role, and industry
  - Billing details and limited payment-related information (processed via third‑party payment providers)
  - Information you provide when you book a call, fill out a form, or contact us
  - Testimonials, feedback, and survey responses

### 2. Content and project information

  - Raw video files, audio, images, scripts, brand assets, and other media you share for editing or production
  - Brand guidelines, messaging, and creative briefs
  - Project notes, revisions, and communication history related to your projects

### 3. Automatically collected information
When you visit our Website, we may automatically collect:

  - IP address
  - Browser type and version
  - Device information
  - Pages visited and time spent on the Website
  - Referring/exit pages
  - General usage and interaction data

This information may be collected through cookies, pixels, and similar tracking technologies.

## How We Use Your Information
We use the information we collect for the following purposes:

  - To provide, operate, and improve our Services
  - To manage your projects, process orders, and deliver edited content
  - To communicate with you about your account, bookings, and project updates
  - To respond to inquiries, support requests, and feedback
  - To personalize your experience and recommend relevant content or services
  - To send you marketing communications, newsletters, and promotional offers (where permitted by law and/or where you have opted in)
  - To analyze Website performance, improve user experience, and optimize our marketing
  - To maintain security, prevent fraud, and enforce our terms and policies
  - To comply with legal obligations and respond to lawful requests

## AI Processing and Automation
As an agency focused on AI‑assisted content, we may use AI tools and automated systems to:

  - Generate, enhance, or edit scripts, captions, thumbnails, and video content
  - Analyze performance metrics and content effectiveness
  - Streamline workflows, quality control, and creative variations

We process your content and data solely for the purpose of delivering and improving our Services. We do not sell your personal information to third parties for their own marketing purposes.

Where we use third‑party AI tools or platforms, we take reasonable steps to ensure those providers respect and protect your data in line with this Policy and applicable laws.

## Communications, SMS, and Email
We may use your contact details to:

  - Confirm bookings and calls
  - Share project updates, revisions, and approvals
  - Send important service‑related notifications
  - Share newsletters, offers, and marketing content (where permitted)

If we use SMS or messaging apps for service‑related communication:

  - Phone numbers are collected and used only to deliver service‑related messages (e.g., project updates, reminders, support).
  - We do not share mobile numbers with third parties for their marketing or promotional purposes.
  - You can opt out of promotional messages by following the unsubscribe instructions in the message or contacting us directly.

You can unsubscribe from marketing emails at any time by clicking the "unsubscribe" link in the footer of our emails or contacting us.

## Cookies and Tracking Technologies
We use cookies and similar technologies to:

  - Remember your preferences and settings
  - Understand how visitors use our Website
  - Improve performance, design, and user experience
  - Measure and optimize marketing campaigns

You can usually control cookies through your browser settings. If you choose to disable cookies, some features of the Website may not function properly.

## How We Share Your Information
We do not rent or sell your personal information to third parties for their own marketing. We may share your information in the following limited circumstances:

  - Service providers and partners: With trusted third‑party vendors who help us operate the Website, process payments, host content, provide analytics, email delivery, customer support, and AI tools or infrastructure—only to the extent necessary to perform these services.
  - Legal and safety: To comply with applicable laws, regulations, or legal processes, or to respond to lawful requests; to protect the rights, property, or safety of Snapycut, our clients, or the public.
  - Business transfers: In connection with a merger, acquisition, restructuring, or sale of all or part of our assets, your information may be transferred as part of that transaction, subject to continued protection consistent with this Policy.

All third parties receiving personal information are required to protect it and to use it only for the purposes for which we disclose it.

## Data Retention
We retain your personal information and project content for as long as:

  - You maintain an active relationship or account with us;
  - We need it to provide the Services and support you;
  - We are required to keep it to comply with legal, tax, and accounting obligations; or
  - It is reasonably necessary for our legitimate business interests (e.g., record‑keeping, dispute resolution).

You may request deletion or limitation of certain data as described in the "Your Rights and Choices" section below.

## Security
We take reasonable technical and organizational measures to protect your personal information from unauthorized access, use, alteration, or disclosure. These measures may include:

  - Secure data transmission (e.g., SSL/TLS)
  - Access controls and authentication for internal systems
  - Regular monitoring of our systems and infrastructure

However, no method of transmission or storage over the Internet is completely secure. While we strive to protect your personal information, we cannot guarantee absolute security.

## Your Rights and Choices
Depending on your location and applicable law, you may have rights regarding your personal information, including:

  - Accessing the personal information we hold about you
  - Requesting correction of inaccurate or incomplete information
  - Requesting deletion of your personal information (subject to legal obligations)
  - Objecting to or restricting certain processing activities
  - Withdrawing consent where processing is based on consent
  - Opting out of marketing communications

To exercise any of these rights, please contact us using the details in the "Contact Us" section. We may need to verify your identity before processing your request.

## Third‑Party Websites and Links
Our Website may contain links to third‑party websites, platforms, or tools (for example, booking tools, payment processors, or social media platforms). We are not responsible for the privacy practices or content of those third‑party sites. We encourage you to review their privacy policies before providing any personal information.

## Testimonials and Case Studies
With your permission, we may display testimonials, case studies, or success stories on our Website or marketing materials, which may include your name, social profile, business name, and results achieved.

If you wish to update or remove your testimonial, please contact us.

## Children's Privacy
Our Website and Services are not directed to children under the age of 13 (or the minimum age required in your jurisdiction), and we do not knowingly collect personal information from children. If we learn that we have collected personal information from a child, we will take steps to delete that information promptly.

## Changes to This Privacy Policy
We may update this Privacy Policy from time to time. When we do, we will revise the "Effective date" at the top of the Policy. Significant changes may also be communicated via email or a notice on the Website.

Your continued use of the Website or Services after any changes become effective will constitute your acknowledgement of the updated Policy.

## Contact Us
If you have any questions about this Privacy Policy or how we handle your personal information, please contact us at:

**Snapycut**

Email: [hello@snapycut.com](mailto:hello@snapycut.com)

Phone: +1 929-597-1197

Website: [https://www.snapycut.com](https://www.snapycut.com)`,

    cta_text: "",
    cta_url: "",
    extra: {},
  },
  terms_conditions: {
    title: "",
    title_highlight: "",
    subtitle: "",
    description: `## 1. Introduction
By accessing and using the services provided by Snapycut ("the Company," "we," "our," or "us"), you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, you are not authorized to use our services.

## 2. Services Provided
We offer content strategy, short‑form video editing, AI‑assisted content creation, scripting, thumbnail design, social media content systems, and related digital marketing and content management services. These services are subject to the terms outlined below and to the specific scope of work defined in your proposal, order form, or agreement.

## 3. Customer Obligations
You agree to provide accurate, up‑to‑date information when interacting with Snapycut, including contact details, brand guidelines, access to required platforms, raw content, and payment information.

You are responsible for:

  - Ensuring all content, assets, and materials you provide do not infringe any third‑party rights and comply with applicable laws.
  - Maintaining the confidentiality of your accounts and access credentials.
  - All activity that occurs under your accounts, including communication channels and content approvals.

## 4. Payment Terms
All services provided by Snapycut are subject to the payment terms agreed upon at the time of purchase, subscription, or contract signing. Unless otherwise stated:

  - Payments are due as outlined in the invoice, subscription, or agreement.
  - Late or missed payments may result in delays, pauses, or suspension of services.
  - For recurring services or retainers, charges may be processed automatically on the agreed billing cycle until cancelled in accordance with the agreement.

## 5. Revisions and Turnaround Time
The number of revisions included depends on the package or plan selected. Details are specified in your proposal, subscription, or order.

Snapycut aims to provide high‑quality results and will revise within the agreed scope until your needs are met as defined in your selected package. Typical turnaround times for drafts and revisions are communicated at project start and may vary depending on content volume, complexity, and client responsiveness. Delays in providing feedback, approvals, or required assets may extend timelines.

## 6. Refund Policy
Refunds are available only under specific circumstances and in accordance with the refund terms presented at the time of purchase. In general:

  - Once the primary concept, content system, or initial batch of deliverables has been created, reviewed, or approved, fees are typically non‑refundable.
  - Strategy sessions, onboarding, and consulting components are non‑refundable once delivered.
  - Any approved refund will be processed in line with the policy in your proposal, order form, or subscription terms.

## 7. Design, Content Ownership and Rights
Upon full payment for the services rendered:

  - You own the final approved deliverables created specifically for you (for example: final edited videos, final thumbnails, final scripts, and final graphics), subject to any third‑party license restrictions (such as stock media or AI tool licenses).
  - Snapycut retains ownership of all underlying project files, templates, working files, systems, workflows, and internal tools used to create the deliverables.
  - You grant Snapycut a non‑exclusive, worldwide license to display and reference final deliverables and results (e.g., views, followers, engagement metrics you choose to share) as part of our portfolio, website, and marketing materials, unless you specifically request in writing that we do not do so.
  - You are solely responsible for ensuring that your use of the deliverables complies with platform rules and advertising policies.

## 8. Messaging Terms &amp; Conditions
By opting in, you agree to receive SMS, email, and/or platform messages from Snapycut related to:

  - Service updates and project notifications
  - Content delivery, approvals, and revisions
  - Appointment reminders and billing notices
  - Customer support and service information

Message frequency may vary. Message and data rates may apply based on your carrier and plan.

For help, use the support contact method provided in your agreement or on our website. You can opt out of marketing messages at any time by using the unsubscribe or STOP instructions included in the message. Transactional or service‑critical messages may still be sent where permitted by law.

## 9. Content Creation and Population
Unless explicitly included in your package or agreement:

  - Snapycut does not automatically provide all original content (such as raw footage or product photography).
  - We may provide scripts, edited clips, AI‑assisted visuals, thumbnails, captions, and related creative assets as part of the service.

You are responsible for:

  - Providing accurate information, brand guidelines, and any required product details.
  - Reviewing and approving all content before it is published on your channels.

Where we assist with posting or scheduling on your accounts, you remain responsible for compliance with platform rules and any claims arising from your content.

## 10. Confidentiality and Non‑Disclosure
We maintain strict confidentiality regarding your non‑public business information, strategies, and project materials. We do not share, sell, or distribute your confidential information to third parties except:

  - Where required by law, court order, or government request; or
  - Where you provide explicit written consent; or
  - To trusted vendors and subcontractors solely for the purpose of delivering the services, under appropriate confidentiality obligations.

## 11. Customer Support and Communication
Support hours and primary communication channels (such as email, project management tools, or messaging platforms) will be specified in your agreement or onboarding documentation.

To ensure quality and accountability, you agree to use only the official contact channels we provide. We are not liable for any issues, delays, or misunderstandings arising from communication through unauthorized or informal channels.

## 12. Technical Support
Snapycut may assist with uploading, scheduling, and configuring content on supported platforms when included in your service. Unless explicitly stated in your agreement, we do not provide:

  - Ongoing technical support for third‑party platforms; or
  - IT support, account recovery, or security management for your devices or systems.

You are responsible for maintaining secure access to your accounts and for platform‑level configuration outside the agreed scope.

## 13. Third‑Party Tools and Services
Our services may incorporate or rely on third‑party platforms and tools (for example: social networks, AI tools, stock libraries, hosting platforms, or analytics tools).

We do not control or guarantee the availability, performance, or policies of these third parties. Any issues, suspensions, or changes arising from third‑party services are outside our responsibility, although we will make reasonable efforts to help you navigate them where possible.

## 14. Changes to Terms
Snapycut reserves the right to modify these Terms and Conditions at any time. Material changes will be communicated by updating this page and/or via email or in‑app notice where appropriate.

Your continued use of our services after changes are posted constitutes your acceptance of the updated terms. You are encouraged to review these terms periodically.

## 15. Limitation of Liability
To the fullest extent permitted by law:

  - Snapycut will not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to lost profits, lost revenue, loss of data, or business interruption, arising out of or related to your use or inability to use our services, even if we have been advised of the possibility of such damages.
  - Our total aggregate liability for any claim arising out of or relating to the services will be limited to the total amount you have paid to Snapycut for the specific service giving rise to the claim during the three (3) months preceding the event.
  - Results such as views, reach, engagement, conversions, or revenue are influenced by many factors outside our control, and Snapycut does not guarantee any specific performance or outcome.

## 16. Governing Law
These Terms and Conditions shall be governed by and construed in accordance with the applicable laws of the jurisdiction specified in your service agreement or, if none is specified, the laws of the jurisdiction where Snapycut is legally registered and operates, without regard to its conflict of law principles.

## 17. Contact Information
For any questions or clarifications regarding these Terms and Conditions or your services with Snapycut, please contact us using the official contact details provided on our website or in your agreement.

**Snapycut**

Email: [hello@snapycut.com](mailto:hello@snapycut.com)

Phone: +1 929-597-1197

Website: [https://www.snapycut.com](https://www.snapycut.com)`,
    cta_text: "",
    cta_url: "",
    extra: {},
  },
};

export function getSection(content: SiteContent, key: SectionKey): SectionContent {
  return content.sections[key] ?? defaultSections[key];
}

export function getExtraString(section: SectionContent, key: string, fallback = ""): string {
  const value = section.extra[key];
  return typeof value === "string" ? value : fallback;
}

export function getExtraCards(section: SectionContent): Array<{
  badge: string;
  title: string;
  description: string;
  link_text: string;
}> {
  const cards = section.extra.cards;
  if (!Array.isArray(cards)) return [];
  return cards.map((c) => ({
    badge: String((c as Record<string, unknown>).badge ?? ""),
    title: String((c as Record<string, unknown>).title ?? ""),
    description: String((c as Record<string, unknown>).description ?? ""),
    link_text: String((c as Record<string, unknown>).link_text ?? ""),
  }));
}
