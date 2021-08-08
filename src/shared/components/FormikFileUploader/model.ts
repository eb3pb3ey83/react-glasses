export interface Props {
  name: string
  width: string
  height: string
  hasUpdatePermission: boolean
  imageUrl?: string
  onSuccess?: (isUpdate: boolean) => void
  onError?: () => void
}
