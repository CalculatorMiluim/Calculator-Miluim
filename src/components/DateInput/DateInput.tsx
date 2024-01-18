import React from 'react'
import {Box, InputAdornment, TextField} from '@mui/material'
import {grey} from '@mui/material/colors'
import Typography from '@mui/material/Typography'
import {IDateFieldInputProps} from '@/types/forms.types.ts'
import {MobileDatePicker} from '@mui/x-date-pickers'
import InsertInvitationIcon from '@mui/icons-material/InsertInvitation'

const DateInput: React.FC<IDateFieldInputProps> = ({
                                                       label,
                                                       onChange,
                                                       value,
                                                       name,
                                                       error,
                                                       disabled,
                                                       helperText,
                                                   }) => {
    return (
        <Box sx={{display: 'inline-flex', position: 'relative', top: '5px'}}>
            <Typography gutterBottom
                        color={grey[600]}
                        sx={{position: 'relative', top: '20px', paddingRight: '10px', paddingLeft: '10px'}}>
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
                                    <InsertInvitationIcon/>
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