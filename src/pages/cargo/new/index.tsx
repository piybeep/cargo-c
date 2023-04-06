import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargo } from '@/modules/NewCargo'
import { ReactNode } from 'react'

export default function CargoNewPage() {
  return <NewCargo />
}

CargoNewPage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    <Layout>{page}</Layout>
  </>
)
