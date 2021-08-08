import { useTranslation } from 'react-i18next'
import { AlertModel } from 'src/shared/machine/alertMachine/model'

type OpenAlert = (message: AlertModel) => void
type FunProps = () => void

export const useDiscardEdit = (openAlert: OpenAlert, closeAlert: FunProps, closeDrawer: FunProps) => {
  const { t } = useTranslation()

  const doFormCancel = (dirty: boolean) => {
    if (dirty) {
      return openAlert({
        title: t('alert.editCancel'),
        content: t('alert.editCancelDescript'),
        isDicidedMode: true,
        onConfirm: () => {
          closeDrawer()
        },
        onClose: () => {
          closeAlert()
        },
      })
    }
    closeDrawer()
  }

  return { doFormCancel }
}
