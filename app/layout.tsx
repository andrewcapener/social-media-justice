import type { Metadata } from 'next'
import { Inter, Source_Serif_4 } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

/**
 * Serif display face. In legal, typography is the single largest lever on
 * perceived legitimacy — courts, firms, and institutions set in serif, and a
 * pure-geometric-sans page reads like a startup, not counsel.
 */
const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700'],
  // Distinct from the Tailwind `--font-serif` token, which points at this.
  variable: '--font-serif-src',
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'https://www.socialmediajusticetoday.com')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Social Media Justice — Free Case Review',
  description:
    'Was your child harmed by Instagram, TikTok, Snapchat, or Facebook? Find out in about two minutes whether your family may qualify. Free and confidential.',
  openGraph: {
    title: 'Social Media Justice — Was Your Child Harmed?',
    description:
      'Families are holding Meta, TikTok, and Snap accountable. Free, confidential case review.',
    type: 'website',
    url: siteUrl,
    siteName: 'Social Media Justice',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Social Media Justice — Free Case Review',
    description:
      'Was your child harmed by social media? Find out if your family qualifies.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const trustedFormScript = process.env.TRUSTEDFORM_SCRIPT
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID
  // Growth Channel retargeting — every page. The conversion pixel is NOT here;
  // it fires only on the optimized event, from lib/growth-channel.ts.
  const gcRetargeting = process.env.NEXT_PUBLIC_GC_RETARGETING_PIXEL

  return (
    <html lang="en" className={`${inter.variable} ${sourceSerif.variable}`}>
      <head>
        {/* Google Tag Manager — loaded first so the media team can manage tags
            without a deploy. If a pixel is added here AND in GTM it fires
            twice, so pick one home per tag. */}
        {gtmId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`,
            }}
          />
        )}

        {/* Growth Channel retargeting — all pages */}
        {gcRetargeting && <script async src={gcRetargeting} />}

        {/* Meta pixel — browser half of the pair. The server half fires from
            /api/capi with a matching event_id so Meta dedupes. */}
        {pixelId && (
          <script
            dangerouslySetInnerHTML={{
              __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`,
            }}
          />
        )}

        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}

        {trustedFormScript && <script src={trustedFormScript} async />}
      </head>
      <body className="bg-white font-sans antialiased">
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
              title="Google Tag Manager"
            />
          </noscript>
        )}
        {pixelId && (
          <noscript>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              height="1"
              width="1"
              style={{ display: 'none' }}
              alt=""
              src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        )}
        {children}
        <Analytics />
      </body>
    </html>
  )
}
