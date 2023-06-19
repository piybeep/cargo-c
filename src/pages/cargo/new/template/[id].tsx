import { groupsApi } from '@/api/groups/groupsApi'
import { groupEntity } from '@/api/groups/type'
import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargoTemplate } from '@/modules/NewCargoTemplate'
import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export default function CargoNewTemplatePage({
  groupId,
  projectId
}: {
  groupId: string
  projectId: string
}) {
  return <NewCargoTemplate groupId={groupId} projectId={projectId} />
}

CargoNewTemplatePage.getLayout = (page: ReactNode) => (
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
  if (!query.id || !query.projectId) {
    return {
      redirect: {
        destination: '/cargo',
        permanent: false
      }
    }
  } else if (
    typeof query.id === 'string' &&
    typeof query.projectId === 'string'
  ) {
    try {
      const group = await axios.get<groupEntity>(
        `${process.env.BASE_URL}projects/${query.projectId}/groups/${query.id}`,
        {
          withCredentials: true,
          headers: { Cookie: cookies }
        }
      )
      if (group.data) {
        return { props: { groupId: group.data.id, projectId: query.projectId } }
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
