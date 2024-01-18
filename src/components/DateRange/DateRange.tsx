import React from 'react'
import { Box, Stack } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import DateInput from '@/components/DateInput/DateInput.tsx'

const DateRange = () => {
  const { formik } = useHome()

  return (
    <Stack>
      <Box>
        <DateInput
          label="תאריך התחלה"
          value={formik.values.startDate}
          onChange={(date) => formik.setFieldValue('startDate', date || null).then()}
          name={'start'}
        />
        <DateInput
          label="תאריך סיום"
          value={formik.values.startDate}
          onChange={(date) => formik.setFieldValue('endDate', date || null).then()}
          name={'start'}
        />
      </Box>
    </Stack>
  )
}

export default DateRange
