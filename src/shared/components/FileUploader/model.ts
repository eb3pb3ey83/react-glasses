import { CSSProperties } from 'react'

export const imgFileTypes = ['image/apng', 'image/gif', 'image/jpeg', 'image/pjpeg', 'image/png']
export const validFileType = (file: File) => {
  return imgFileTypes.includes(file.type)
}
export const validFileSize = (file: File) => {
  const sizeLimition = 5 //1 MB ~ 1048576K
  return file.size / 1048657 < sizeLimition
}

export const removeFileExe = (fileName: string, exeList: string[]) => {
  const exeName = exeList.find((item) => fileName.includes(item))
  if (!exeName) {
    return fileName
  }
  return fileName.split(exeName)[0]
}

export interface Props {
  readonly?: boolean
  onError: () => void
  error: boolean
  onSuccess: (id: null | number, src: string) => void
  src: string
  width?: string
  height?: string
  style?: CSSProperties
  limitedSize?: { width: number; height: number }
  hasUploadPermission?: boolean
}
