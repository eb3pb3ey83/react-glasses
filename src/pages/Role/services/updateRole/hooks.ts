import { useTranslation } from 'react-i18next'
import { useMutation, useQueryClient } from 'react-query'
import apiKey from 'src/core/services/base/apiKey'
import { updateRole } from '.'
import { UpdateRoleModel } from './model'
export default function useUpdatingRole(openToast: (message: string) => void, closeDrawer: () => void) {
  const queryClient = useQueryClient()
  const { t } = useTranslation()

  return useMutation<unknown, unknown, UpdateRoleModel, unknown>(updateRole, {
    onSuccess: () => {
      openToast(t('toast.section9'))
      queryClient.invalidateQueries(apiKey.role)
      queryClient.invalidateQueries(apiKey.getMenuList)
      closeDrawer()
    },
  })
}
