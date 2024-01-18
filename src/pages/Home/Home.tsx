import React from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import { useAppDispatch } from '@/hooks/reduxHooks.ts'
import DateRange from '@/components/DateRange/DateRange.tsx'
import { COLORS } from '@/consts/colors.ts'

const Home = () => {
  const { formik } = useHome()
  const dispatch = useAppDispatch()

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <Stack sx={{ display: 'flex', justifyContent: 'stretch', textAlign: 'start', width: '100%' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={8} alignItems="center">
            <Typography sx={{ color: COLORS.BLACK, fontWeight: 600 }}>כמות ימי מילואים שביצעת בשנת 2023:</Typography>
            <DateRange />
          </Grid>
          <Grid item xs={4} alignItems="center">
            <Typography sx={{ color: COLORS.BLACK, fontWeight: 600, mb: 2 }}>בתפקיד:</Typography>
            <FormControl fullWidth>
              <InputLabel>Age</InputLabel>
              <Select value={10} label="Age" onChange={() => {}}>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Stack>
    </form>
  )
}

export default Home
