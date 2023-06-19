import { GetPassword } from '@/modules'
import { GetServerSidePropsContext } from 'next'

const GetPasswordPage = ({ code }: { code: number }) => {
  return <GetPassword code={code} />
}

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
  if (!query.code) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return { props: { code: query.code } }
}

export default GetPasswordPage
