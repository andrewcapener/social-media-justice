import { landerMetadata, renderLander } from '@/lib/render-lander'

export const metadata = landerMetadata()

/** Self-submitting 18-25 audience — roughly 43% of signed cases. */
export default function AdultsPage() {
  return renderLander('adults', 'b')
}
