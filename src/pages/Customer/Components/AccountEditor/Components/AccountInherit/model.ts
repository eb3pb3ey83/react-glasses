import { FormSchema } from '../../model'

export interface Props {
  open: boolean
  onClose: () => void
  companyId: string
  formValues: FormSchema
  setFormValues: (values: React.SetStateAction<FormSchema>) => void
}
