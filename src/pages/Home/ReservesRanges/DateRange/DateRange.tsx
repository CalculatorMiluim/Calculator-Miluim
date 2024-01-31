import React from 'react'
import { Box, Grid, MenuItem, TextField } from '@mui/material'
import { IFormikControllers } from '@/pages/Home/Home.module.ts'
import DateInput from '@/components/DateInput/DateInput.tsx'

interface IDateRange {
  startDateProps: IFormikControllers
  endDateProps: IFormikControllers
}

const DateRange: React.FC<IDateRange> = ({ startDateProps, endDateProps }) => {
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
          value={0}
          // onChange={(e) => setValue(e.target.value)}
          select
        >
          <MenuItem key={0} value={0}>
            צו 8
          </MenuItem>
          <MenuItem key={1} value={1}>
            תעסוקה מבצעית
          </MenuItem>
          <MenuItem key={2} value="test2">
            שמ"פ אחר
          </MenuItem>
        </TextField>
      </Grid>
    </>
  )
}

export default DateRange
