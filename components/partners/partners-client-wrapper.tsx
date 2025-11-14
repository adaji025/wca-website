"use client";

import React, { useEffect, useState } from 'react'
import { createClient } from '@/prismicio'
import type { CoalitionDetailDocument } from '@/prismicio-types'
import PartnersClient from './partners-client'
import Bounded from '@/components/bounded'

const PartnersClientWrapper: React.FC = () => {
  const [countries, setCountries] = useState<CoalitionDetailDocument[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const client = createClient()
        const allCountries = await client.getAllByType('coalition_detail')
        setCountries(allCountries)
      } catch (error) {
        console.error('Error fetching countries:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCountries()
  }, [])

  if (loading) {
    return (
      <Bounded>
        <div className="text-center py-12 text-gray-500">
          <p className="text-lg">Loading...</p>
        </div>
      </Bounded>
    )
  }

  return (
    <Bounded>
      <PartnersClient countries={countries} />
    </Bounded>
  )
}

export default PartnersClientWrapper

