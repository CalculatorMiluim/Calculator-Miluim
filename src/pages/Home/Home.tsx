import React from 'react'
import { Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import ReservesRanges from '@/pages/Home/ReservesRanges/ReservesRanges.tsx'
import HomeChoiceFormField from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { COLORS } from '@/consts/colors.ts'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { useHome } from '@/pages/Home/Home.module.ts'
import { HOME_OPTIONS_MAP } from '@/pages/Home/Home.consts.ts'

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
    studentStatusProps,
    academicInstitutionProps,
    getIsFollowedUpQuestionSelected,
  } = useHome()
  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <Stack spacing={4} sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'start', width: '100%' }}>
        <ReservesRanges />
        <HomeChoiceFormField {...isActiveReservistProps} />
        <HomeChoiceFormField {...isCommanderProps} />
        <HomeChoiceFormField {...serviceTypeProps} />
        <HomeChoiceFormField {...familyStatusProps} />
        <HomeChoiceFormField
          {...partnerProps}
          showFollowUpQuestion={getIsFollowedUpQuestionSelected(
            partnerProps.dependsOnQuestion,
            partnerProps.dependsOnQuestionValue,
          )}
        />
        <HomeChoiceFormField {...isParentProps} />
        <HomeChoiceFormField
          {...childrenStatusProps}
          showFollowUpQuestion={getIsFollowedUpQuestionSelected(
            childrenStatusProps.dependsOnQuestion,
            childrenStatusProps.dependsOnQuestionValue,
          )}
        />
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
              סטודנט/ית?
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" sx={{ fontFamily: 'PolinBoldFont' }}>
              מוסד לימודים:
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <ChoiceGroup {...studentStatusProps} />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth
              value={formik.values.academicInstitution}
              name="academicInstitution"
              onChange={formik.handleChange}
              select
              disabled={getIsFollowedUpQuestionSelected(
                academicInstitutionProps.dependsOnQuestion,
                academicInstitutionProps.dependsOnQuestionValue,
              )}
            >
              {HOME_OPTIONS_MAP.academicInstitution.options?.map(({ value, label }) => (
                <MenuItem key={`${label}-${value}`} value={value as string}>
                  {label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <HomeChoiceFormField {...employmentStatusProps} />
        <HomeChoiceFormField
          {...businessStatusProps}
          showFollowUpQuestion={getIsFollowedUpQuestionSelected(
            businessStatusProps.dependsOnQuestion,
            businessStatusProps.dependsOnQuestionValue,
          )}
        />
        <HomeChoiceFormField {...propertyOwnershipStatusProps} />
        <Button
          sx={{
            minWidth: {
              xs: 150,
              md: 200,
            },
          }}
          type="submit"
          variant="contained"
          disabled={formik.isSubmitting}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%' }}>
            <Typography sx={{ pb: 0.4, fontFamily: 'PolinBoldFont' }} variant="h5">
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
