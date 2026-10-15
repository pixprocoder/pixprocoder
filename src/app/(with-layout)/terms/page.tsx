import { contactInfo } from '@/src/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Use - PixProcoder',
  description: 'Terms that apply when you use pixprocoder.com.',
};

const updated = '15 October 2026';

export default function TermsAndConditions() {
  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Terms of use.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {updated}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Agreement
            </h2>
            <p>
              These terms govern your use of pixprocoder.com (the
              &quot;site&quot;), operated by MD Samsul Kobir / Pixprocoder
              Studio SRL, Bucharest, Romania. By using the site you agree to
              these terms and to the{' '}
              <Link
                href="/privacy"
                className="text-foreground hover:text-primary"
              >
                Privacy policy
              </Link>
              . If you do not agree, do not use the site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              The site
            </h2>
            <p>
              The site is a personal website and portfolio. It may include a
              blog, gallery, contact form, and account features (comments,
              likes). It is provided for information and for contacting me
              about freelance or consultancy work. It is not a marketplace and
              does not sell courses or products through this site unless
              clearly stated.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Intellectual property
            </h2>
            <p>
              Content on the site — writing, photos, design, code samples, and
              branding — is owned by MD Samsul Kobir or used with permission.
              You may not copy, scrape, or republish it for commercial use
              without written permission. You may share links and short
              quotations with credit. Code snippets in articles are for
              learning; they are provided as-is.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Accounts
            </h2>
            <p>
              Some features require signing in with Google or GitHub. You are
              responsible for that account. I may suspend access if these terms
              are broken or if the service is abused.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Your content
            </h2>
            <p>
              Comments and similar submissions remain yours. You grant me a
              non-exclusive licence to display them on the site. Do not post
              anything illegal, harmful, or that infringes someone else&apos;s
              rights. I may remove content at my discretion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Acceptable use
            </h2>
            <p>
              You agree not to misuse the site: no unauthorized access,
              scraping at a scale that harms the service, spam, malware, or
              using the contact form for anything other than a genuine message.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              No professional advice
            </h2>
            <p>
              Articles, code, and opinions are personal and educational. They
              are not legal, financial, or professional advice, and they may be
              incomplete or become outdated. You use them at your own risk.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Third-party services
            </h2>
            <p>
              The site may link to other websites or load third-party tools
              (authentication, analytics, ads, captcha). I am not responsible
              for their content or practices. Their terms and privacy policies
              apply to those services.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Disclaimer
            </h2>
            <p>
              The site is provided &quot;as is&quot; and &quot;as
              available&quot;, without warranties of any kind, whether express
              or implied, including fitness for a particular purpose and
              non-infringement. I do not warrant that the site will be
              uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Limitation of liability
            </h2>
            <p>
              To the fullest extent allowed by law, I am not liable for any
              indirect, incidental, special, consequential, or punitive
              damages, or any loss of data, profits, or business, arising from
              your use of the site or reliance on its content. Nothing in these
              terms limits liability that cannot be limited under Romanian or
              EU law (including for death or personal injury caused by
              negligence, or for fraud).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of Romania. Courts in
              Bucharest have jurisdiction, without affecting any mandatory
              consumer protections that apply where you live.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Changes
            </h2>
            <p>
              I may change these terms. The date at the top will be updated.
              Continued use after a change means you accept the new terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Contact
            </h2>
            <p>
              MD Samsul Kobir · Pixprocoder Studio SRL · Bucharest, Romania ·{' '}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-foreground hover:text-primary"
              >
                {contactInfo.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
