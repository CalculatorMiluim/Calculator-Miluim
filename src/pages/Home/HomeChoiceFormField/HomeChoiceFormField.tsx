import React from 'react'
import { Stack, Typography } from '@mui/material'
import { COLORS } from '@/consts/colors.ts'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'
import ChildrenGuard from '@/components/Guards/ChildrenGuard/ChildrenGuard.tsx'
import { IChoiceGroup } from '@/components/ChoiceGroup/ChoiceGroup.module.ts'

interface IHomeChoiceFormField extends IChoiceGroup {
  label: string
  subDescription?: string
  isFollowUpQuestion?: boolean
}

const HomeChoiceFormField: React.FC<IHomeChoiceFormField> = ({
  selectedValues,
  setSelectedValues,
  label,
  subDescription,
  options,
  columns,
  multiSelect,
  isFollowUpQuestion,
}) => {
  return (
    <Stack gap={2}>
      <Stack gap={1}>
        <Typography variant="h6" sx={{ color: isFollowUpQuestion ? COLORS.PRIMARY : COLORS.BLACK, fontWeight: 600 }}>
          {label}
        </Typography>
        <ChildrenGuard showChildren={!!subDescription}>
          <Typography>{subDescription}</Typography>
        </ChildrenGuard>
      </Stack>
      <ChoiceGroup
        selectedValues={selectedValues}
        setSelectedValues={setSelectedValues}
        options={options}
        columns={columns}
        multiSelect={multiSelect}
      />
    </Stack>
  )
}

export default HomeChoiceFormField
