import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useParams } from 'react-router-dom'
import { AlertUnauthContext, CountyRoleType } from 'src/pages/model'
import { FormModel } from 'src/shared/components/FormAllValidated/FormConfig/model'
import { FieldTypes } from 'src/shared/components/FormAllValidated/model'
import { SysLanguageItem } from 'src/shared/components/RadioGroupWithLabel/services/SystemLanguage/model'
import useDetailPageContact from '../../services/detailPageContact/hooks'
import { Company, Resultdatum } from '../../services/detailPageContact/model'

export const useContactFormData = (areaValue: number | string) => {
  const openUnAuthAlert = React.useContext(AlertUnauthContext)
  const { langListForign, langListLocal } = React.useContext(CountyRoleType)
  const tablist = areaValue === 1 ? langListLocal : langListForign
  const { id }: { id: string } = useParams()
  const location = useLocation()
  const { t } = useTranslation()
  const isCreatePage = location.pathname.includes('create')
  const { detailPageContact, isdetailPageContactFetched } = useDetailPageContact(id, openUnAuthAlert)
  const isTaiwanCompany = detailPageContact && detailPageContact[0].type === '1'
  const [defaultFormData, setDefaultFormData] = React.useState<FormModel[] | []>([])

  const initialFormData = [
    {
      company_name: '',
      phone: '',
      fax: '',
      email: '',
      address: '',
      business_time: '',
      website_link: '',
      facebook_link: '',
      youtube_link: '',
    },
  ]

  const defaultFieldType: FieldTypes[] = [
    {
      company_name: 'title',
      phone: 'title',
      fax: 'title',
      email: 'title',
      address: 'title',
      business_time: 'title',
      website_link: 'title',
      facebook_link: 'title',
      youtube_link: 'title',
      language: 'hidden',
      id: 'hidden',
    },
  ]

  const defaultFieldTitle: Record<string, string>[] = [
    {
      company_name: t('contact1'),
      phone: t('contact2'),
      fax: isTaiwanCompany ? t('contact3') : `${t('contact3')} (${t('contact8')})`,
      email: t('contact4'),
      address: t('contact5'),
      business_time: `${t('contact6')} (${t('contact8')})`,
      website_link: isTaiwanCompany ? t('contact7') : `${t('contact7')} (${t('contact8')})`,
      facebook_link: isTaiwanCompany ? 'Facebook' : `Facebook (${t('contact8')})`,
      youtube_link: isTaiwanCompany ? 'Youtube' : `Youtube (${t('contact8')})`,
    },
  ]

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

  const getModifiedFormData = (detail: Resultdatum): FormModel[] => {
    const setItem = (item: Company) => {
      return {
        id: item.id,
        info: defaultFieldType[0],
        fieldName: defaultFieldTitle[0],
        company_name: item.company_name,
        phone: item.phone,
        fax: item.fax,
        email: item.email,
        address: item.address,
        business_time: item.business_time,
        website_link: item.website_link,
        facebook_link: item.facebook_link,
        youtube_link: item.youtube_link,
        language: item.language,
      }
    }

    return detail.companies.map(setItem)
  }

  const setEditPageData = () => {
    if (isdetailPageContactFetched && detailPageContact) {
      setDefaultFormData(getModifiedFormData(detailPageContact[0] as Resultdatum))
    }
  }

  React.useEffect(() => {
    isCreatePage && tablist ? setCreatePageData(tablist) : setEditPageData()
  }, [isdetailPageContactFetched, tablist, detailPageContact])

  return { defaultFormData, defaultFieldType, detailPageContact: detailPageContact && detailPageContact[0] }
}
