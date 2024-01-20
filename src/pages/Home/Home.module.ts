import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { useGetResultsMutation } from '@/features/results/resultsApiSlice.ts'
import { CHILDREN_VALUES } from '@/pages/Home/Home.consts.ts'

export const useHome = () => {
  const [getResults, { isLoading, isError, data }] = useGetResultsMutation()

  const formik = useFormik({
    initialValues: {
      startDate: dayjs('2023-01-01'),
      endDate: dayjs('2024-01-01'),
      isActiveReservist: [] as any[],
      isCommander: [] as any[],
      serviceType: [] as any[],
      familyStatus: [] as any[],
      isParent: [] as any[],
      partner: [] as any[],
      studentStatus: [] as any[],
      employmentStatus: [] as any[],
      childrenStatus: [] as any[],
      academicInstitution: 0 as string | number,
      businessStatus: [] as any[],
      propertyOwnershipStatus: [] as any[],
    },
    onSubmit: ({
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
    }) => {
      getResults({
        recruitment_dates: [
          {
            start_date: '2024-01-18',
            end_date: '2024-03-19',
            recruitment_type: 'אחר',
          },
        ],
        combat_level: serviceType[0],
        family_status: {
          partner: partner[0],
          children: {
            is_under_14: childrenStatus.includes(CHILDREN_VALUES.UNDER_14),
            is_special_needs: childrenStatus.includes(CHILDREN_VALUES.SPECIAL_NEEDS),
          },
        },
        student: studentStatus[0],
        academy: academicInstitution.toString(),
        employment_status: employmentStatus[0],
        business_size: businessStatus[0],
        property_owner: !!propertyOwnershipStatus[0],
        active_reservist: !!isActiveReservist[0],
      })
    },
  })

  return { formik, isError, isLoading, data }
}
