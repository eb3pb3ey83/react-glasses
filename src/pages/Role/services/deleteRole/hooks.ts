import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import apiKey from 'src/core/services/base/apiKey'
import { AlertModel } from 'src/shared/machine/alertMachine/model'
import { deleteRole } from '.'
import { RoleInfoModel } from '../roleInfo/model'
import { DeleteRoleModel } from './model'
export default function useDeletingRole(
  openToast: (message: string) => void,
  closeDrawer: () => void,
  closeAlert: () => void,
  openAlert: (message: AlertModel) => void,
  roleInfo?: RoleInfoModel,
) {
  const queryClient = useQueryClient()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isChinese = language === 'zh-TW'

  return useMutation<unknown, { data: { result_data: { message: string } } }, DeleteRoleModel, unknown>(deleteRole, {
    onSuccess: () => {
      openToast(t('toast.section8'))
      queryClient.invalidateQueries(apiKey.role)
      closeDrawer()
    },
    onError: (error) => {
      if (error.data.result_data.message === 'The role is being used') {
        closeAlert()
        openAlert({
          title: `${t('alert.section24')}『${isChinese ? roleInfo?.role_name_ch : roleInfo?.role_name_en}』${t('alert.section25')}`,
          content: t('alert.section26'),
          isDicidedMode: false,
          onConfirm: () => {
            closeAlert()
          },
        })
      }
    },
  })
}
