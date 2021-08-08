// import React from 'react'
// import { useLocation, useParams } from 'react-router-dom'
// import { CountyRoleType } from 'src/pages/model'
// import { FormModel } from 'src/shared/components/FormAllValidated/FormConfig/model'
// import { FieldTypes, InputType } from 'src/shared/components/FormAllValidated/model'
// import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
// import { useAreaValue } from 'src/shared/hooks/useAreaValue'
// import useBannerInfo from 'src/shared/services/getBannerInfo/hooks'
// import { BannerInfo } from 'src/shared/services/getBannerInfo/model'
// import { Faqsection, Resultdata } from '../../services/detailPageFaq/model'

// export const useBannerFormData = () => {
//   const { areaValue } = useAreaValue()
//   const { langListForign, langListLocal } = React.useContext(CountyRoleType)
//   const tablist = areaValue === 1 ? langListLocal : langListForign
//   const { id }: { id: string } = useParams()
//   const location = useLocation()
//   const isCreatePage = location.pathname.includes('create')
//   const { bannerInfo, isBannerInfoFetched } = useBannerInfo(id)
//   const [defaultFormData, setDefaultFormData] = React.useState<FormModel[] | []>([])

//   const initialFormData = [
//     { section_content: '', section_type: '0' },
//     { section_content: '', section_type: '1' },
//   ]

//   const defaultFieldType: FieldTypes[] = [
//     { section_content: 'title', section_type: 'hidden', language: 'hidden' },
//     { section_content: 'text', section_type: 'hidden', language: 'hidden' },
//   ]

//   const defaultFieldTitle: Record<string, string>[] = [{ section_content: '標題' }, { section_content: '內文' }]

//   const setCreatePageData = (languagelist: SysLanguageItem[]) => {
//     let defaultSections: FormModel[] = []

//     initialFormData.forEach((typeItem, index) => {
//       let defaultSection = []
//       defaultSection = languagelist.map((item) => ({
//         ...typeItem,
//         language: item.code_no,
//         isHiddenLabel: false,
//         info: defaultFieldType[index],
//         fieldName: defaultFieldTitle[index],
//       }))

//       defaultSections = [...defaultSections, ...defaultSection]
//     })

//     setDefaultFormData(defaultSections)
//   }

//   const getModifiedFormData = (detail: BannerInfo[]): FormModel[] => {
//     const setItem = (item: BannerInfo) => {
//       const info: Record<string, InputType> = {
//         ban_title: 'title',
//         ban_web_img_id: 'smallImg',
//         language: 'hidden',
//       }

//       const fieldName = {
//         ban_web_img_id: '電腦版橫幅',
//         ban_title: '標題',
//       }

//       return {
//         info,
//         fieldName,
//         ban_title: item.banner_content.ban_title,
//         ban_web_img_id: item.banner_content.ban_web_img_id,
//         language: item.banner_content,
//       }
//     }

//     return detail.map(setItem)
//   }

//   const setEditPageData = () => {
//     if (isdetailPageFaqFetched && detailPageFaq) {
//       setDefaultFormData(getModifiedFormData(detailPageFaq))
//     }
//   }

//   React.useEffect(() => {
//     isCreatePage && tablist ? setCreatePageData(tablist) : setEditPageData()
//   }, [isdetailPageFaqFetched, tablist])

//   return { defaultFormData, defaultFieldType }
// }

export const useBannerFormData = () => null
