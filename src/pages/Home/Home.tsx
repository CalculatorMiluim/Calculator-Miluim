import React from 'react'
import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import ReservesRanges from '@/pages/Home/ReservesRanges/ReservesRanges.tsx'
import HomeChoiceFormField from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { COLORS } from '@/consts/colors.ts'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { useHome } from '@/pages/Home/Home.module.ts'

const Home = () => {
  const {
    formik,
    isActiveReservistProps,
    propertyOwnershipStatusProps,
    businessStatusProps,
    childrenStatusProps,
    employmentStatusProps,
    familyStatusProps,
    isCommanderProps,
    serviceTypeProps,
    partnerProps,
    isParentProps,
  } = useHome()

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <Stack spacing={4} sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'start', width: '100%' }}>
        <ReservesRanges />
        <HomeChoiceFormField {...isActiveReservistProps} />
        <HomeChoiceFormField {...isCommanderProps} />
        <HomeChoiceFormField {...serviceTypeProps} />
        <HomeChoiceFormField {...familyStatusProps} />
        <HomeChoiceFormField {...partnerProps} />
        <HomeChoiceFormField {...isParentProps} />
        <HomeChoiceFormField {...childrenStatusProps} />

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

        <HomeChoiceFormField {...employmentStatusProps} />
        <HomeChoiceFormField {...businessStatusProps} />
        <HomeChoiceFormField {...propertyOwnershipStatusProps} />

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
