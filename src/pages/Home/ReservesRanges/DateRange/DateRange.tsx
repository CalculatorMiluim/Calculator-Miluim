import React from 'react'
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material'
import { IFormikControllers } from '@/pages/Home/Home.module.ts'
import DateInput from '@/components/DateInput/DateInput.tsx'
import { HOME_OPTIONS_MAP } from '@/pages/Home/Home.consts.ts'
import { COLORS } from '@/consts/colors'

interface IDateRange {
  startDateProps: IFormikControllers
  endDateProps: IFormikControllers
  recruitmentTypeProps: IFormikControllers
}

const DateRange: React.FC<IDateRange> = ({ startDateProps, endDateProps, recruitmentTypeProps }) => {
  return (
    <>
      <Grid item xs={12} sm={4}>
       
          <DateInput
            label="התחלה"
            value={startDateProps.selectedValues}
            onChange={(date: Date | null) => {
              startDateProps.setSelectedValues(date)
            }}
            name={'startDate'}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DateInput
            label="סיום"
            value={endDateProps.selectedValues}
            onChange={(date: Date | null) => {
              endDateProps.setSelectedValues(date)
            }}
            name={'endDate'}
          />
        
      </Grid>
      <Grid item xs={12} sm={4} sx={{ mt: 1, pr:0 }} className="recruitment-type">
        <Box display="flex">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont', mr: 1, display: {
            xs: 'block', sm: 'none', alignSelf: 'center'
          } }}>
            סוג:
          </Typography>
        <TextField
          fullWidth
          value={recruitmentTypeProps.selectedValues}
          onChange={(e) => recruitmentTypeProps.setSelectedValues(e.target.value)}
          select
        >
          {HOME_OPTIONS_MAP.recruitmentType.options?.map(({ value, label }) => (
            <MenuItem key={`${label}-${value}`} value={value as string}>
              {label}
            </MenuItem>
          ))}
        </TextField>
        </Box>
      </Grid>
    </>
  )
}

export default DateRange
