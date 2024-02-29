import React, { ReactNode } from 'react'
import { PanelData } from '@/pages/Results/ToggledListItems/ToggledListItems.module.ts'
import { Box, Link, Typography } from '@mui/material'
import { useAppSelector } from '@/hooks/reduxHooks.ts'
import { selectResults } from '@/features/results/resultsSlice.ts'
import { IBenefitAgg } from '@/types/apiResponses.types.ts'

export const useResults = () => {
  const results = useAppSelector(selectResults)

  const getSectionPanels = (agg: IBenefitAgg): PanelData[] => {
    return agg.benefits.map(({ financial_reward, description, link_to_source, title }, key) => {
      const Content: ReactNode = (
        <Box sx={{ textAlign: 'start' }}>
          <Typography>{description}</Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Typography>להגשת בקשה, יש להכנס לאתר</Typography>
            <Link href={link_to_source} target="_blank" rel="noopener">link</Link>
          </Box>
        </Box>
      )
      return {
        id: key.toString(),
        header: ` ${title} -  ₪${financial_reward.toLocaleString()}`,
        Content,
      }
    })
  }

  const panelsMap = {
    grant: getSectionPanels(results.Grant),
    automaticGrant: getSectionPanels(results.Automatic_Grant),
    voucher: getSectionPanels(results.Voucher),
  }

  const totalAmount = results?.total_amount ?? 0
  return { panelsMap, totalAmount }
}
