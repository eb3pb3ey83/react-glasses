import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { Bannercontent } from 'src/shared/services/getBannerInfo/model'
import { stateProps, actionProps } from './model'

interface payload {
  [key: string]: unknown
  error: { limit: boolean; empty: boolean } | boolean
}

export const createInitState = (langList: SysLanguageItem[]) => {
  let state = {}
  for (let i = 0; i < langList.length; i++) {
    state = {
      ...state,
      [i]: [
        {
          type: 'ban_web_img_id',
          payload: {
            id: null,
            error: { empty: false, limit: false },
            src: '',
          },
        },
        {
          type: 'ban_mobile_img_id',
          payload: {
            id: null,
            error: { empty: false, limit: false },
            src: '',
          },
        },
        { type: 'ban_title', payload: { value: '', error: false } },
        { type: 'ban_link', payload: { value: '', error: false } },
        { type: 'ban_target', payload: { value: 1, error: false } },
      ],
    }
  }
  return state
}

export const createValueInitState = (langList: SysLanguageItem[], sections: Bannercontent[]) => {
  let state = {}
  for (let i = 0; i < langList.length; i++) {
    let iniArr = sections.filter((item) => item.language === langList[i].code_no)
    state = {
      ...state,
      [i]: [
        {
          type: 'ban_web_img_id',
          payload: {
            id: iniArr[0].ban_web_img_id,
            error: { empty: false, limit: false },
            src: iniArr[0].ban_web_img,
          },
        },
        {
          type: 'ban_mobile_img_id',
          payload: {
            id: iniArr[0].ban_mobile_img_id,
            error: { empty: false, limit: false },
            src: iniArr[0].ban_mobile_img,
          },
        },
        { type: 'ban_title', payload: { value: iniArr[0].ban_title, error: false } },
        { type: 'ban_link', payload: { value: iniArr[0].ban_link, error: false } },
        { type: 'ban_target', payload: { value: iniArr[0].ban_target, error: false } },
      ],
    }
  }
  return state
}

export const createContentReducer = () => {
  return function newReducer(state: stateProps, action: actionProps) {
    if (action.act === 'reInit') {
      return { ...state, ...action.initData }
    }
    let newLangState = [...state[action.lang]]
    switch (action.act) {
      case 'update':
        const updateIndex = newLangState.findIndex((ele) => ele.type === action.type)
        newLangState[updateIndex as number] = {
          ...newLangState[updateIndex as number],
          payload: action.payload as payload,
        }
        return { ...state, [action.lang]: newLangState }
      case 'create':
        newLangState = [...newLangState, { type: action.type ? action.type : '', payload: action.payload as payload }]
        return { ...state, [action.lang]: newLangState }
      case 'delete':
        newLangState = newLangState.filter((item) => item.type !== action.type)
        return { ...state, [action.lang]: newLangState }

      default:
        throw new Error('failed to setState')
    }
  }
}
