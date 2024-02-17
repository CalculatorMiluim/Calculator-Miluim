import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { useGetResultsMutation } from '@/features/results/resultsApiSlice.ts'
import {
  ACADEMIC_INSTITUTION_VALUES,
  RECRUITMENT_TYPE_VALUES,
  CHILDREN_VALUES,
  HOME_OPTIONS_MAP,
  validationSchema,
} from '@/pages/Home/Home.consts.ts'
import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { useNavigate } from 'react-router-dom'
import { RoutesValues } from '@/consts/routes.ts'

export interface IFormikControllers {
  selectedValues: any
  setSelectedValues: (value: any) => void
  error?: boolean
  helperText?: string
}

export const useHome = () => {
  const navigate = useNavigate()
  const [getResults, { isLoading, isError, data }] = useGetResultsMutation()

  const formik = useFormik({
    validationSchema,
    initialValues: {
      startDate: new Date('2023-10-07'),
      endDate: new Date(),
      recruitmentType: RECRUITMENT_TYPE_VALUES.TZAV_8 as string,
      isActiveReservist: [] as boolean[],
      isCommander: [] as boolean[],
      serviceType: [] as string[],
      familyStatus: [] as boolean[],
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
        recruitmentType,
      },
      { setSubmitting },
    ) => {
      const results = await getResults({
        recruitment_dates: [
          {
            start_date: dayjs(startDate).format('YYYY-MM-DD'),
            end_date: dayjs(endDate).format('YYYY-MM-DD'),
            recruitment_type: recruitmentType,
          },
        ],
        combat_level: serviceType[0],
        is_commander: isCommander[0],
        family_status: {
          partner: partner[0] ? { employment_status: partner[0] } : null,
          children: {
            is_under_14: childrenStatus.includes(CHILDREN_VALUES.UNDER_14),
            is_special_needs: childrenStatus.includes(CHILDREN_VALUES.SPECIAL_NEEDS),
          },
        },
        student: studentStatus[0],
        academy: studentStatus[0] ? academicInstitution.toString() : null,
        employment_status: employmentStatus[0],
        business_size: businessStatus[0] || null,
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
  const academicInstitutionProps = getPropsForHomeField('academicInstitution')
  const startDateProps = getPropsForHomeField('startDate')
  const endDateProps = getPropsForHomeField('endDate')
  const recruitmentTypeProps = getPropsForHomeField('recruitmentType')

  const getIsFollowedUpQuestionSelected = (
    fieldName: string | undefined,
    value: boolean | string | undefined | Array<boolean|undefined>,
  ): boolean => {
    // if value is array we need to check if the value is included in the array
    if (Array.isArray(value)) {
      // @ts-ignore
      return fieldName && value.includes(formik.values[fieldName][0])
    }
    // @ts-ignore
    return fieldName && formik.values[fieldName][0] === value
  }

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
    academicInstitutionProps,
    startDateProps,
    endDateProps,
    recruitmentTypeProps,
    getIsFollowedUpQuestionSelected,
  }
}
