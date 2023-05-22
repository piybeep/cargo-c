import { BaseLayout, Layout } from '@/layouts/BaseLayout'
import { Cargo } from '@/modules'
import { ReactNode } from 'react'

export default function CargoPage() {
  return <Cargo />
}

CargoPage.getLayout = (page: ReactNode) => (
  <BaseLayout>
    <main>
      <Layout>{page}</Layout>
    </main>
  </BaseLayout>
)