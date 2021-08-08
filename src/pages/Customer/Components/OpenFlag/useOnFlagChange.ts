import { useFormikContext } from 'formik'
import React from 'react'
import { OpenFlagContext } from './model'

export const useOnFlagChange = () => {
  const { values, setValues } = useFormikContext<{ open_flag?: string; role_type?: '0' | '1' | '2' | '3' | null; [key: string]: unknown }>()
  const { openAlert, closeAlert, alertTitle, alertContent, isAlwaysConfirm, onConfirm, buttonLabel } = React.useContext(OpenFlagContext)

  const onFlagChange = () => {
    const { open_flag } = values
    const isAccountOpen = open_flag === '1'
    const shouldOpenAlert = (!isAlwaysConfirm && isAccountOpen) || isAlwaysConfirm

    if (!shouldOpenAlert) {
      return setValues({ ...values, open_flag: isAccountOpen ? '0' : '1' })
    }

    if (!openAlert) return

    openAlert({
      title: alertTitle as string,
      content: alertContent as string,
      isDicidedMode: true,
      confirmBtnLabel: buttonLabel,
      onConfirm: () => {
        setValues({ ...values, open_flag: isAccountOpen ? '0' : '1' })
        onConfirm && onConfirm(values, setValues)
        closeAlert && closeAlert()
      },
    })
  }

  return { onFlagChange }
}
