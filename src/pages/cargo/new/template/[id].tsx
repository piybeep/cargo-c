import { groupsApi } from '@/api/groups/groupsApi'
import { Layout } from '@/layouts/BaseLayout'
import { Header } from '@/modules'
import { NewCargoTemplate } from '@/modules/NewCargoTemplate'
import { GetServerSidePropsContext } from 'next'
import { ReactNode } from 'react'

export default function CargoNewTemplatePage({ groupId,projectId }: { groupId: string,projectId:string }) {
  return <NewCargoTemplate groupId={groupId} projectId={projectId}/>
}

CargoNewTemplatePage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    <Layout>{page}</Layout>
  </>
)

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
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
      const group = await groupsApi.getGroupById({
        groupId: query.id,
        projectId: query.projectId
      })
      if (group) {
        return { props: { groupId: group.id,projectId:query.projectId } }
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
