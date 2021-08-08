import { Box, MenuItem } from '@material-ui/core'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { useLanguage } from 'src/core/components/LanguageProvider/hooks'
import MultipleSelect from 'src/shared/components/MultipleSelect'
import Select from 'src/shared/components/Select'
import SingleAutoComplete from 'src/shared/components/SingleAutoComplete'
import { Props } from './model'
import useStyles from './useStyles'

const Control: React.FC<Props> = ({ searchKeyword, changeOpenFlag, deptList, roleList, changeDepts, changeRoles }) => {
  const keywordName = 'accountKeywords'
  const keyWordFromStorage = window.localStorage.getItem(keywordName)
  const classes = useStyles()
  const { language } = useLanguage()
  const { t } = useTranslation()
  const isChinese = language === 'zh-TW'

  const roleDropDownItems = roleList.map((value) => ({ id: value.id, name: isChinese ? value.role_name_ch : value.role_name_en }))
  const deptFirstLayerItems = deptList.map((value) => ({ id: value.id, name: isChinese ? value.dept_name_ch : value.dept_name_en }))
  const deptSecondLayerItems = deptList
    .flatMap((value) => value.sub_dept)
    .map((value) => ({ id: value.id, name: isChinese ? value.dept_name_ch : value.dept_name_en }))

  const deptDropDownItems = [...deptFirstLayerItems, ...deptSecondLayerItems]

  let currentKeyWord: string[] | [] = []

  if (keyWordFromStorage) {
    currentKeyWord = JSON.parse(keyWordFromStorage) as string[]
  }

  const onInputSearch = (keyword: string) => {
    searchKeyword(keyword)
  }

  const onSelectChange = (event: React.ChangeEvent<{ value: '0' | '1' | '2' }>) => {
    changeOpenFlag(event.target.value)
  }

  return (
    <Box display='flex' justifyContent='space-between' className={classes.control}>
      <SingleAutoComplete width={280} pageKeywordName={keywordName} placeholder={t('admin4')} onSubmit={onInputSearch} options={currentKeyWord} />

      <Box display='grid' gridTemplateColumns={`1fr 1fr ${isChinese ? '160' : '200'}px`} gridGap='16px'>
        <MultipleSelect onSubmit={changeRoles} items={roleDropDownItems} placeholder={t('admin5')} />
        <MultipleSelect onSubmit={changeDepts} items={deptDropDownItems} placeholder={t('admin6')} />
        <Select width={isChinese ? 160 : 200} placeholder={t('admin7')} onChange={onSelectChange}>
          <MenuItem value='all'>{t('select.all')}</MenuItem>
          <MenuItem value='1'>{t('select.enable')}</MenuItem>
          <MenuItem value='0'>{t('select.disable')}</MenuItem>
        </Select>
      </Box>
    </Box>
  )
}

export default Control
