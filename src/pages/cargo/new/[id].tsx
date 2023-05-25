import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargo } from '@/modules/NewCargo'
import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export default function CargoEditPage({groupId}:{groupId:string}) {
  return <NewCargo groupId={groupId}/>
}

CargoEditPage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    <Layout>{page}</Layout>
  </>
)

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.groupId) {
    return {
      redirect: {
        destination: '/cargo',
        permanent: false
      }
    }
  }

  return { props: { groupId: query.groupId } }
}
