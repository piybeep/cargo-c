import { ReactNode } from 'react'

import { Header, TransportConfig } from '@/modules'
import { GetServerSidePropsContext } from 'next'
import { TransportApi } from '@/api/transport/TransportApi'
import { transportEntity } from '@/api/transport/type'

export default function TransportConfigEditPage({
  transport,
  template,
  edit
}: {
  transport: transportEntity
  template: boolean
  edit:boolean
}) {
  return (
    <main>
      <TransportConfig editTransport={transport} template={template} edit={edit}/>
    </main>
  )
}

TransportConfigEditPage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    {page}
  </>
)

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.id) {
    return {
      redirect: {
        destination: '/transport',
        permanent: false
      }
    }
  } else if (typeof query.id === 'string') {
    try {
      console.log(query.edit)
      const transport = await TransportApi.getTransportById(query.id)
      if (transport) {
        return {
          props: {
            transport,
            template: query.template ? query.template : false,
            edit: query.edit ? true : false
          }
        }
      } else {
        return {
          redirect: {
            destination: '/transport',
            permanent: false
          }
        }
      }
    } catch (e) {
      return {
        redirect: {
          destination: '/transport',
          permanent: false
        }
      }
    }
  }
}
