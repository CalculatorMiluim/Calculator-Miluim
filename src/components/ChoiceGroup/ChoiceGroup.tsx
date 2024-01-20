import React from 'react'
import { IChoiceGroup, useChoiceGroup } from '@/components/ChoiceGroup/ChoiceGroup.module.ts'
import { Box, FormHelperText, Stack, Typography } from '@mui/material'
import ChoiceButton from '@/components/ChoiceGroup/ChoiceButton/ChoiceButton.tsx'
import ChildrenGuard from '@/components/Guards/ChildrenGuard/ChildrenGuard.tsx'

const ChoiceGroup: React.FC<IChoiceGroup> = ({
  multiSelect,
  options,
  setSelectedValues,
  selectedValues,
  columns,
  helperText,
  error,
}) => {
  const { onClickButton, flexDirection } = useChoiceGroup(selectedValues, setSelectedValues, multiSelect, columns)

  return (
    <Stack>
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
      <FormHelperText error={!!error}>{helperText}</FormHelperText>
    </Stack>
  )
}

export default ChoiceGroup
