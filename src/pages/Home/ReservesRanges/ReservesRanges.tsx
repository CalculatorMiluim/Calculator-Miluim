import React from 'react'
import { Grid, Typography } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import DateRange from '@/pages/Home/ReservesRanges/DateRange/DateRange.tsx'

const ReservesRanges = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8} alignItems="center">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
          ימי מילואים:
        </Typography>
      </Grid>
      <Grid item xs={4} alignItems="center" sx={{ flexBasis: '30%' }}>
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
          סוג:
        </Typography>
      </Grid>
      <DateRange />
    </Grid>
  )
}

export default ReservesRanges
