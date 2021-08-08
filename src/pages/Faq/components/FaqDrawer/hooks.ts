import { useTranslation } from 'react-i18next'
import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { AlertUnauthContext, CountyRoleType } from 'src/pages/model'
import { FormModel } from 'src/shared/components/FormAllValidated/FormConfig/model'
import { FieldTypes, InputType } from 'src/shared/components/FormAllValidated/model'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import useDetailPageFaq from '../../services/detailPageFaq/hooks'
import { Faqsection, Resultdata } from '../../services/detailPageFaq/model'

export const useFaqFormData = (areaValue: string | number) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { langListForign, langListLocal } = React.useContext(CountyRoleType)
  const tablist = areaValue === 1 ? langListLocal : langListForign
  const { id }: { id: string | undefined } = useParams()
  const location = useLocation()
  const isCreatePage = location.pathname.includes('create')
  const { detailPageFaq, isdetailPageFaqFetched } = useDetailPageFaq(id, openUnAuthAlert)
  const [defaultFormData, setDefaultFormData] = React.useState<FormModel[] | []>([])
  const { t } = useTranslation()

  const initialFormData = [
    { section_content: '', section_type: '0' },
    { section_content: '', section_type: '1' },
  ]

  const defaultFieldType: FieldTypes[] = [
    { section_content: 'title', section_type: 'hidden', language: 'hidden' },
    { section_content: 'text', section_type: 'hidden', language: 'hidden' },
  ]

  const defaultFieldTitle: Record<string, string>[] = [{ section_content: t('title.title') }, { section_content: t('blueForm.content') }]

  const setCreatePageData = (languagelist: SysLanguageItem[]) => {
    let defaultSections: FormModel[] = []

    initialFormData.forEach((typeItem, index) => {
      let defaultSection = []
      defaultSection = languagelist.map((item) => ({
        ...typeItem,
        language: item.code_no,
        isHiddenLabel: false,
        info: defaultFieldType[index],
        fieldName: defaultFieldTitle[index],
      }))

      defaultSections = [...defaultSections, ...defaultSection]
    })

    setDefaultFormData(defaultSections)
  }

  const getModifiedFormData = (detail: Resultdata): FormModel[] => {
    const setItem = (item: Faqsection) => {
      const isTitle = item.section_type === '0'

      const info: Record<string, InputType> = {
        section_content: isTitle ? 'title' : 'text',
        section_type: 'hidden',
        language: 'hidden',
      }

      return {
        info,
        fieldName: { section_content: isTitle ? t('title.title') : t('blueForm.content') },
        section_content: item.section_content,
        section_type: item.section_type as InputType,
        language: item.language,
        isHiddenLabel: false,
      }
    }

    return detail.faq_sections.map(setItem)
  }

  const setEditPageData = () => {
    if (isdetailPageFaqFetched && detailPageFaq) {
      setDefaultFormData(getModifiedFormData(detailPageFaq))
    }
  }

  React.useEffect(() => {
    isCreatePage && tablist ? setCreatePageData(tablist) : setEditPageData()
  }, [isdetailPageFaqFetched, tablist, detailPageFaq])

  return { defaultFormData, defaultFieldType, detailPageFaq }
}
