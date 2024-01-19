import { useFormik } from 'formik'
import dayjs from 'dayjs'
import { useGetResultsMutation } from '@/features/results/resultsApiSlice.ts'

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
      academicInstitution: 0,
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
            is_under_14: true,
            is_special_needs: true,
          },
        },
        academy: 'הטכניון',
        employment_status: 'אחר',
        business_size: null,
        property_owner: true,
        active_reservist: true,
      })
    },
  })

  return { formik: formik }
}
