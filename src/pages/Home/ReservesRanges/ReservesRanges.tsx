import React from 'react'
import { Grid, Typography, Box, MenuItem, TextField, TextFieldProps, InputAdornment, Button } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import { IHomeChoiceFormField } from '@/pages/Home/HomeChoiceFormField/HomeChoiceFormField.tsx'
import { HOME_OPTIONS_MAP } from '@/pages/Home/Home.consts.ts'
import { IFormikControllers } from '../Home.module'
import { DatePickerProps, MobileDatePicker, PickersDay } from '@mui/x-date-pickers'
import CalendarTodayIcon from '@/icons/calendar_today'
import dayjs from 'dayjs'
import PlusIcon from '@/icons/plus_icon'

interface IReservesRanges {
  startDateProps: IHomeChoiceFormField
  endDateProps: IHomeChoiceFormField
  startDateProps2: IHomeChoiceFormField
  endDateProps2: IHomeChoiceFormField
  startDateProps3: IHomeChoiceFormField
  endDateProps3: IHomeChoiceFormField
  recruitmentTypeProps: IHomeChoiceFormField
  recruitmentTypeProps2: IHomeChoiceFormField
  recruitmentTypeProps3: IHomeChoiceFormField
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


const ReservesRanges: React.FC<IReservesRanges> = ({ startDateProps, endDateProps, 
  startDateProps2, endDateProps2,
  startDateProps3, endDateProps3,
  recruitmentTypeProps, recruitmentTypeProps2, recruitmentTypeProps3 }) => {

  const startDatePropsController: IFormikControllers = startDateProps as IFormikControllers
  const endDatePropsController: IFormikControllers = endDateProps as IFormikControllers
  const startDatePropsController2: IFormikControllers = startDateProps2 as IFormikControllers
  const endDatePropsController2: IFormikControllers = endDateProps2 as IFormikControllers
  const startDatePropsController3: IFormikControllers = startDateProps3 as IFormikControllers
  const endDatePropsController3: IFormikControllers = endDateProps3 as IFormikControllers
  
  const recruitmentTypePropsController: IFormikControllers = recruitmentTypeProps as IFormikControllers
  const recruitmentTypePropsController2: IFormikControllers = recruitmentTypeProps2 as IFormikControllers
  const recruitmentTypePropsController3: IFormikControllers = recruitmentTypeProps3 as IFormikControllers

  const value = { start: startDatePropsController.selectedValues, end: endDatePropsController.selectedValues }
  const setValue = (newValue: DateRangePickerValueType | null) => {
    startDatePropsController.setSelectedValues(newValue?.start as Date)
    endDatePropsController.setSelectedValues(newValue?.end as Date)
  }

  const value2 = { start: startDatePropsController2.selectedValues, end: endDatePropsController2.selectedValues }
  const setValue2 = (newValue: DateRangePickerValueType | null) => {
    startDatePropsController2.setSelectedValues(newValue?.start as Date)
    endDatePropsController2.setSelectedValues(newValue?.end as Date)
  }

  const value3 = { start: startDatePropsController3.selectedValues, end: endDatePropsController3.selectedValues }
  const setValue3 = (newValue: DateRangePickerValueType | null) => {
    startDatePropsController3.setSelectedValues(newValue?.start as Date)
    endDatePropsController3.setSelectedValues(newValue?.end as Date)
  }

  const [showMoreDates, setShowMoreDates] = React.useState(false);

  const drawDateRangePicker = (value:any, setValue:any) => {
    return (
      <DateRangePicker
          value={value}
          onChange={(newValue) => {
            setValue(newValue as DateRangePickerValueType);
          }}
          renderInput={(params: TextFieldProps) => {
            let text = value?.start?.toLocaleDateString() + "-" + value?.end?.toLocaleDateString()
            if (value === null || value === undefined || value?.start === null || value?.end === null) {
              text = 'עוד תאריכים'
            }
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
    );
  };

  const drawRecruitmentType = (recruitmentTypePropsController: IFormikControllers) => {
    return (
      <Box display="flex">
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
    );
  }


  return (
    <Grid container spacing={2} alignItems="center">
      <Grid item xs={8} alignItems="center">
        <Typography variant="h6" sx={{ color: COLORS.BLACK, fontFamily: 'PolinBoldFont' }}>
          ימי מילואים:
        </Typography>
      </Grid>
      <Grid item xs={5} alignItems="center" className="recruitment-type" >
        <Typography variant="h6" sx={{
          color: COLORS.BLACK, fontFamily: 'PolinBoldFont', display: {
            sm: 'block'
          }
        }}>
          סוג:
        </Typography>
      </Grid>
      {/* first */}
      <Grid xs={7}>
        {drawDateRangePicker(value,setValue)}
      </Grid>
      <Grid xs={1}></Grid>
      <Grid xs={4}>
        {drawRecruitmentType(recruitmentTypePropsController)}
      </Grid>
      <Grid xs={12} sx={{mt:2, display: showMoreDates == true ? 'none': ''}}>
        <Button onClick={() => setShowMoreDates(true)}> עוד תאריכים <PlusIcon /></Button>
        
      </Grid>
      {/* second */}
      <Grid xs={7} sx={{mt:2, display: showMoreDates == true ? '': 'none'}}>
        {drawDateRangePicker(value2,setValue2)}
      </Grid>
      <Grid xs={1} sx={{mt:2, display: showMoreDates == true ? '': 'none'}}></Grid>
      <Grid xs={4} sx={{mt:2, display: showMoreDates == true ? '': 'none'}}>
        {drawRecruitmentType(recruitmentTypePropsController2)}
      </Grid>
      {/* third */}
      <Grid xs={7} sx={{mt:2, display: showMoreDates == true ? '': 'none'}}>
        {drawDateRangePicker(value3,setValue3)}
      </Grid>
      <Grid xs={1} sx={{mt:2, display: showMoreDates == true ? '': 'none'}}></Grid>
      <Grid xs={4} sx={{mt:2, display: showMoreDates == true ? '': 'none'}}>
        {drawRecruitmentType(recruitmentTypePropsController3)}
      </Grid>
    </Grid>
  )
}

export default ReservesRanges
