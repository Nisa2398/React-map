import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'

import Layout from '../../components/layout'
import MapChart from '../../components/mapChart'
import { findAirportByIata } from '../../models/airport'
import Airport from '../../types/airport'

interface Props {
  airport: Airport | undefined
}

const Page: NextPage<Props> = ({ airport }) => {
  return <Layout>
    <h1 className='mb-4 text-2xl font-bold'>Airport: {airport.name}</h1>
    <Link href="/">
      <a className="text-blue-400 hover:text-blue-600 hover:underline">
        ← Back to overview
      </a>
    </Link>
    <pre className='p-2 mt-6 text-sm text-gray-500 rounded bg-gray-50'>{JSON.stringify(airport, undefined, 2)}</pre>
    <div>
      <MapChart airport={airport}/>
    </div>
  </Layout>
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { iata } = params
  const airport = await findAirportByIata(iata.toString())

  return {
    props: {
      airport,
    }
  }
}

export default Page
