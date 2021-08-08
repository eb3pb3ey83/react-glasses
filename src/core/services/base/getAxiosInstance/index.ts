import axios, { AxiosInstance } from 'axios'
import { ApiConfig } from '..'
import authConfig from '../../../../utils/authConfig'

export default function getAxiosInstance(apiInfo: ApiConfig): AxiosInstance {
  const withAccessTokenHeader = {
    headers: { Authorization: `Bearer ${authConfig.getAccessToken()}` },
  }

  const baseURL = process.env.BASE_URL
  const apiConfig = {
    baseURL: !baseURL ? 'https://api.dev.ci-btox.com/' : `${baseURL}/`,
    ...(apiInfo.withAccessToken && withAccessTokenHeader),
  }

  return axios.create(apiConfig)
}
