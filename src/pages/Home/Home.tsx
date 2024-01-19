import React from 'react'
import { Stack } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import { useAppDispatch } from '@/hooks/reduxHooks.ts'
import ReservesRanges from '@/pages/Home/ReservesRanges/ReservesRanges.tsx'
import HomeChoiceFormField from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'

const Home = () => {
  const { formik } = useHome()
  const dispatch = useAppDispatch()

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <Stack spacing={4} sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'start', width: '100%' }}>
        <ReservesRanges />
        <HomeChoiceFormField
          selectedValues={formik.values.isActiveReservist}
          setSelectedValues={(value) => {
            formik.setFieldValue('isActiveReservist', value)
          }}
          label="האם בשירות מילואים פעיל?"
          options={[
            { label: 'כן', value: 1, endIcon: '✅️' },
            { label: 'לא', value: 0, endIcon: '❌' },
          ]}
          subDescription={`משרת מילואים פעיל הוא מי ששירת לפחות 20 ימי שמ"פ במהלך 3 שנים (או 14 ימים במהלך שנה או שנתיים צמודות למי
          שטרם מלאו 3 שנים לשחרורם)`}
        />

        <HomeChoiceFormField
          selectedValues={formik.values.isCommander}
          setSelectedValues={(value) => {
            formik.setFieldValue('isCommander', value)
          }}
          label="האם מפקד/ת?"
          options={[
            { label: 'כן', value: 1, endIcon: '✅️' },
            { label: 'לא', value: 0, endIcon: '❌' },
          ]}
        />
      </Stack>
    </form>
  )
}

export default Home
