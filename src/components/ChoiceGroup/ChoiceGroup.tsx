import React from 'react'
import { IChoiceGroup } from '@/components/ChoiceGroup/ChoiceGroup.module.ts'
import { Box } from '@mui/material'
import ChoiceButton from '@/components/ChoiceGroup/ChoiceButton/ChoiceButton.tsx'

const ChoiceGroup: React.FC<IChoiceGroup> = ({ multiSelect, options, setSelectedValues, selectedValues, columns }) => {
  const handleMultiSelectClick = (value: string | number) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((existingValue) => existingValue !== value))
      return
    }

    setSelectedValues([...selectedValues, value])
  }
  const onClickButton = (value: string | number) => {
    multiSelect ? handleMultiSelectClick(value) : setSelectedValues([value])
  }

  const flexDirection = columns ? 'column' : 'row'

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
