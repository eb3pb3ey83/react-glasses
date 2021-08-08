import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
// import { dataObject } from 'src/shared/types/data.type'
import { postImage } from '.'
import { RootObject } from './model'

export function usePostImage() {
  return useMutation<AxiosResponse<RootObject>, unknown, File, unknown>((parm) => postImage(parm))
}
