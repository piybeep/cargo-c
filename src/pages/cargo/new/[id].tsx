import { CargoApi } from '@/api/cargo/CargoApi'
import { cargoEntityById } from '@/api/cargo/type'
import { groupsApi } from '@/api/groups/groupsApi'
import { groupEntity } from '@/api/groups/type'
import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargo } from '@/modules/NewCargo'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export default function CargoEditPage({
  groupId,
  cargo,
  projectId,
  template,
  edit
}: {
  groupId: string
  cargo: cargoEntityById
  projectId: string
  template: boolean
  edit: boolean
}) {
  return (
    <NewCargo
      groupId={groupId}
      cargo={cargo}
      projectId={projectId}
      template={template}
      edit={edit}
    />
  )
}

CargoEditPage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    <Layout>{page}</Layout>
  </>
)

export async function getServerSideProps({
  query,
  req
}: GetServerSidePropsContext) {
  const cookies = req.headers.cookie
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
      const cargo = await axios.get<cargoEntityById>(
        `${process.env.BASE_URL}groups/${query.groupId}/cargos/${query.id}`,
        {
          withCredentials: true,
          headers: { Cookie: cookies }
        }
      )
      const group = await axios.get<groupEntity>(
        `${process.env.BASE_URL}projects/${query.projectId}/groups/${query.groupId}`,
        {
          withCredentials: true,
          headers: { Cookie: cookies }
        }
      )
      if (cargo.data && group.data) {
        return {
          props: {
            groupId: query.groupId,
            cargo:cargo.data,
            projectId: query.projectId,
            template: query.template ? query.template : false,
            edit: query.edit ? true : false
          }
        }
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
