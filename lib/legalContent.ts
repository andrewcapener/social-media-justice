/**
 * The firm's legal copy, mirrored onto this domain.
 *
 * Hosted here rather than linked out, per Andrew on 2026-09-11: a compliance
 * link that navigates away from a landing page loses the lead. It was also
 * forced: socialmediajusticehelp.com, the host the client's team originally
 * supplied, went down and stayed down.
 *
 * Source: simmonsfirm.com/disclaimer/ and simmonsfirm.com/privacy-policy/,
 * pulled 2026-09-11. Reproduced verbatim. Nothing in these arrays is edited,
 * paraphrased or reordered, because it is the firm's counsel's language and
 * not ours to improve.
 *
 * ⚠️ Two things the firm should confirm at approval:
 *
 * 1. Their privacy policy states the Sites "do not collect personal information
 *    about your online activities over time and across third party websites",
 *    and that Do Not Track signals therefore do not apply. That is true of
 *    simmonsfirm.com. It is NOT true of this landing page, which runs Meta
 *    retargeting and a programmatic retargeting pixel, both of which are
 *    cross-site tracking over time. Mirroring that sentence unqualified would
 *    be an affirmative false statement about our own tracking, so
 *    PRIVACY_ADDENDUM below corrects it for this domain. The addendum renders
 *    visually separated and labelled as ours, not theirs.
 *
 * 2. The contact email in their privacy policy is obfuscated by their host's
 *    bot protection, so it arrives in the page source as a literal placeholder
 *    rather than an address. Rendering that verbatim would put a broken token
 *    on a live compliance page, and inventing an address would be worse. The
 *    two sentences that carried it now give their published phone number and
 *    point to their site for the current email. This is the ONLY edit made to
 *    their text anywhere, and it should be confirmed at approval.
 */

export type LegalBlock = readonly [kind: 'h' | 'p' | 'li', text: string]

export const FIRM_DISCLAIMER: readonly LegalBlock[] = [
  ['p', 'The contents of this website should not be construed as legal advice on any specific fact or circumstance. Its content was prepared by Simmons Hanly Conroy LLP (an Illinois law firm organized as a limited liability company with its principal office at One Court Street, Alton, IL 62002, Ph 1-855-264-6270) for general information purposes only. Your receipt of such information does not create an attorney-client relationship with Simmons Hanly Conroy LLP or any of its lawyers. Neither the transmission nor receipt of these website materials will create an attorney-client relationship between sender and receiver. You should not act or rely on any of the information contained here without seeking professional legal advice.'],
  ['p', 'Prior results referred to in these materials do not guarantee or suggest a similar result in other matters. Simmons Hanly Conroy LLP’s lawyers are licensed in Illinois and a limited number of other jurisdictions. They and the Firm cannot file actions in all states without associating locally licensed attorneys and/or becoming admitted in that jurisdiction for a limited purpose.'],
  ['p', 'The information is not guaranteed to be correct, complete, or current. We make no warranty, expressed or implied, about the accuracy or reliability of the information at this website or at any other website to which this site is linked.'],
  ['p', 'Please note that recovery results vary per client. The recovery amounts in each case reflect the specific facts of that case. Further, recovery amounts in past cases do not guarantee or suggest a similar result in future matters because every case is different and must be judged on its own merits. The information provided is not intended to and should not be construed as creating a comparison between the services or fees of attorneys at Simmons Hanly Conroy and attorneys at other law firms.'],
  ['p', 'The S Logo and Simmons Hanly Conroy, A National Law Firm are registered trademarks of Simmons Hanly Conroy LLP. Some photos used on this website have been purchased from stock photography companies.'],
  ['p', 'This website is not intended to create and does not create an attorney-client relationship between the user and Simmons Hanly Conroy. An attorney-client relationship with us cannot be formed by reading the information at this website or by voluntarily submitting information to Simmons Hanly Conroy or any of its lawyers. The only way to become our client is through a mutual agreement in a formal letter. This website is not soliciting clients and does not propose any type of transaction. The determination of whether you need legal services and your choice of a lawyer are very important matters that should not be based on websites or advertisements.'],
  ['p', 'If we do enter into an attorney-client relationship, it is possible your case may be referred to another lawyer or law firm.'],
  ['p', 'THIS SITE IS PROVIDED ON AN “AS IS”, “AS AVAILABLE” BASIS AND THE LAW OFFICES OF SIMMONS HANLY CONROY LLP EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NONINFRINGEMENT.'],
  ['p', 'SIMMONS HANLY CONROY LLP DISCLAIMS ALL RESPONSIBILITY FOR ANY LOSS, INJURY, CLAIM, LIABILITY, OR DAMAGE OF ANY KIND RESULTING FROM, ARISING OUT OF OR ANY WAY RELATED TO (A) ANY ERRORS IN OR OMISSIONS FROM THIS SITE AND ITS CONTENT, INCLUDING BUT NOT LIMITED TO TECHNICAL INACCURACIES AND TYPOGRAPHICAL ERRORS, (B) ANY THIRD PARTY WEBSITES OR CONTENT THEREIN DIRECTLY OR INDIRECTLY ACCESSED THROUGH LINKS IN THIS SITE, INCLUDING BUT NOT LIMITED TO ANY ERRORS IN OR OMISSIONS THEREFROM, (C) THE UNAVAILABILITY OF THIS SITE OR ANY PORTION THEREOF, (D) YOUR USE OF THIS SITE, OR (E) YOUR USE OF ANY EQUIPMENT OR SOFTWARE IN CONNECTION WITH THIS SITE.'],
] as const

export const FIRM_PRIVACY_POLICY: readonly LegalBlock[] = [
  ['p', 'Effective Date: December 7, 2017'],
  ['p', 'Introduction'],
  ['p', 'This website is developed and maintained by Simmons Hanly Conroy LLP (hereinafter “the Simmons Firm,” “we,” or “us”).  When you visit our website, mobile app, official social media sites, or other online properties, collectively “Sites” or “Services,” we may collect and use certain information about you.  We recognize that you care about how your information is used, and your privacy is important to us.  This Privacy Policy explains how we may collect and use your information, particularly your personal information, and the choices you can make about what information you share.'],
  ['p', 'This Privacy Policy applies to information collected by the Simmons Firm, or any affiliated or subsidiary companies, through the Sites or Services that post a link to this Privacy Policy. Please read this Privacy Policy carefully.  By continuing to interact with our Sites and Services, you are agreeing to the practices described in this Privacy Policy.'],
  ['p', 'Changes to this Privacy Policy'],
  ['p', 'We ask that you read this Privacy Policy from time to time. We may modify this Privacy Policy at any time in our sole discretion. If we make material changes to this Privacy Policy that increase our rights to use personal information we have previously collected about you, we will obtain your consent through an email to your registered email address.'],
  ['p', 'Information We Collect'],
  ['p', 'The Simmons Firm collects information about you when you interact with our Sites and Services. When you use our Sites and Services, we collect information about the devices you use such as a computer, mobile phone, or tablet. We may collect, store, and use information you provide to us when you use our Sites and Services, including when you, complete a web form, communicate with our live chat agents, or otherwise correspond with us regarding the Sites and Services. The information we collect may include, but is not limited to, your name, phone number, email address, and your reason for communicating with us.'],
  ['p', 'In addition, we may automatically collect information about the devices you use to interact with our Sites and Services. The information we automatically collect may include your device identifier, device information, web browser, and browsing information collected through Cookies and Other Technologies, such as your IP address and location.  We may also automatically collect information about how you use the Sites and Services, such as what you have searched for and viewed on the Sites and Services.'],
  ['p', 'Our Sites and Services do not collect personal information about your online activities over time and across third party websites or online services.  Therefore, “do not track” signals transmitted from web browsers do not apply to our Sites and Services, and we do not alter any of our data collection and use practices upon receipt of such a signal.'],
  ['p', 'How We Use Your Information'],
  ['p', 'The personal information we collect may be used or processed where the Simmons Firm has a legitimate interest in or other legal basis for processing such data. In some situations the collection of personal information may be required for the operation of the Sites and Services or to provide certain services. The information we collect may be used for the following purposes:'],
  ['li', 'To serve the functions of the Sites and Services;'],
  ['li', 'To manage everyday business needs, such as administration and improvement of the Sites;'],
  ['li', 'To analyze the Sites’ performance and functioning;'],
  ['li', 'To prevent fraud; to enforce the Sites’ Terms of Use; to comply with all applicable laws and corporate reporting obligations; and to enforce our agreements;'],
  ['li', 'To analyze how you use the Sites and Services and to perform other market research;'],
  ['li', 'To communicate with you about our Services;'],
  ['li', 'To send you further notices, promotions, solicitations, brochures, or other marketing materials regarding our Sites and Services and the services of our businesses, affiliates, and business partners.'],
  ['p', 'We may use your personal information to develop a personal profile about you.'],
  ['p', 'If you notify us that you do not wish to be contacted for marketing purposes, we will not send you marketing information.'],
  ['p', 'How We Share Your Information'],
  ['p', 'We may share your information with third party service providers who perform services and functions on our behalf to support our interactions with you including, for example, providing our services or communicating with you.'],
  ['p', 'The Simmons Firm may also provide to third parties, including other businesses and members of the public, aggregated statistical data showing general usage patterns and statistics, interactions, and transactions with our Sites and Services. This data does not personally identify you or provide specific information about individual usage.'],
  ['p', 'In addition, we may disclose information about you:'],
  ['li', 'If we are required to do so by law or legal process;'],
  ['li', 'To law enforcement authorities or other government officials;'],
  ['li', 'When we believe disclosure is necessary or appropriate to prevent physical harm or financial loss or in connection with an investigation of suspected or actual illegal activity;'],
  ['li', 'If this is necessary to protect the vital interests of a person;'],
  ['li', 'To enforce our Terms of Use;'],
  ['li', 'To protect our property, services and legal rights;'],
  ['li', 'To prevent fraud against the Simmons Firm, our affiliates, or business partners;'],
  ['li', 'To support auditing, compliance, and corporate governance functions; or'],
  ['li', 'To comply with any and all applicable laws.'],
  ['p', 'Social Networking'],
  ['p', 'Our Sites and Services may allow you sign into and associate your social network accounts including, but not limited to, Twitter, LinkedIn, and Facebook with the Simmons Firm.'],
  ['p', 'By using this functionality, you give the Simmons Firm permission to access all of the elements of your social network profile information that you have made available to be shared and to use it in accordance with the social network’s terms of use and this Privacy Policy. Please refer to the privacy settings in your social network account for information about what data is shared with us and other connected applications and to manage the data that is shared through your account, including information about your activities using our Sites.'],
  ['p', 'If you would like to disconnect a social media account from us, refer to the settings of that social media account and its provider.'],
  ['p', 'Cookies'],
  ['p', 'Our Sites and Services may place cookies, web beacons, pixels, clear gifs, and other similar technologies (collectively “Cookies and Other Tracking Technologies”) on your devices.  A cookie is a small text file that can be stored on and accessed from your device when you visit one of our Sites.  The other tracking technologies work similarly to cookies and place small data files on your devices or monitor your website activity to enable us to collect information about how you use our Sites. We may collect information about you or from activity on devices associated with you as soon as you visit our Sites and Services.  By using our Sites and Services you permit us to collect and use your information from activity on devices associated with you in accordance with this Privacy Policy.'],
  ['p', 'We use Cookies and Other Tracking Technologies to collect information about how you use the Sites and Services.  Many Internet browsers and mobile devices allow you to block the transmission of information, such as your IP address or location information, or to block the installation of cookies. You may choose to enable these options. However, enabling these options may prevent you from using many of the core features and functions available on our Sites and Services.'],
  ['p', 'Information Security'],
  ['p', 'The Simmons Firm has implemented an information security program that contains administrative, technical and physical controls that are designed to reasonably safeguard information that can individually identify you.'],
  ['p', 'You can also ask us to update the information we have collected about you by contacting us at 844-888-4477 or through the contact details published at simmonsfirm.com.'],
  ['p', 'Business Transfers or Changes'],
  ['p', 'We reserve the right to disclose and transfer all information related to the Sites and Services, including personal information:'],
  ['li', 'to a subsequent owner, co-owner or operator of one or more of the Sites; or'],
  ['li', 'in connection with a corporate merger, consolidation, or restructuring, the sale of substantially all of our stock and/or assets, or other corporate change, including, without limitation, during the course of any due diligence process.'],
  ['p', 'Children’s Privacy'],
  ['p', 'Our Sites are general audience sites not directed at children under the age of 13. If we obtain actual knowledge that any information we collect has been provided by a child under the age of 13, we will promptly delete that information.'],
  ['p', 'California Privacy Rights'],
  ['p', 'Pursuant to California Civil Code Section 1798.83(c)(2), the Simmons Firm does not share your personal information with third parties for those third parties’ direct marketing use.'],
  ['p', 'Contact Us'],
  ['p', 'Please Contact Us if you have any questions or comments about our privacy practices or this Privacy Policy. You can reach us by calling 844-888-4477 or through the contact details published at simmonsfirm.com.'],
] as const

/**
 * Ours, not theirs. Appended to the privacy policy and labelled as such.
 *
 * Covers the advertising and analytics technology that runs on this landing
 * page and is not described by the firm's policy, and corrects the cross-site
 * tracking statement for this domain.
 */
export const PRIVACY_ADDENDUM: readonly LegalBlock[] = [
  ['h', 'Additional Notice for This Landing Page'],
  ['p', 'The policy above is the firm\'s and governs their website. This page is a separate advertising landing page, and the following applies to it specifically. Where the two differ, this section controls for this page.'],
  ['p', 'This page uses cookies and tracking pixels for advertising, including retargeting. It does collect information about your activity over time for that purpose, which is a difference from the policy above. Specifically it runs the Meta (Facebook) pixel and the Meta Conversions API, Google Analytics 4, Google Tag Manager, a programmatic retargeting pixel, and TrustedForm, which records evidence of the consent you give when you submit the form.'],
  ['p', 'What that means in practice: Meta and our programmatic partner may show you ads for this campaign on other websites and apps after you visit this page, and we measure which ads produced form submissions.'],
  ['p', 'The questionnaire on this page is the firm\'s form, hosted by a third party and embedded here. Your answers go to the firm, not to us. We do not receive or store the contents of your submission. Where any contact identifier is sent to an advertising platform for measurement, it is irreversibly hashed before it leaves this page.'],
  ['p', 'You can limit this through your browser\'s cookie settings, your device\'s advertising controls, Meta\'s ad preferences, and the Google Analytics opt-out browser add-on. Unlike the firm\'s website, this page honours Global Privacy Control signals sent by your browser as an opt-out of sharing for targeted advertising.'],
] as const
