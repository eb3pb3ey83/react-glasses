import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { createRole } from '.'
import { CreateRoleModel } from './model'
export default function useCreatingRole(openToast: (message: string) => void, closeDrawer: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, CreateRoleModel, unknown>(createRole, {
    onSuccess: () => {
      openToast(t('toast.section7'))
      queryClient.invalidateQueries(apiKey.role)
      closeDrawer()
    },
  })
}
