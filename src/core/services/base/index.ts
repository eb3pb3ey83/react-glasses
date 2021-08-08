import getAxiosInstance from './getAxiosInstance'
import getRequestConfig from './getRequestConfig'
import showLogger from './showLogger'
// import handleSuccess from './handleSuccess'
import handleFailure from './handleFailure'
import { AxiosResponse } from 'axios'
import handleSuccess from './handleSuccess'
import { dataObject } from 'src/shared/types/data.type'

export interface DefaultConfig {
  params?: unknown
  data?: unknown
  headers?: dataObject
}

export interface AxiosConfig<customConfig extends DefaultConfig = DefaultConfig> {
  url: string
  method: 'get' | 'post' | 'delete' | 'patch' | 'put'
  params?: customConfig['params']
  data?: customConfig['data']
  headers?: customConfig['headers']
}

export interface ApiConfig<customConfig = DefaultConfig> {
  config: AxiosConfig<customConfig>
  name: string
  currentEnv?: string
  withAccessToken?: boolean
}

const defaultConfig: ApiConfig<DefaultConfig> = {
  config: {
    url: '',
    method: 'get',
    // params: {},
  },
  name: 'SERVICE_NAME',
  currentEnv: process.env.NODE_ENV,
  withAccessToken: true,
}

export default function getService<responseType, config = ApiConfig<DefaultConfig>>(
  customConfig: config,
  unAuthAlert?: () => void,
): Promise<AxiosResponse<responseType>> {
  const apiInfo = Object.setPrototypeOf(customConfig, defaultConfig)
  const callApi = (): Promise<AxiosResponse<responseType>> => {
    const axiosInstance = getAxiosInstance(apiInfo)
    const requestConfig = getRequestConfig(apiInfo)
    showLogger(`${apiInfo.name}_REQUEST`)

    return axiosInstance(requestConfig)
      .then((response) => handleSuccess(response, apiInfo))
      .catch((response) => handleFailure(response, apiInfo, unAuthAlert))
  }

  return callApi()
}
