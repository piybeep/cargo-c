import { CargoApi } from '@/api/cargo/CargoApi'
import { cargoEntityById } from '@/api/cargo/type'
import { groupsApi } from '@/api/groups/groupsApi'
import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargo } from '@/modules/NewCargo'
import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export default function CargoEditPage({
  groupId,
  cargo
}: {
  groupId: string
  cargo: cargoEntityById
}) {
  return <NewCargo groupId={groupId} cargo={cargo} />
}

CargoEditPage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    <Layout>{page}</Layout>
  </>
)

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.groupId || !query.id || !query.projectId) {
    return {
      redirect: {
        destination: '/cargo',
        permanent: false
      }
    }
  } else if (
    typeof query.groupId === 'string' &&
    typeof query.id === 'string' &&
    typeof query.projectId === 'string'
  ) {
    try {
      const cargo = await CargoApi.getCargoById({
        cargoId: query.id,
        groupId: query.groupId
      })
      const group = await groupsApi.getGroupById({
        groupId: query.groupId,
        projectId: query.projectId
      })
      if (cargo && group) {
        return { props: { groupId: query.groupId, cargo } }
      } else {
        return {
          redirect: {
            destination: '/cargo',
            permanent: false
          }
        }
      }
    } catch (e) {
      return {
        redirect: {
          destination: '/cargo',
          permanent: false
        }
      }
    }
  }
}
