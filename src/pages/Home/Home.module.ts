import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { useGetResultsMutation } from '@/features/results/resultsApiSlice.ts'
import {
  ACADEMIC_INSTITUTION_VALUES,
  CHILDREN_VALUES,
  HOME_OPTIONS_MAP,
  validationSchema,
} from '@/pages/Home/Home.consts.ts'
import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { useNavigate } from 'react-router-dom'
import { RoutesValues } from '@/consts/routes.ts'

export const useHome = () => {
  const navigate = useNavigate()
  const [getResults, { isLoading, isError, data }] = useGetResultsMutation()

  const formik = useFormik({
    validationSchema,
    initialValues: {
      startDate: dayjs('2023-01-01'),
      endDate: dayjs('2024-01-01'),
      isActiveReservist: [] as boolean[],
      isCommander: [] as boolean[],
      serviceType: [] as string[],
      familyStatus: [] as string[],
      isParent: [] as boolean[],
      partner: [] as string[],
      studentStatus: [] as string[],
      employmentStatus: [] as string[],
      childrenStatus: [] as string[],
      academicInstitution: ACADEMIC_INSTITUTION_VALUES.TECHNION as string,
      businessStatus: [] as string[],
      propertyOwnershipStatus: [] as boolean[],
    },
    onSubmit: async (
      {
        propertyOwnershipStatus,
        businessStatus,
        employmentStatus,
        familyStatus,
        academicInstitution,
        studentStatus,
        endDate,
        isActiveReservist,
        isCommander,
        serviceType,
        partner,
        startDate,
        childrenStatus,
        isParent,
      },
      { setSubmitting },
    ) => {
      const results = await getResults({
        recruitment_dates: [
          {
            start_date: '2024-01-18',
            end_date: '2024-03-19',
            recruitment_type: 'אחר',
          },
        ],
        combat_level: serviceType[0],
        family_status: {
          partner: partner,
          children: {
            is_under_14: childrenStatus.includes(CHILDREN_VALUES.UNDER_14),
            is_special_needs: childrenStatus.includes(CHILDREN_VALUES.SPECIAL_NEEDS),
          },
        },
        student: studentStatus[0],
        academy: academicInstitution.toString(),
        employment_status: employmentStatus[0],
        business_size: businessStatus[0],
        property_owner: propertyOwnershipStatus[0],
        active_reservist: isActiveReservist[0],
      })
      setSubmitting(false)
      if ('data' in results) {
        navigate(RoutesValues.RESULTS)
      }
    },
  })

  const getFormikControllers = (fieldName: keyof typeof formik.values) => ({
    selectedValues: formik.values[fieldName],
    setSelectedValues: (value: any) => {
      formik.setFieldValue(fieldName, value)
    },
    error: formik.touched[fieldName] && !!formik.errors[fieldName],
    helperText: formik.touched[fieldName] ? formik.errors[fieldName] : undefined,
  })

  const getPropsForHomeField = (fieldName: keyof typeof formik.values): IHomeChoiceFormField =>
    ({
      ...getFormikControllers(fieldName),
      ...HOME_OPTIONS_MAP[fieldName],
    }) as IHomeChoiceFormField

  const isActiveReservistProps = getPropsForHomeField('isActiveReservist')
  const isCommanderProps = getPropsForHomeField('isCommander')
  const serviceTypeProps = getPropsForHomeField('serviceType')
  const familyStatusProps = getPropsForHomeField('familyStatus')
  const partnerProps = getPropsForHomeField('partner')
  const isParentProps = getPropsForHomeField('isParent')
  const childrenStatusProps = getPropsForHomeField('childrenStatus')
  const employmentStatusProps = getPropsForHomeField('employmentStatus')
  const businessStatusProps = getPropsForHomeField('businessStatus')
  const propertyOwnershipStatusProps = getPropsForHomeField('propertyOwnershipStatus')
  const studentStatusProps = getPropsForHomeField('studentStatus')

  return {
    formik,
    isError,
    isLoading,
    data,
    isActiveReservistProps,
    isCommanderProps,
    serviceTypeProps,
    familyStatusProps,
    partnerProps,
    isParentProps,
    childrenStatusProps,
    employmentStatusProps,
    businessStatusProps,
    propertyOwnershipStatusProps,
    studentStatusProps,
  }
}
