import { useFormikContext } from 'formik'
import React from 'react'
import { Props } from './model'

const FormContent: React.FC<Props> = ({ item, isHidden, index, tabName, fieldName, setError }) => {
  const { errors, isValidating } = useFormikContext<{ [key: string]: unknown }>()
  const fieldErrors = errors[fieldName]

  React.useEffect(() => {
    if (!isValidating && fieldErrors && fieldErrors[index]) {
      setError({ tab: item[tabName] as string })
    }
  }, [isValidating, fieldErrors])

  return <div style={{ display: isHidden ? 'none' : 'block' }}>{item.jsx}</div>
}

export default FormContent
