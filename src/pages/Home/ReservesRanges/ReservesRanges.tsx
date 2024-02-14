import React from 'react'
import { Grid, Typography } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import DateRange from '@/pages/Home/ReservesRanges/DateRange/DateRange.tsx'
import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'

interface IReservesRanges {
  startDateProps: IHomeChoiceFormField
  endDateProps: IHomeChoiceFormField
  recruitmentTypeProps: IHomeChoiceFormField
}

const ReservesRanges: React.FC<IReservesRanges> = ({ startDateProps, endDateProps, recruitmentTypeProps }) => {
  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8} alignItems="center">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
          ימי מילואים:
        </Typography>
      </Grid>
      <Grid item xs={4} alignItems="center" className="recruitment-type">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
          סוג:
        </Typography>
      </Grid>
      <DateRange
        startDateProps={startDateProps}
        endDateProps={endDateProps}
        recruitmentTypeProps={recruitmentTypeProps}
      />
    </Grid>
  )
}

export default ReservesRanges
