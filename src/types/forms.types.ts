import React, { ChangeEvent, MouseEventHandler } from 'react'
import { FieldInputProps } from 'formik'
import { SelectChangeEvent, SvgIconProps } from '@mui/material'
import { IArrivalFormStepsValues } from '@/pages/ArrivalForm/ArrivalForm.module.ts'
import { IIssuingFormStepsValues } from '@/pages/IssuingForm/IssuingForm.module.ts'
import { IDocFormStepsValues } from '@/pages/DocForm/DocForm.module.ts'
import { RoutesValues } from '@/consts/routes'
import { IYarmaFormStepsValues } from '@/hooks/useYarmaSignature/useYarmaSignature.ts'
import { IReleaseFormStepsValues } from '@/pages/ReleaseForm/ReleaseForm.module.ts'

export enum FormInputType {
  TEXT = 'TEXT',
  SELECT = 'SELECT',
  FILE = 'FILE',
  DATE = 'DATE',
  TIME = 'TIME',
  RADIO = 'RADIO',
  SIGNATURE = 'SIGNATURE',
  BIG_RADIO_ICON = 'BIG_RADIO_ICON',
  SLIDER = 'SLIDER',
  AUTO_COMPLETE = 'AUTO_COMPLETE',
}

export interface IFieldErrorProps {
  error?: boolean
  helperText?: string
}

interface IBaseInputProps extends IFieldErrorProps {
  value: any
  label: string
  name: string
  onChange?: (e: ChangeEvent<any>) => void
  onBlur?: (e: ChangeEvent<any>) => void
  disabled?: boolean
}

export interface IPlaceHolder {
  placeholder?: string
}

export type ITextFieldInputProps = IBaseInputProps & IPlaceHolder

export interface ISelectOption {
  value: string | number
  label: string
}

export interface ISelectNumericOption {
  value: number
  label: string
}

export interface ISelectOptionsWithIcon extends ISelectOption {
  Icon: React.ElementType<SvgIconProps>
}

export type ISelectFieldInputProps = Omit<IBaseInputProps, 'onChange'> &
  IPlaceHolder & {
    options: ISelectOption[]
    onChange: (e: SelectChangeEvent<any>) => void
  }

export type IAutoCompleteFieldInputProps = IBaseInputProps & IPlaceHolder & { options: ISelectOption[] }

export interface IFileFieldInputProps extends Omit<IBaseInputProps, 'onChange'> {
  multi?: boolean
  accept?: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  onClearFile: MouseEventHandler
  successMessage: string
  subtitle?: string
}

export type IRadioFieldInputProps = IBaseInputProps & { options: ISelectOption[] }
export type ISliderFieldInputProps = Omit<IBaseInputProps, 'onChange' | 'options'> & {
  labelSuffix?: string
  onChange: (e: Event, value: number | number[], activeThumb: number) => void
  options: ISelectNumericOption[]
}

export interface IBigRadioIconFieldInputProps extends Omit<IBaseInputProps, 'onChange'> {
  options: ISelectOptionsWithIcon[]
  onChange: (value: string | number) => void
}

interface IDateOnChange {
  onChange: (date: Date | null, _?: string) => void
}

interface ISignatureProps extends Omit<IBaseInputProps, 'onChange'> {
  primaryText: string
  secondaryText: string
  onChange: (value: string | number) => void
}

export type IDateFieldInputProps = Omit<IBaseInputProps, 'onChange'> & IDateOnChange & IPlaceHolder
export type ITimeFieldInputProps = Omit<IBaseInputProps, 'onChange'> & IDateOnChange & IPlaceHolder
export type ISignatureFieldInputProps = IBaseInputProps & ISignatureProps

export type ITextFieldInput = { inputType: FormInputType.TEXT } & ITextFieldInputProps
export type IAutoCompleteFieldInput = { inputType: FormInputType.AUTO_COMPLETE } & IAutoCompleteFieldInputProps
export type ISelectFieldInput = { inputType: FormInputType.SELECT } & ISelectFieldInputProps
export type IFileFieldInput = { inputType: FormInputType.FILE } & IFileFieldInputProps
export type IDateFieldInput = { inputType: FormInputType.DATE } & IDateFieldInputProps
export type ITimeFieldInput = { inputType: FormInputType.TIME } & ITimeFieldInputProps
export type IRadioFieldInput = { inputType: FormInputType.RADIO } & IRadioFieldInputProps
export type ISliderFieldInput = { inputType: FormInputType.SLIDER } & ISliderFieldInputProps
export type IBigRadioIconFieldInput = { inputType: FormInputType.BIG_RADIO_ICON } & IBigRadioIconFieldInputProps
export type ISignatureFieldInput = { inputType: FormInputType.SIGNATURE } & ISignatureFieldInputProps

interface IBasePredefinedInput {
  label: string
  disabled?: boolean
  excludeFromPdf?: boolean
}

type IRowsXORMaxRows = { rows: number; maxRows?: never } | { rows?: never; maxRows: number } | {}
export type IPredefinedTextInput = IBasePredefinedInput &
  IPlaceHolder & {
    inputType: FormInputType.TEXT
    type?: 'text' | 'number'
    multiline?: boolean
  } & IRowsXORMaxRows

export type IPredefinedAutoCompleteInput = {
  inputType: FormInputType.AUTO_COMPLETE
  placeholder?: string
  options?: ISelectOption[]
} & IBasePredefinedInput

export interface IPredefinedRadioInput extends IBasePredefinedInput {
  inputType: FormInputType.RADIO
  options: ISelectOption[]
}

export interface IPredefinedSliderInput extends IBasePredefinedInput {
  inputType: FormInputType.SLIDER
  options: ISelectNumericOption[]
}

export interface IPredefinedBigRadioIconInput extends IBasePredefinedInput {
  inputType: FormInputType.BIG_RADIO_ICON
  options: ISelectOptionsWithIcon[]
}

export interface IPredefinedSelectInput extends IBasePredefinedInput {
  inputType: FormInputType.SELECT
  options?: ISelectOption[]
  placeholder?: string
}

export interface IPredefinedFileInput extends IBasePredefinedInput {
  inputType: FormInputType.FILE
  successMessage: string
  subtitle?: string
  accept?: string
  multi?: boolean
}

export type IPredefinedDateInput = { inputType: FormInputType.DATE; placeholder?: string } & IBasePredefinedInput
export type IPredefinedTimeInput = { inputType: FormInputType.TIME; placeholder?: string } & IBasePredefinedInput
export type IPredefinedSignatureInput = {
  inputType: FormInputType.SIGNATURE
  secondaryText: string
} & IBasePredefinedInput

export type IPredefinedInput =
  | IPredefinedTextInput
  | IPredefinedRadioInput
  | IPredefinedSelectInput
  | IPredefinedFileInput
  | IPredefinedDateInput
  | IPredefinedTimeInput
  | IPredefinedSignatureInput
  | IPredefinedBigRadioIconInput
  | IPredefinedSliderInput
  | IPredefinedAutoCompleteInput

export type IFormInput =
  | ITextFieldInput
  | ISelectFieldInput
  | IFileFieldInput
  | IDateFieldInput
  | ITimeFieldInput
  | IRadioFieldInput
  | ISignatureFieldInput
  | IBigRadioIconFieldInput
  | ISliderFieldInput
  | IAutoCompleteFieldInput

export interface IFormInputControl {
  predefinedProps: IPredefinedInput
  errorProps: IFieldErrorProps
  controlProps: FieldInputProps<any>
}

export enum FormStep {
  ARRIVAL_FORM_STEP1 = 'ARRIVAL_FORM_STEP1',
  ARRIVAL_FORM_STEP2 = 'ARRIVAL_FORM_STEP2',
  ARRIVAL_FORM_STEP3_OWNER_CHECK = 'ARRIVAL_FORM_STEP3_OWNER_CHECK',
  ARRIVAL_FORM_STEP3_DELIVERY_AGENT = 'ARRIVAL_FORM_STEP3_DELIVERY_AGENT',
  ARRIVAL_FORM_STEP3_OWNER = 'ARRIVAL_FORM_STEP3_OWNER',
  ARRIVAL_FORM_GIVER_SIGNATURE = 'ARRIVAL_FORM_GIVER_SIGNATURE',

  FORM_DISPLAY = 'FORM_DISPLAY',

  ISSUING_FORM_STEP1 = 'ISSUING_FORM_STEP1',
  ISSUING_FORM_STEP2 = 'ISSUING_FORM_STEP2',
  ISSUING_FORM_GIVER_SIGNATURE = 'ISSUING_FORM_GIVER_SIGNATURE',

  CREDIT_FORM_STEP1 = 'CREDIT_FORM_STEP1',
  CREDIT_FORM_STEP2 = 'CREDIT_FORM_STEP2',
  CREDIT_FORM_UNIT_REP_SIGNATURE = 'CREDIT_FORM_UNIT_REP_SIGNATURE',

  DOC_FORM_STEP1 = 'DOC_FORM_STEP1',
  DOC_FORM_STEP2 = 'DOC_FORM_STEP2',
  DOC_FORM_STEP3 = 'DOC_FORM_STEP3',
  DOC_FORM_STEP4 = 'DOC_FORM_STEP4',
  DOC_FORM_STEP5 = 'DOC_FORM_STEP5',
  DOC_FORM_STEP6_GAS_SUPPORT = 'DOC_FORM_STEP6_GAS_SUPPORT',
  DOC_FORM_STEP6 = 'DOC_FORM_STEP6',
  DOC_FORM_GIVER_SIGNATURE = 'DOC_FORM_GIVER_SIGNATURE',

  RELEASE_FORM_STEP1 = 'RELEASE_FORM_STEP1',
  RELEASE_FORM_STEP2 = 'RELEASE_FORM_STEP2',
  RELEASE_FORM_STEP3_OWNER_CHECK = 'RELEASE_FORM_STEP3_OWNER_CHECK',
  RELEASE_FORM_STEP3_DELIVERY_AGENT = 'RELEASE_FORM_STEP3_DELIVERY_AGENT',
  RELEASE_FORM_STEP3_OWNER = 'RELEASE_FORM_STEP3_OWNER',
  RELEASE_FORM_STEP4 = 'RELEASE_FORM_STEP4',
  RELEASE_FORM_STEP5 = 'RELEASE_FORM_STEP5',
  RELEASE_FORM_STEP6 = 'RELEASE_FORM_STEP6',
  RELEASE_FORM_STEP7 = 'RELEASE_FORM_STEP7',
  RELEASE_FORM_STEP8_GAS_SUPPORT = 'RELEASE_FORM_STEP8_GAS_SUPPORT',
  RELEASE_FORM_STEP8 = 'RELEASE_FORM_STEP8',
  RELEASE_FORM_GIVER_SIGNATURE = 'RELEASE_FORM_GIVER_SIGNATURE',

  YARMA_SIGNATURE = 'YARMA_SIGNATURE',
}

type IFormStepDisplayValues = (typeof FormStep)[keyof typeof FormStep]

const STEP1_TEXT_DESC = 'שלב 1'
const STEP2_TEXT_DESC = 'שלב 2'
const GIVER_SIGNATURE_TEXT_DESC = 'חתימת נותן הטופס'
const STEP3_TEXT_DESC = 'שלב 3'
const STEP4_TEXT_DESC = 'שלב 4'
const STEP5_TEXT_DESC = 'שלב 5'
const STEP6_TEXT_DESC = 'שלב 6'
const STEP7_TEXT_DESC = 'שלב 7'
const STEP8_TEXT_DESC = 'שלב 8'

const STEP3_OWNERSHIP_CHECK_DESC = 'שלב 3 - בדיקת בעלים'
const STEP3_DELIVERY_AGENT_DESC = 'שלב 3 - נציג משלוחים'
const STEP3_OWNER_DESC = 'שלב 3 - בעלים'
export const FormStepDisplay: Record<IFormStepDisplayValues, string> = {
  ARRIVAL_FORM_STEP1: STEP1_TEXT_DESC,
  ARRIVAL_FORM_STEP2: STEP2_TEXT_DESC,
  ARRIVAL_FORM_STEP3_OWNER_CHECK: STEP3_OWNERSHIP_CHECK_DESC,
  ARRIVAL_FORM_STEP3_DELIVERY_AGENT: STEP3_DELIVERY_AGENT_DESC,
  ARRIVAL_FORM_STEP3_OWNER: STEP3_OWNER_DESC,
  ARRIVAL_FORM_GIVER_SIGNATURE: GIVER_SIGNATURE_TEXT_DESC,

  FORM_DISPLAY: 'תצוגת טופס',

  ISSUING_FORM_STEP1: STEP1_TEXT_DESC,
  ISSUING_FORM_STEP2: STEP2_TEXT_DESC,
  ISSUING_FORM_GIVER_SIGNATURE: GIVER_SIGNATURE_TEXT_DESC,

  CREDIT_FORM_STEP1: STEP1_TEXT_DESC,
  CREDIT_FORM_STEP2: STEP2_TEXT_DESC,
  CREDIT_FORM_UNIT_REP_SIGNATURE: 'חתימת נציג היחידה',

  DOC_FORM_STEP1: STEP1_TEXT_DESC,
  DOC_FORM_STEP2: STEP2_TEXT_DESC,
  DOC_FORM_STEP3: STEP3_TEXT_DESC,
  DOC_FORM_STEP4: STEP4_TEXT_DESC,
  DOC_FORM_STEP5: STEP5_TEXT_DESC,
  DOC_FORM_STEP6_GAS_SUPPORT: 'שלב 6 - תמיכת גז',
  DOC_FORM_STEP6: STEP6_TEXT_DESC,
  DOC_FORM_GIVER_SIGNATURE: GIVER_SIGNATURE_TEXT_DESC,

  RELEASE_FORM_STEP1: STEP1_TEXT_DESC,
  RELEASE_FORM_STEP2: STEP2_TEXT_DESC,
  RELEASE_FORM_STEP3_OWNER_CHECK: STEP3_OWNERSHIP_CHECK_DESC,
  RELEASE_FORM_STEP3_OWNER: STEP3_OWNER_DESC,
  RELEASE_FORM_STEP3_DELIVERY_AGENT: STEP3_DELIVERY_AGENT_DESC,
  RELEASE_FORM_STEP4: STEP4_TEXT_DESC,
  RELEASE_FORM_STEP5: STEP5_TEXT_DESC,
  RELEASE_FORM_STEP6: STEP6_TEXT_DESC,
  RELEASE_FORM_STEP7: STEP7_TEXT_DESC,
  RELEASE_FORM_STEP8_GAS_SUPPORT: 'בדיקת תמיכה בגז',
  RELEASE_FORM_STEP8: STEP8_TEXT_DESC,
  RELEASE_FORM_GIVER_SIGNATURE: GIVER_SIGNATURE_TEXT_DESC,

  YARMA_SIGNATURE: 'חתימת ירמה',
}

export type IFormStepsValues = IArrivalFormStepsValues &
  IIssuingFormStepsValues &
  IDocFormStepsValues &
  IReleaseFormStepsValues &
  IYarmaFormStepsValues

export interface IMoveNextFormPayload {
  data: Partial<IFormStepsValues>
  nextForm: FormStep
}

export type IDynamicOptions = ISelectOption[] | ISelectNumericOption[] | null

export interface IFormCardData {
  formUrl: string
  formCardType: 'checked' | 'unlocked' | 'locked'
  formTitle: string
  formCreationDateString?: string
  formStatusLabel?: string
}

export interface IFormInfo {
  title: string
  id: number
  url: RoutesValues
  excludeFromPdf?: boolean
}
