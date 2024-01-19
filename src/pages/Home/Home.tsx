import React from 'react'
import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import { useHome } from '@/pages/Home/Home.module.ts'
import ReservesRanges from '@/pages/Home/ReservesRanges/ReservesRanges.tsx'
import HomeChoiceFormField from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { COLORS } from '@/consts/colors.ts'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'

const Home = () => {
  const { formik } = useHome()

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

        <HomeChoiceFormField
          selectedValues={formik.values.serviceType}
          setSelectedValues={(value) => {
            formik.setFieldValue('serviceType', value)
          }}
          label="סוג שירות צבאי?"
          options={[
            { label: 'יחידה קרבית', value: 1, endIcon: '⚔️' },
            { label: 'יחידה עורפית', value: 0, endIcon: '🛠️️' },
          ]}
        />

        <HomeChoiceFormField
          selectedValues={formik.values.familyStatus}
          setSelectedValues={(value) => {
            formik.setFieldValue('familyStatus', value)
          }}
          label="מצב משפחתי?"
          options={[
            { label: 'אין לי בן/בת זוג', value: 0 },
            { label: 'יש לי בן/בת זוג', value: 1 },
          ]}
        />

        <HomeChoiceFormField
          isFollowUpQuestion
          multiSelect
          selectedValues={formik.values.partner}
          setSelectedValues={(value) => {
            formik.setFieldValue('partner', value)
          }}
          label="אז לגבי בן/בת הזוג שלך..."
          options={[
            { label: 'הם זכאים לדמי אבטלה', value: 0 },
            { label: 'הם שכירים', value: 1 },
            { label: 'הם עצמאים', value: 2 },
            { label: 'הם בחל"ת', value: 3 },
            { label: 'אחר', value: 4 },
          ]}
        />

        <HomeChoiceFormField
          selectedValues={formik.values.isParent}
          setSelectedValues={(value) => {
            formik.setFieldValue('isParent', value)
          }}
          label="מצב משפחתי?"
          options={[
            { label: 'אין לי ילדים', value: 0, endIcon: '👻' },
            { label: 'הורה לילד', value: 1, endIcon: '👼' },
          ]}
        />

        <HomeChoiceFormField
          multiSelect
          isFollowUpQuestion
          selectedValues={formik.values.childrenStatus}
          setSelectedValues={(value) => {
            formik.setFieldValue('childrenStatus', value)
          }}
          label="אז לגבי הילדים..."
          options={[
            { label: 'יש לי ילד עד גיל 14', value: 0 },
            { label: 'יש לי ילד עם צרכים מיוחדים​', value: 1 },
            { label: 'אף אחת מהאופציות', value: 2 },
          ]}
        />

        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ color: COLORS.BLACK, fontWeight: 600 }}>
              האם סטודנט/ית בשנת הלימודים תשפ"ד?
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" sx={{ color: COLORS.PRIMARY, fontWeight: 600 }}>
              מוסד לימודים:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <ChoiceGroup
              selectedValues={formik.values.studentStatus}
              setSelectedValues={(value) => {
                formik.setFieldValue('studentStatus', value)
              }}
              options={[
                { label: 'כן', value: 1, endIcon: '👩‍🎓' },
                { label: 'לא', value: 0, endIcon: '🙅‍' },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={formik.values.academicInstitution}
              name="academicInstitution"
              onChange={formik.handleChange}
              select
            >
              <MenuItem key={0} value={0}>
                טכניון
              </MenuItem>
              <MenuItem key={1} value={1}>
                אונ’ בן גוריון
              </MenuItem>
              <MenuItem key={2} value="test2">
                אונ’ תל אביב
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>

        <HomeChoiceFormField
          multiSelect
          selectedValues={formik.values.employmentStatus}
          setSelectedValues={(value) => {
            formik.setFieldValue('employmentStatus', value)
          }}
          label="מה מצבך התעסוקתי?"
          options={[
            { label: 'אני עצמאי/ת', value: 0 },
            { label: 'אני שכיר/ה', value: 1 },
            { label: 'זכאי/ת לדמי אבטלה', value: 2 },
            { label: 'אני בחל"ת', value: 3 },
            { label: 'אחר', value: 4 },
          ]}
        />

        <HomeChoiceFormField
          columns
          multiSelect
          isFollowUpQuestion
          selectedValues={formik.values.businessStatus}
          setSelectedValues={(value) => {
            formik.setFieldValue('businessStatus', value)
          }}
          label="לגבי העסק שלך..."
          options={[
            { label: 'עסק קטן (5-20 עובדים, מחזור מכירות עד 20 מיליון ₪ בשנה)', value: 0 },
            { label: 'מעל 20 עובדים, מחזור מכירות יותר מ20 מיליון ₪ בשנה', value: 1 },
          ]}
        />

        <HomeChoiceFormField
          selectedValues={formik.values.propertyOwnershipStatus}
          setSelectedValues={(value) => {
            formik.setFieldValue('propertyOwnershipStatus', value)
          }}
          label="האם בבעלותך נכס?"
          options={[
            { label: 'כן', value: 0, endIcon: '🏠' },
            { label: 'לא', value: 1, endIcon: '🏝️' },
          ]}
        />

        <Button sx={{ width: '20%' }} type="submit" variant="contained">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Typography sx={{ pb: 0.4, fontWeight: 'bold' }} variant="h5">
              ש-גר
            </Typography>
            <ArrowCircleLeftIcon />
          </Box>
        </Button>
      </Stack>
    </form>
  )
}

export default Home
