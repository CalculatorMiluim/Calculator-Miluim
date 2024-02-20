import React from 'react'
import { Grid, Typography, Box, MenuItem, TextField, TextFieldProps, InputAdornment } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { HOME_OPTIONS_MAP } from '@/pages/Home/Home.consts.ts'
import { IFormikControllers } from '../Home.module'
import { DatePickerProps, MobileDatePicker, PickersDay } from '@mui/x-date-pickers'
import CalendarTodayIcon from '@/icons/calendar_today'
import dayjs from 'dayjs'
import { as } from 'vitest/dist/reporters-5f784f42.js'

interface IReservesRanges {
  startDateProps: IHomeChoiceFormField
  endDateProps: IHomeChoiceFormField
  recruitmentTypeProps: IHomeChoiceFormField
}


type DateRangePickerValueType = {
  start: unknown;
  end: unknown;
};

interface DateRangePickerProps
  extends Omit<DatePickerProps<unknown, unknown>, 'value'> {
  value: DateRangePickerValueType | null;
}

const DateRangePicker = (props: DateRangePickerProps) => {
  const { value, onChange, ...rest } = props;
  const [startDate, setStartDate] = React.useState<dayjs.Dayjs | null>(null);
  const [endDate, setEndDate] = React.useState<dayjs.Dayjs | null>(null);

  return (

    <MobileDatePicker
      showToolbar={false}
      value={value}
      onChange={(date: any) => {
        if (date === null) {
          return;
        }
        if (startDate === null || (startDate !== null && endDate !== null)) {
          setStartDate(date);
          setEndDate(null);
          return;
        }
        setEndDate(date);
      }}
      onClose={() => {
        if (startDate === undefined || endDate === undefined || startDate === null || endDate === null) {
          return;
        }
        // eslint-disable-next-line
        onChange({ start: startDate.toDate(), end: endDate.toDate() });
      }}
      closeOnSelect={false}
      renderDay={(day, _value, DayComponentProps) => {
        //alert (typeof endDate);
        const dayDate = day as dayjs.Dayjs;
        const isSelected =  startDate!=null && endDate!=null && dayDate.isAfter(startDate) && dayDate.isBefore(endDate?.add(1,'days'));
        if (isSelected) {
          return (<PickersDay {...DayComponentProps} sx={{ backgroundColor:'#4585FD', '&:focus': {
            backgroundColor:'#4585FD'
          } }} />)
        } else {
          return (<PickersDay {...DayComponentProps} />)
        }
      }}
      {...rest}
    />

  );
};


const ReservesRanges: React.FC<IReservesRanges> = ({ startDateProps, endDateProps, recruitmentTypeProps }) => {

  const startDatePropsController: IFormikControllers = startDateProps as IFormikControllers
  const endDatePropsController: IFormikControllers = endDateProps as IFormikControllers
  const recruitmentTypePropsController: IFormikControllers = recruitmentTypeProps as IFormikControllers

  // const [value, setValue] = React.useState<DateRangePickerValueType | null>(
  //   null
  // );
  const value = { start: startDatePropsController.selectedValues, end: endDatePropsController.selectedValues }
  const setValue = (newValue: DateRangePickerValueType | null) => {
    startDatePropsController.setSelectedValues(newValue?.start as Date)
    endDatePropsController.setSelectedValues(newValue?.end as Date)
  }

  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8} alignItems="center">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
          ימי מילואים:
        </Typography>
      </Grid>
      <Grid item xs={4} alignItems="center" className="recruitment-type" >
        <Typography variant="h6" sx={{
          color: COLORS.BLACK, fontFamily: 'PolinBoldFont', display: {
            xs: 'none', sm: 'block'
          }
        }}>
          סוג:
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue as DateRangePickerValueType);
          }}
          renderInput={(params: TextFieldProps) => {
            const text = value?.start?.toLocaleDateString() + "-" + value?.end?.toLocaleDateString()
            return (
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CalendarTodayIcon />
                    </InputAdornment>
                  ),
                  readOnly: true,
                }}
                onClick={params.onClick}
                
                value={text} />
            )
          }
          }

        />
      </Grid>

      <Grid item xs={12} sm={4} sx={{ mt: 1, pr: 0 }} className="recruitment-type">
        <Box display="flex">
          <Typography variant="h6" sx={{
            color: COLORS.BLACK, fontFamily: 'PolinBoldFont', mr: 1, display: {
              xs: 'block', sm: 'none', alignSelf: 'center'
            }
          }}>
            סוג:
          </Typography>
          <TextField
            fullWidth
            value={recruitmentTypePropsController.selectedValues}
            onChange={(e) => recruitmentTypePropsController.setSelectedValues(e.target.value)}
            select
          >
            {HOME_OPTIONS_MAP.recruitmentType.options?.map(({ value, label }) => (
              <MenuItem key={`${label}-${value}`} value={value as string}>
                {label}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ReservesRanges
