import React from 'react'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { IFormikControllers } from '@/pages/Home/Home.module.ts'
import DateInput from '@/components/DateInput/DateInput.tsx'
import { HOME_OPTIONS_MAP } from '@/pages/Home/Home.consts.ts'

interface IDateRange {
  startDateProps: IFormikControllers
  endDateProps: IFormikControllers
  recruitmentTypeProps: IFormikControllers
}

const DateRange: React.FC<IDateRange> = ({ startDateProps, endDateProps, recruitmentTypeProps }) => {
  return (
    <>
      <Grid item xs={8}>
        <Box sx={{ display: 'flex', columnGap: 2 }}>
          <DateInput
            label="התחלה"
            value={startDateProps.selectedValues}
            onChange={(date: Date | null) => {
              startDateProps.setSelectedValues(date)
            }}
            name={'startDate'}
          />
          <DateInput
            label="סיום"
            value={endDateProps.selectedValues}
            onChange={(date: Date | null) => {
              endDateProps.setSelectedValues(date)
            }}
            name={'endDate'}
          />
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ mt: 1 }} className="recruitment-type">
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
      </Grid>
    </>
  )
}

export default DateRange
