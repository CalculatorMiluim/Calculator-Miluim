export interface IOptionProps {
  label: string
  endIcon?: string
  value: string | number | boolean
}

export interface IChoiceGroup {
  columns?: boolean
  multiSelect?: boolean
  options: IOptionProps[]
  selectedValues: any[]
  setSelectedValues: (value: any[]) => void
  error?: boolean
  helperText?: string
}

export const useChoiceGroup = (
  selectedValues: any[],
  setSelectedValues: (value: any[]) => void,
  multiSelect?: boolean,
  columns?: boolean,
) => {
  const handleMultiSelectClick = (value: any) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((existingValue) => existingValue !== value))
      return
    }

    setSelectedValues([...selectedValues, value])
  }
  const onClickButton = (value: any) => {
    multiSelect ? handleMultiSelectClick(value) : setSelectedValues([value])
  }

  const flexDirection = columns ? 'column' : 'row'

  return { onClickButton, flexDirection }
}
