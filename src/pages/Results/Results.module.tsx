import React, { ReactNode } from 'react'
import { PanelData } from '@/pages/Results/ToggledListItems/ToggledListItems.module.ts'
import { Box, Link, Typography } from '@mui/material'
import { useAppSelector } from '@/hooks/reduxHooks.ts'
import { selectResults } from '@/features/results/resultsSlice.ts'

export const useResults = () => {
  const results = useAppSelector(selectResults)

  const panels: PanelData[] =
    results.benefits.map(({ amount, description, link_to_source, title }, key) => {
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

  const totalAmount = results?.total_amount ?? 0
  return { panels, totalAmount }
}
