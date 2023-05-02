import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargoTemplate } from '@/modules/NewCargoTemplate'
import { ReactNode } from 'react'

export default function CargoNewTemplatePage() {
  return <NewCargoTemplate />
}

CargoNewTemplatePage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    <Layout>{page}</Layout>
  </>
)
