import { useEffect } from 'react'
import { useNoCacheQuery } from 'src/core/services/base/hooks'
import { sendEventType } from 'src/shared/components/ResetPassword'
import useQueryString from 'src/shared/hooks/useQueryString'
import { getResetPasswordToken } from '.'
import apiKey from '../../../core/services/base/apiKey'

export default function useResetPasswordToken(openUnAuthAlert: () => void, send: sendEventType, isModifiedMode?: boolean) {
  const { token } = useQueryString()
  const { isFetched, isSuccess, isError } = useNoCacheQuery(
    [apiKey.getResetPasswordToken, token],
    () => getResetPasswordToken(token, openUnAuthAlert),
    {
      enabled: !isModifiedMode,
    },
  )

  useEffect(() => {
    if (isError) {
      send({ type: 'GET_TOKEN_FAILED' })
    }
  }, [isFetched, isSuccess, isError])

  return { isFetched, token }
}
