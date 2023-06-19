import { ReactNode } from 'react'

import { Header, TransportConfig } from '@/modules'
import { GetServerSidePropsContext } from 'next'
import { TransportApi } from '@/api/transport/TransportApi'
import { transportEntity } from '@/api/transport/type'
import axios from 'axios'

export default function TransportConfigEditPage({
  transport,
  template,
  edit
}: {
  transport: transportEntity
  template: boolean
  edit: boolean
}) {
  return (
    <main>
      <TransportConfig
        editTransport={transport}
        template={template}
        edit={edit}
      />
    </main>
  )
}

TransportConfigEditPage.getLayout = (page: ReactNode) => (
  <>
    <Header />
    {page}
  </>
)

export async function getServerSideProps({
  query,
  req
}: GetServerSidePropsContext) {
  const cookies = req.headers.cookie
  if (!query.id) {
    return {
      redirect: {
        destination: '/transport',
        permanent: false
      }
    }
  } else if (typeof query.id === 'string') {
    try {
      const transport = await axios.get<transportEntity>(
        `${process.env.BASE_URL}loadspaces/${query.id}`,
        {
          withCredentials: true,
          headers: { Cookie: cookies }
        }
      )
      if (transport) {
        return {
          props: {
            transport: transport.data,
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
