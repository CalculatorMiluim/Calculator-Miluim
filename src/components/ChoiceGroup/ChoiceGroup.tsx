import React from 'react'
import { IChoiceGroup, useChoiceGroup } from '@/components/ChoiceGroup/ChoiceGroup.module.ts'
import { Box } from '@mui/material'
import ChoiceButton from '@/components/ChoiceGroup/ChoiceButton/ChoiceButton.tsx'

const ChoiceGroup: React.FC<IChoiceGroup> = ({ multiSelect, options, setSelectedValues, selectedValues, columns }) => {
  const { onClickButton, flexDirection } = useChoiceGroup(selectedValues, setSelectedValues, multiSelect)

  return (
    <Box sx={{ display: 'flex', gap: 2, flexDirection }}>
      {options.map(({ label, endIcon, value }) => (
        <ChoiceButton
          multiSelect={multiSelect}
          label={label}
          endIcon={endIcon}
          key={`${label}-${value}`}
          onClick={() => onClickButton(value)}
          checked={selectedValues.includes(value)}
        />
      ))}
    </Box>
  )
}

export default ChoiceGroup
