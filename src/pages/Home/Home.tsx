import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import { useAppDispatch } from '@/hooks/reduxHooks.ts'
import DateRange from '@/components/DateRange/DateRange.tsx'
import { COLORS } from '@/consts/colors.ts'

const Home = () => {
  const { formik } = useHome()
  const dispatch = useAppDispatch()

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex' }}>
      <Stack sx={{ display: 'flex' }}>
        <Box>
          <Typography sx={{ color: COLORS.BLACK, fontWeight: 600, textAlign: 'left' }}>
            כמות ימי מילואים שביצעת בשנת 2023:
          </Typography>
          <DateRange />
        </Box>
        <Box>
          <Typography sx={{ color: COLORS.BLACK, fontWeight: 600, textAlign: 'left' }}>בתפקיד:</Typography>
        </Box>
      </Stack>
    </form>
  )
}

export default Home
