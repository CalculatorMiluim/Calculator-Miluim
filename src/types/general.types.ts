export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

type ISerializablePrimitive = string | number | boolean | null
type ISerializableArray = ISerializable[]
type ISerializableObject = { [key: string]: ISerializable }
export type ISerializable = ISerializablePrimitive | ISerializableArray | ISerializableObject

export enum VehicleCardListPosition {
  TOP = 'top',
  MIDDLE = 'middle',
  BOTTOM = 'bottom',
}
