import { useGetResultsMutation } from '@/features/results/resultsApiSlice.ts'
import React, { ReactNode, useEffect } from 'react'
import { PanelData } from '@/pages/Results/ToggledListItems/ToggledListItems.module.ts'
import { Box, Link, Typography } from '@mui/material'

export const useResults = () => {
  const [getResults, { isLoading, isError, data }] = useGetResultsMutation()

  useEffect(() => {
    getResults({
      combat_level: 'a',
      family_status: {
        employment_status: 'asdf',
        active_reservist: false,
        business_size: 'asdf',
        property_owner: true,
      },
      recruitment_date: [],
      recruitment_type: 'sadf',
    })
  }, [])

  const panels: PanelData[] =
    data?.benefits.map(({ amount, description, link_to_source, title }, key) => {
      const Content: ReactNode = (
        <Box sx={{ textAlign: 'start' }}>
          <Typography>{description}</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography>להגשת בקשה, יש להכנס לאתר</Typography>
            <Link href={link_to_source}>{link_to_source}</Link>
          </Box>
        </Box>
      )
      return { id: key.toString(), header: ` ${title} -  ₪${amount.toLocaleString()}`, Content }
    }) || []

  const totalAmount = data?.total_amount ?? 0
  return { isLoading, isError, panels, totalAmount }
}