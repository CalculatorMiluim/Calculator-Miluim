import React from 'react'
import { Stack, Typography } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import { useAppDispatch } from '@/hooks/reduxHooks.ts'
import ReservesRanges from '@/pages/Home/ReservesRanges/ReservesRanges.tsx'
import { COLORS } from '@/consts/colors.ts'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'

const Home = () => {
  const { formik } = useHome()
  const dispatch = useAppDispatch()

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <Stack spacing={4} sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'start', width: '100%' }}>
        <ReservesRanges />
        <Stack>
          <Typography variant="h6" sx={{ color: COLORS.BLACK, fontWeight: 600 }}>
            האם בשירות מילואים פעיל?
          </Typography>
          <Typography>
            משרת מילואים פעיל הוא מי ששירת לפחות 20 ימי שמ"פ במהלך 3 שנים (או 14 ימים במהלך שנה או שנתיים צמודות למי
            שטרם מלאו 3 שנים לשחרורם)
          </Typography>
        </Stack>
        <ChoiceGroup
          multiSelect
          selectedValues={formik.values.isActiveReservist}
          setSelectedValues={(value) => {
            formik.setFieldValue('isActiveReservist', value)
          }}
          buttons={[
            { label: 'בדיקה 1', value: 21, endIcon: '⚔️' },
            { value: 100, label: 'בדיקה2', endIcon: '✅' },
          ]}
        />
      </Stack>
    </form>
  )
}

export default Home
