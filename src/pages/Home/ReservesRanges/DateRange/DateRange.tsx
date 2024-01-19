import React from 'react'
import { Box } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import DateInput from '@/components/DateInput/DateInput.tsx'
import { Dayjs } from 'dayjs'

const DateRange = () => {
  const { formik } = useHome()

  return (
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
        value={formik.values.startDate}
        //@ts-ignore
        onChange={(date: Dayjs) => formik.setFieldValue('endDate', date || null)}
        name={'start'}
      />
    </Box>
  )
}

export default DateRange
