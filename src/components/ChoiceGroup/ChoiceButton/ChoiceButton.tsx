import React from 'react'
import Button from '@mui/material/Button'
import { Box, Typography } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { COLORS } from '@/consts/colors.ts'
import { grey } from '@mui/material/colors'

interface IChoiceButton {
  checked?: boolean
  label: string
  multiSelect?: boolean
  endIcon?: string
  onClick: () => void
}

const ChoiceButton: React.FC<IChoiceButton> = ({ label, endIcon, checked = false, multiSelect = false, onClick }) => {
  const ResolvedSelectedIcon = multiSelect
    ? checked
      ? CheckBoxIcon
      : CheckBoxOutlineBlankIcon
    : checked
      ? CheckCircleIcon
      : RadioButtonUncheckedIcon

  return (
    <Button
      variant="outlined"
      endIcon={<Box>{endIcon}</Box>}
      startIcon={<ResolvedSelectedIcon fontSize="large" sx={{ fill: checked ? COLORS.PRIMARY : grey[600] }} />}
      sx={{ borderRadius: 2 }}
      onClick={onClick}
    >
      <Typography sx={{ pb: 0.5, color: checked ? COLORS.PRIMARY : COLORS.BLACK }}>{label}</Typography>
    </Button>
  )
}

export default ChoiceButton
