import React from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import DateInput from '@/components/DateInput/DateInput.tsx'
import { Dayjs } from 'dayjs'

const DateRange = () => {
  const { formik } = useHome()

  return (
    <>
      <Grid item xs={8}>
        <Box sx={{ display: 'flex', columnGap: 2 }}>
          <DateInput
            label="תאריך התחלה"
            value={formik.values.startDate}
            //@ts-ignore
            onChange={(date: Dayjs) => formik.setFieldValue('startDate', date || null)}
            name={'start'}
          />
          <DateInput
            label="תאריך סיום"
            value={formik.values.endDate}
            //@ts-ignore
            onChange={(date: Dayjs) => formik.setFieldValue('endDate', date || null)}
            name={'start'}
          />
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ mt: 1 }}>
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
