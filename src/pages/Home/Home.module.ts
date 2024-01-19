import { useFormik } from 'formik'
import dayjs from 'dayjs'

export const useHome = () => {
  const formik = useFormik({
    initialValues: {
      startDate: dayjs('2023-01-01'),
      endDate: dayjs('2024-01-01'),
      isActiveReservist: [],
      isCommander: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  return { formik: formik }
}
