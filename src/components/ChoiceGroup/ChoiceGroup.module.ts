interface IOptionProps {
  label: string
  endIcon?: string
  value: string | number
}

export interface IChoiceGroup {
  columns?: boolean
  multiSelect?: boolean
  options: IOptionProps[]
  selectedValues: any[]
  setSelectedValues: (value: any[]) => void
}
