import React from 'react'
import { Box, InputAdornment, TextField } from '@mui/material'
import { grey } from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import { MobileDatePicker } from '@mui/x-date-pickers'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'
import { Dayjs } from 'dayjs'

interface IDateInput {
  label: string
  onChange: (date: Date | null, _?: string) => void
  value: Dayjs
  name: string
  error?: boolean
  disabled: boolean
  helperText: string
}

const DateInput: React.FC<IDateInput> = ({ label, onChange, value, name, error, disabled, helperText }) => {
  return (
    <Box sx={{ display: 'inline-flex', position: 'relative', top: '5px', alignItems: 'center', gap: 1 }}>
      <Typography gutterBottom color={grey[600]}>
        {label}
      </Typography>
      <MobileDatePicker
        inputFormat="DD/MM/YYYY"
        onChange={onChange}
        value={value}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            error={error}
            name={name}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <InsertInvitationIcon />
                </InputAdornment>
              ),
            }}
          />
        )}
      />
    </Box>
  )
}

export default DateInput
