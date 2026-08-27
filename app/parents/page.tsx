import { landerMetadata, renderLander } from '@/lib/render-lander'

export const metadata = landerMetadata()

/** Parent/guardian audience — roughly half of signed cases. */
export default function ParentsPage() {
  return renderLander('parents', 'a')
}
