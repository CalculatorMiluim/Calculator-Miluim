export const hasPredefinedOptions = (obj: any): obj is { options: any } => {
  return obj !== null && typeof obj === 'object' && 'options' in obj
}

export const isFileList = (value: any): value is FileList => {
  return value instanceof FileList
}
