import { FormikConfig } from './formikConfig'

export interface Props<SchemaType> {
  formikConfig: FormikConfig<SchemaType>
  children: React.ReactNode
}
