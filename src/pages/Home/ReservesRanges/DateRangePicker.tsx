import React from 'react'
import { DatePickerProps, MobileDatePicker, PickersDay } from '@mui/x-date-pickers'
import dayjs from 'dayjs'

export type DateRangePickerValueType = {
    start: unknown;
    end: unknown;
  };

interface DateRangePickerProps
  extends Omit<DatePickerProps<unknown, unknown>, 'value'> {
  value: DateRangePickerValueType | null;
}

export const DateRangePicker = (props: DateRangePickerProps) => {
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
          } else if (startDate > date) {
            setEndDate(startDate);
            setStartDate(date);
          } else {
            setEndDate(date) 
          }
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
          const dayDate = day as dayjs.Dayjs;
          let isSelected =  startDate!=null && endDate!=null && dayDate.isAfter(startDate) && dayDate.isBefore(endDate?.add(1,'days'));
          isSelected = isSelected || (startDate!=null && dayDate.isSame(startDate));
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
