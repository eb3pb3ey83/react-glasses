import { cloneDeep } from 'lodash/fp'
import { dataObject, PropType } from '../../../../shared/types/data.type'
import { ApiConfig } from '..'

export default function getRequestConfig(apiInfo: ApiConfig): PropType<ApiConfig, 'config'> {
  const apiConfig = cloneDeep(apiInfo.config)
  const isGetMethod = apiInfo.config.method === 'get'
  const headers = apiConfig.headers
  const isFormData = !isGetMethod && headers && headers['Content-Type'] === 'multipart/form-data'

  const handleConfigWithFormData = () => {
    const formData = new FormData()

    const setFormData = ([key, value]: [string, unknown]) => {
      if (Array.isArray(value)) {
        value.forEach((insideValue) => formData.append(key, insideValue))
      } else {
        formData.append(key, value as string | Blob)
      }
    }

    Object.entries(apiConfig.data as dataObject).forEach(setFormData)
    apiConfig.data = formData
  }

  isFormData && handleConfigWithFormData()
  return apiConfig
}
