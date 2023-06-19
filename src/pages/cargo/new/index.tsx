import { groupsApi } from '@/api/groups/groupsApi'
import { groupEntity } from '@/api/groups/type'
import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargo } from '@/modules/NewCargo'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export default function CargoNewPage({
  groupId,
  projectId
}: {
  groupId: string
  projectId: string
}) {
  return <NewCargo groupId={groupId} projectId={projectId} />
}

CargoNewPage.getLayout = (page: ReactNode) => (
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
  if (!query.groupId) {
    return {
      redirect: {
        destination: '/cargo',
        permanent: false
      }
    }
  } else if (
    typeof query.groupId === 'string' &&
    typeof query.projectId === 'string'
  ) {
    try {
      const group = await axios.get<groupEntity>(
        `${process.env.BASE_URL}projects/${query.projectId}/groups/${query.groupId}`,
        {
          withCredentials: true,
          headers: { Cookie: cookies }
        }
      )
      if (group?.data) {
        return { props: { groupId: query.groupId, projectId: query.projectId } }
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
