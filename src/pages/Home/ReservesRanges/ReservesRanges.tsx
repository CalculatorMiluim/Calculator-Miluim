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
          בתפקיד:
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <DateRange />
      </Grid>
      <Grid item xs={4} sx={{ mt: 1 }}>
        <FormControl fullWidth>
          <InputLabel>Age</InputLabel>
          <Select value={10} label="Age" onChange={() => {}}>
            <MenuItem value={10}>Ten</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}

export default ReservesRanges
