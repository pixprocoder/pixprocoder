import { contactInfo } from '@/src/constants';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy - PixProcoder',
  description:
    'How pixprocoder.com collects, uses, and protects personal data.',
};

const updated = '15 October 2026';

export default function PrivacyPolicy() {
  return (
    <article className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Privacy policy.
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Last updated {updated}
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-muted-foreground sm:text-base">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Who is responsible
            </h2>
            <p>
              This website is operated by MD Samsul Kobir, trading as
              Pixprocoder Studio SRL, based in Bucharest, Romania
              (&quot;I&quot;, &quot;me&quot;, or &quot;PixProcoder&quot;). For
              questions about this policy or your data, email{' '}
              <a
                href={`mailto:${contactInfo.email}`}
                className="text-foreground hover:text-primary"
              >
                {contactInfo.email}
              </a>
              .
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              What this policy covers
            </h2>
            <p>
              It explains what personal data I collect when you visit
              pixprocoder.com, why I collect it, how long I keep it, and the
              rights you have under the EU General Data Protection Regulation
              (GDPR).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Information I collect
            </h2>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <span className="text-foreground">Account data.</span> If you
                sign in with Google or GitHub (Firebase Authentication), I store
                an identifier, display name, email, and profile photo as
                provided by that provider.
              </li>
              <li>
                <span className="text-foreground">Contact form.</span> Email
                address, subject, and message. Cloudflare Turnstile is used to
                reduce spam.
              </li>
              <li>
                <span className="text-foreground">Comments and likes.</span>{' '}
                Comment text is stored with your account. Likes and view counts
                are stored against the post.
              </li>
              <li>
                <span className="text-foreground">Usage data.</span> Standard
                server logs and analytics may include IP address, browser type,
                pages visited, and timestamps.
              </li>
              <li>
                <span className="text-foreground">Advertising.</span> Google
                AdSense may collect data and set cookies to show ads, as
                described in Google&apos;s policies.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Why I use it
            </h2>
            <p>
              To run the site, respond to messages, keep comments and likes
              working, understand traffic, show ads, and protect against abuse.
              Legal bases under GDPR are: performing a contract or taking steps
              at your request (accounts, contact), legitimate interests
              (security, basic analytics, running a personal site), and consent
              where required (certain cookies and ads).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Cookies
            </h2>
            <p>
              Cookies and similar storage are used for sign-in, security
              (Turnstile), remembering preferences, analytics, and advertising.
              You can block cookies in your browser. The site may not work
              fully without essential ones (for example, staying logged in).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Processors and third parties
            </h2>
            <p>
              Data may be processed by hosting and infrastructure providers,
              Firebase (Google) for authentication, a database for comments and
              likes, Cloudflare (Turnstile), email delivery for the contact
              form, and Google for Analytics and AdSense. Those companies have
              their own privacy policies.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              How long I keep it
            </h2>
            <p>
              Contact messages are kept only as long as needed to reply and
              follow up. Account, comment, and like data stay until you delete
              them or ask me to. Logs and analytics are kept for a limited
              period typical of hosting and analytics tools.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Your rights
            </h2>
            <p>
              If you are in the EEA, UK, or a similar jurisdiction, you can ask
              to access, correct, delete, or export your personal data, or to
              restrict or object to certain processing. You may also withdraw
              consent where processing is based on consent. Email{' '}
              {contactInfo.email} to make a request. You can complain to your
              local data-protection authority (in Romania, ANSPDCP).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              International transfers
            </h2>
            <p>
              Some processors are based outside the EEA (for example, Google).
              Where that happens, they rely on standard contractual clauses or
              another lawful transfer mechanism.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Children
            </h2>
            <p>
              This site is not directed at children under 16. I do not
              knowingly collect personal data from children.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Changes
            </h2>
            <p>
              I may update this policy. The &quot;Last updated&quot; date at
              the top will change. Continued use of the site after a change
              means you accept the revised policy.
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
              . See also the{' '}
              <Link href="/terms" className="text-foreground hover:text-primary">
                Terms of use
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </article>
  );
}
