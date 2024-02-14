import React from 'react'
import { Stack, Typography } from '@mui/material'
import ChoiceGroup from '@/components/ChoiceGroup/ChoiceGroup.tsx'
import ChildrenGuard from '@/components/Guards/ChildrenGuard/ChildrenGuard.tsx'
import { IChoiceGroup } from '@/components/ChoiceGroup/ChoiceGroup.module.ts'

export interface IHomeChoiceFormField extends IChoiceGroup {
  label: string
  subDescription?: string
  isFollowUpQuestion?: boolean
  dependsOnQuestion?: string
  dependsOnQuestionValue?: boolean | string
  showFollowUpQuestion?: boolean
}

const HomeChoiceFormField: React.FC<IHomeChoiceFormField> = ({
  selectedValues,
  setSelectedValues,
  label,
  subDescription,
  options,
  columns,
  multiSelect,
  error,
  helperText,
  showFollowUpQuestion = true,
}) => {
  return (
    <ChildrenGuard showChildren={showFollowUpQuestion}>
      <Stack gap={2}>
        <Stack gap={1}>
          <Typography variant="h6" sx={{ fontFamily: 'PolinBoldFont' }}>
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
          error={error}
          helperText={helperText}
        />
      </Stack>
    </ChildrenGuard>
  )
}

export default HomeChoiceFormField
