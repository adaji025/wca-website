import { createClient } from '@/prismicio'
import Bounded from '@/components/bounded'
import PartnersClient from './partners-client'

const Partners = async () => {
  const client = createClient()
  const allCountries = await client.getAllByType('coalition_detail')

  return (
    <Bounded>
      <PartnersClient countries={allCountries} />
    </Bounded>
  )
}

export default Partners