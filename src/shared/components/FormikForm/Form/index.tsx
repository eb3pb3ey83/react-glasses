import React from 'react'
import { TableContext } from '../../TableProvider/model'
import { useTranslation } from 'react-i18next'
import { FormProps } from './model'

export function Form<FormSchema>(props: FormProps<FormSchema>) {
  const { t } = useTranslation()
  const { openToast, openToastSingle } = React.useContext(TableContext)
  const localIsValidating = React.useRef<boolean | null>(null)
  const localIsSubmitting = React.useRef<boolean | null>(null)

  React.useEffect(() => {
    if (!props.dirty) {
      props.setIsFormError && props.setIsFormError(false)
    }

    if (!props.isValid) {
      props.setIsFormError && props.setIsFormError(true)
    }

    if (localIsSubmitting.current === true && props.isSubmitting === false && props.isValidating === false && !props.isValid) {
      ;(openToast && openToast({ message: [t('toast.formhasErrors')], error: [true] })) ||
        (openToastSingle && openToastSingle(t('toast.formhasErrors'), true))
    }
    return () => {
      localIsSubmitting.current = props.isSubmitting
      localIsValidating.current = props.isValidating
    }
  }, [props.isValidating, props.isSubmitting, props.isValid])

  return (
    <form onReset={props.handleReset} onSubmit={props.handleSubmit}>
      {props.children}
    </form>
  )
}

export default Form
