import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import { stateProps, actionProps, Newssection, reInit } from './model'

interface payload {
  [key: string]: unknown
  error: { limit: boolean; empty: boolean } | boolean
}

const swtichPayLoad = (type: '0' | '1' | '2' | '3', content: string, img: string | null | undefined, imgId: number) => {
  switch (type) {
    case '0':
    case '1':
      return { value: content, error: false }
    case '2':
      return { src: img, id: imgId, error: { empty: false, limit: false } }
    case '3':
      return { url: content, error: false }
    default:
      return { value: content, error: false }
  }
}

export const createInitState = (langList: SysLanguageItem[]) => {
  let state = {}
  for (let i = 0; i < langList.length; i++) {
    state = {
      ...state,
      [i]: [
        { type: 0, payload: { value: '', error: false }, sort: 0 },
        {
          type: 2,
          sort: 1,
          payload: {
            id: null,
            error: { empty: false, limit: false },
            src: '',
          },
        },
      ],
    }
  }
  return state
}

export const createValueInitState = (langList: SysLanguageItem[], news_sections: Newssection[]) => {
  let state = {}
  for (let i = 0; i < langList.length; i++) {
    state = {
      ...state,
      [i]: news_sections
        .filter((item) => item.language === langList[i].code_no)
        .map((se, id) => {
          return {
            id: se.id,
            sort: id,
            type: se.section_type,
            payload: swtichPayLoad(se.section_type as '0' | '1' | '2' | '3', se.section_content, se.section_image, se.section_image_id as number),
          }
        }),
    }
  }
  return state
}

export const initialContent: stateProps = {
  0: [
    { type: 0, payload: { value: '', error: false }, sort: 0 },
    {
      type: 2,
      sort: 1,
      payload: {
        id: null,
        error: { empty: false, limit: false },
        src: '',
      },
    },
  ],
  1: [
    { type: 0, payload: { value: '', error: false }, sort: 0 },
    {
      sort: 1,
      type: 2,
      payload: {
        id: null,
        error: { empty: false, limit: false },
        src: '',
      },
    },
  ],
}

export function contentReducer(state: stateProps, action: actionProps | reInit) {
  if (action.act === 'reInit') {
    return action.payload
  }
  let newLangState = [...state[action.lang]]
  switch (action.act) {
    case 'update':
      const updateIndex = newLangState.findIndex((ele) => ele.sort === action.sort)
      newLangState[updateIndex as number] = {
        ...newLangState[updateIndex as number],
        payload: action.payload as payload,
      }
      return { ...state, [action.lang]: newLangState }
    case 'create':
      newLangState = [...newLangState, { sort: action.sort as number, type: action.type as 0 | 1 | 2 | 3, payload: action.payload as payload }]
      return { ...state, [action.lang]: newLangState }
    case 'delete':
      newLangState = newLangState.filter((item) => item.sort !== action.sort)
      return { ...state, [action.lang]: newLangState }
    default:
      throw new Error('failed to setState')
  }
}

export const createContentReducer = () => {
  return function newReducer(state: stateProps, action: actionProps) {
    if (action.act === 'reInit') {
      return { ...state, ...action.initData }
    }
    let newLangState = [...state[action.lang]]
    switch (action.act) {
      case 'update':
        const updateIndex = newLangState.findIndex((ele) => ele.sort === action.sort)
        newLangState[updateIndex as number] = {
          ...newLangState[updateIndex as number],
          payload: action.payload as payload,
        }
        return { ...state, [action.lang]: newLangState }
      case 'create':
        newLangState = [...newLangState, { sort: action.sort as number, type: action.type as 0 | 1 | 2 | 3, payload: action.payload as payload }]
        return { ...state, [action.lang]: newLangState }
      case 'delete':
        newLangState = newLangState.filter((item) => item.sort !== action.sort)
        return { ...state, [action.lang]: newLangState }

      default:
        throw new Error('failed to setState')
    }
  }
}
