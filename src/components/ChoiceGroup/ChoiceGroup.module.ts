interface IOptionProps {
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
}

export const useChoiceGroup = (
  selectedValues: any[],
  setSelectedValues: (value: any[]) => void,
  multiSelect?: boolean,
  columns?: boolean,
) => {
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

  return { onClickButton, flexDirection }
}
