import React from 'react'
import { FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import DateRange from '@/pages/Home/ReservesRanges/DateRange/DateRange.tsx'

const ReservesRanges = () => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8} alignItems="center">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontWeight: 600 }}>
          כמות ימי מילואים שביצעת בשנת 2023:
        </Typography>
      </Grid>
      <Grid item xs={4} alignItems="center">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontWeight: 600 }}>
          סוג המילואים:
        </Typography>
      </Grid>
      <DateRange />
    </Grid>
  )
}

export default ReservesRanges
