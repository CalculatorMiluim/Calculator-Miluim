import React from 'react'
import Button from '@mui/material/Button'
import { Box } from '@mui/material'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

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
      startIcon={<ResolvedSelectedIcon fontSize="large" />}
      sx={{ borderRadius: 2 }}
      onClick={onClick}
    >
      {label}
    </Button>
  )
}

export default ChoiceButton
