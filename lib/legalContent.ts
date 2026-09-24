/**
 * The legal copy for this landing page.
 *
 * Rewritten 2026-09-24 for the Johnson Firm. The previous version mirrored
 * Simmons Hanly Conroy's own privacy policy and disclaimer verbatim, which was
 * right while Simmons was the participating firm and became actively wrong the
 * moment they were not.
 *
 * These are OUR documents now, not the firm's, which is what Johnson asked for:
 * update the firm name throughout and point readers to their published policy
 * rather than reproducing it. That is also the more honest shape. This page runs
 * tracking the firm's own policy does not describe, and their policy governs
 * their website, not an advertising landing page operated by someone else.
 *
 * Every mention of the firm reads from lib/legal.ts rather than being written
 * out here, so the next swap is one file again. The placeholders below are
 * substituted at render time by components/LegalPage.tsx:
 *
 *   {FIRM}           the firm's name
 *   {POLICY}         the firm's published policy URL
 *   {PRIVACY_EMAIL}  our data-rights contact
 *
 * ⚠️ Not drafted by a lawyer. It is accurate about what this page does, which
 * is the part that was broken before, but the firm's counsel should read it.
 */

export type LegalBlock = readonly [kind: 'h' | 'p' | 'li', text: string]

export const FIRM_DISCLAIMER: readonly LegalBlock[] = [
  ['h', 'Attorney Advertising'],
  ['p', 'This website is attorney advertising for {FIRM}. It is not a law firm, it does not provide legal advice, and nothing on it is a substitute for advice from a qualified attorney about your own situation.'],

  ['h', 'No Attorney-Client Relationship'],
  ['p', 'Using this website, reading anything on it, or submitting the intake form does not create an attorney-client relationship with {FIRM}, with any attorney, or with the operator of this site. That relationship is created only by a signed written agreement, and only if the firm chooses to offer one.'],
  ['p', 'Nothing you submit through this site is protected by attorney-client privilege at the time you submit it. Do not send anything you would not want disclosed.'],

  ['h', 'Where Your Information Goes'],
  ['p', 'The questionnaire on this site is operated by the participating firm through a third-party provider and embedded here. Your answers go to the firm, not to the operator of this page. The firm decides whether you may qualify; we do not, and we do not see what you submitted.'],

  ['h', 'No Guarantee of Outcome'],
  ['p', 'Nothing on this site is a promise or prediction about any case. Recovery is not guaranteed. Results depend on the specific facts, and prior results do not guarantee a similar outcome. Any figures referenced in advertising relate to other matters and are not a representation about yours.'],

  ['h', 'Where the Firm Practises'],
  ['p', 'This advertising is seen across the United States. The participating firm is not licensed in every state. The licensure statement in the footer of this page sets out where its lawyers are admitted and how matters outside those states are handled.'],

  ['h', 'Not Medical Advice'],
  ['p', 'Health information on this site is general and educational. It is not medical advice, it is not a diagnosis, and it is not a substitute for care from a qualified professional. If you or someone you know is in crisis, call or text 988 in the United States.'],

  ['h', 'Images'],
  ['p', 'Photographs on this site depict models, not actual clients, and do not portray any actual client or case.'],

  ['h', 'Accuracy'],
  ['p', 'Information here is provided as is and is not guaranteed to be correct, complete or current. Litigation changes, and a page that was accurate when written may not be when read.'],

  ['h', "The Firm's Own Policy"],
  ['p', "For the firm's published website policy, visit {POLICY}."],
]

export const FIRM_PRIVACY_POLICY: readonly LegalBlock[] = [
  ['h', 'What This Page Is'],
  ['p', 'This is an advertising landing page for {FIRM}. It is operated by an advertising company, not by the firm. This policy covers what happens on this page. The firm has its own policy covering its own website, linked at the bottom.'],

  ['h', 'The Intake Form Is Not Ours'],
  ['p', 'The questionnaire on this page is hosted and operated by the participating firm through a third-party provider and embedded here. When you complete it, your answers go to that firm. Your name, phone number, email address and the details of your situation are submitted directly to their systems and are governed by their policy, not this one.'],
  ['p', 'We do not receive, store, or have access to the contents of your form submission.'],

  ['h', 'What We Do Collect'],
  ['li', 'Device and usage data: IP address, browser type and version, operating system, referring URL, pages viewed, and time on page.'],
  ['li', 'Advertising identifiers: Meta click and browser identifiers (the fbclid parameter and the _fbc and _fbp cookies), Google Analytics identifiers, and identifiers set by our programmatic advertising partner. These tell us which ad brought you here.'],
  ['li', 'A submission reference: when the form is completed we receive an anonymous reference number for that submission. It lets us count conversions and attribute them to an ad. It does not contain your name or your answers.'],
  ['li', 'Consent records: if the firm’s TrustedForm script is active on the page, it records evidence of the consent you give, on their behalf.'],
  ['p', 'Where we transmit any contact identifier to an advertising platform for measurement, it is irreversibly hashed before it leaves this page. We do not store contact details in plain text.'],

  ['h', 'Cookies, Pixels and Advertising'],
  ['p', 'This page uses cookies and tracking pixels for advertising, including retargeting. It collects information about your activity over time for that purpose. Specifically it runs the Meta (Facebook) pixel and the Meta Conversions API, Google Analytics 4, Google Tag Manager, a programmatic retargeting pixel, and TrustedForm.'],
  ['p', 'What that means in practice: Meta and our programmatic partner may show you ads for this campaign on other websites and apps after you visit this page, and we measure which ads produced form submissions.'],
  ['p', 'You can limit this through your browser’s cookie settings, your device’s advertising controls, Meta’s ad preferences, and the Google Analytics opt-out browser add-on. Global Privacy Control signals sent by your browser are honoured as an opt-out of sharing for targeted advertising.'],

  ['h', 'How We Use It'],
  ['li', 'To measure which ads, audiences and pages produce results, and to spend the advertising budget accordingly.'],
  ['li', 'To show ads for this campaign to people who visited this page and did not complete the form.'],
  ['li', 'To keep the page working, secure and free of fraudulent or automated traffic.'],
  ['li', 'To comply with legal obligations and advertising platform requirements.'],
  ['p', 'We do not use this data to make automated decisions about you, and we do not evaluate your legal claim. Only the participating firm does that.'],

  ['h', 'Who We Share It With'],
  ['li', 'Advertising and analytics platforms, as described above, for measurement and ad delivery.'],
  ['li', 'The participating firm, in aggregate and at the submission-reference level, so campaign performance can be reconciled against their intake.'],
  ['li', 'Service providers who host and operate this page, under confidentiality obligations.'],
  ['li', 'Legal authorities where required by law, subpoena or court order.'],
  ['p', 'We do not sell your personal information for money. Note that sharing advertising identifiers with platforms for targeted advertising may be treated as a sale or sharing under some state privacy laws, including California’s.'],

  ['h', 'Your Rights'],
  ['p', 'Depending on where you live, you may have the right to know what personal information we hold about you and request a copy, to request correction or deletion of it, to opt out of the sale or sharing of your personal information for targeted advertising, to withdraw consent, and not to be discriminated against for exercising any of these rights.'],
  ['p', 'To exercise any of these for the data described in this policy, email {PRIVACY_EMAIL}. To reach the firm about the contents of a form you submitted, contact them directly. We cannot access or delete it for you.'],

  ['h', 'How Long We Keep It'],
  ['p', 'Advertising and analytics data is retained no longer than needed to measure the campaign it belongs to. Submission references and any hashed identifiers used for conversion measurement are deleted automatically within 30 days. Data held by Meta and Google is governed by their own retention policies.'],

  ['h', 'Security'],
  ['p', 'This page is served over TLS. We apply reasonable technical and organisational measures to protect the limited data we hold. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.'],

  ['h', 'Children'],
  ['p', 'This page is directed to adults. We do not knowingly collect information from children under 13. Where a parent or guardian submits the form about a minor, that submission is handled by the firm under their policy, not by us.'],

  ['h', 'Changes'],
  ['p', 'We may update this policy. Changes take effect when posted, and the effective date above will change.'],

  ['h', "The Firm's Own Policy"],
  ['p', "For the firm's published website policy, visit {POLICY}."],
]
