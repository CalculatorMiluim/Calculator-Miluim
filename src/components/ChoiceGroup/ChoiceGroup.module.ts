interface IChoiceButtonProps {
  label: string
  endIcon?: string
  value: string | number
}

export interface IChoiceGroup {
  multiSelect?: boolean
  buttons: IChoiceButtonProps[]
  selectedValues: any[]
  setSelectedValues: (value: any[]) => void
}
