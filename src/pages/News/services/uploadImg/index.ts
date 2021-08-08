import { AxiosResponse } from 'axios'
import getService from 'src/core/services/base'
import apiKey from 'src/core/services/base/apiKey'
import { RootObject } from './model'

const url = 'sysdata/sys_images'

export function postImage(image: File): Promise<AxiosResponse<RootObject>> {
  return getService({
    config: {
      url,
      method: 'post',
      data: { image: image },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
    name: apiKey.uploadImg,
    withAccessToken: true,
  })
}
