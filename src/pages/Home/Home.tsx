import React, { useEffect } from 'react'
import { Autocomplete, Box, Button, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material'
import ReservesRanges from '@/pages/Home/ReservesRanges/ReservesRanges.tsx'
import HomeChoiceFormField from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { COLORS } from '@/consts/colors.ts'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft'
import { useHome } from '@/pages/Home/Home.module.ts'
import { HOME_OPTIONS_MAP } from '@/pages/Home/Home.consts.ts'
import { useGetLocationResultsMutation } from '@/features/location/locationApiSlice'
import { ICity, ILocationResponse } from '@/types/location.types'

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
    startDateProps,
    startDateProps2,
    startDateProps3,
    endDateProps,
    endDateProps2,
    endDateProps3,
    recruitmentTypeProps,
    recruitmentTypeProps2,
    recruitmentTypeProps3,
    locationProps,
    getIsFollowedUpQuestionSelected,
  } = useHome()

  const [locationOptions, setLocationOptions] = React.useState<ICity[]>([]);
  const [getLocationResults, { isLoading, isError, data }] = useGetLocationResultsMutation()
  
  useEffect(() => {
    const el = document.querySelector('.Mui-error, [data-error]');
    (el?.parentElement ?? el)?.scrollIntoView();
    // scroll 90px up
    window.scrollBy(0, -90);
  }, [formik.isSubmitting])

  const searchLocation = async (value:string) => {
    console.log(value)
    if (value.length > 2) {
      // search
      // if (value.startsWith('dan')) {
      //   setLocationOptions(['dan1', 'dan2', 'dan3'])
      // } else {
      //   setLocationOptions([])
      // }
      const results = await getLocationResults({text: value})
      setLocationOptions(results.data?.locations ?? []);
    } else {
      setLocationOptions([]);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} style={{ display: 'flex', width: '100%' }}>
      <Stack spacing={4} sx={{ display: 'flex', alignItems: 'flex-start', textAlign: 'start', width: '100%' }}>
        <ReservesRanges
          startDateProps={startDateProps}
          endDateProps={endDateProps}
          startDateProps2={startDateProps2}
          endDateProps2={endDateProps2}
          startDateProps3={startDateProps3}
          endDateProps3={endDateProps3}
          recruitmentTypeProps={recruitmentTypeProps}
          recruitmentTypeProps2={recruitmentTypeProps2}
          recruitmentTypeProps3={recruitmentTypeProps3}
        />
        
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
            <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont', marginBottom: 2 }}>
              סטודנט/ית?
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h6" sx={{ fontFamily: 'PolinBoldFont', marginBottom: 2 }}>
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
        

        <Grid item xs={8}>
            <Typography variant="h6" sx={{ fontFamily: 'PolinBoldFont', marginBottom: 0 }}>
              location title
            </Typography>
          </Grid>
        {/* <TextField
              sx={{
                width:'300px'
              }}
              value={formik.values.location}
              name="location"
              onChange={formik.handleChange}
              select
            >
              {HOME_OPTIONS_MAP.location.options?.map(({ value, label }) => (
                <MenuItem key={`${label}-${value}`} value={value as string}>
                  {label}
                </MenuItem>
              ))}
            </TextField> */}

          <Autocomplete
          sx={{
            width:'300px'
          }}
            options={locationOptions}
            autoComplete
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Autocomplete Field"
                value={formik.values.location}
                onChange={formik.handleChange}
              />
            )}
            onInputChange={(event, value) => {
              searchLocation(value)
            }}
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.name}
              </Box>
            )}

          />

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
